import {fetchItems, type FirestoreListMode, getSnapshots, type InfScrollStateList} from "@ienlab/react-library"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  type DocumentReference,
  endAt,
  type Firestore,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  type QueryConstraint,
  serverTimestamp,
  startAfter,
  startAt,
  type Unsubscribe,
  updateDoc, where
} from "firebase/firestore"
import type {FirebaseStorage} from "firebase/storage"
import {FirestorePath} from "@/constant/FirestorePath.ts"
import {Outsource} from "@/domain/model/Outsource.ts"
import i18n from "@/locales/i18n.ts"
import {
  type OutsourceRevisionRepository
} from "@/domain/repository/OutsourceRevisionRepository"
import type { OutsourceRevisionEditDetails } from "@/domain/model/OutsourceRevisionEditDetails"

export class OutsourceRevisionRepositoryImpl implements OutsourceRevisionRepository {
  private readonly outsourcesRef
  private readonly requestsRef
  private readonly PAGE_SIZE = 20

  private mode: FirestoreListMode = "list"
  private searchKeyword = ""
  private readonly isAdmin: boolean

  constructor(
    readonly firestore: Firestore,
    readonly storage: FirebaseStorage,
    id: string,
    isAdmin: boolean
  ) {
    this.outsourcesRef = collection(firestore, FirestorePath.OUTSOURCE)
    this.requestsRef = collection(this.outsourcesRef, id, FirestorePath.Outsource.REVISION_REQUESTS)
    this.isAdmin = isAdmin
  }

  requestInfoStateList: InfScrollStateList<Outsource.RevisionRequest> = {
    itemList: new Map(),
    lastVisibleDocument: null,
    isInitialized: false,
    isLoading: false,
    hasMore: true
}

  async get(id: string): Promise<Outsource.RevisionRequest | null> {
    const snapshot = await getDoc(doc(this.requestsRef, id))
    if (!snapshot.exists()) return null

    return Outsource.RevisionRequest.fromSnapshot(snapshot)
  }

  async getLatestItems(count: number): Promise<Outsource.RevisionRequest[]> {
    const constraints: QueryConstraint[] = []

    if (this.isAdmin) {
      constraints.push(where(FirestorePath.Outsource.RevisionRequest.STATE, "in", [
        Outsource.RevisionRequest.State.SENT,
        Outsource.RevisionRequest.State.APPROVED,
        Outsource.RevisionRequest.State.REJECTED,
        Outsource.RevisionRequest.State.APPLIED,
      ]))
    }

    constraints.push(orderBy(FirestorePath.UPDATE_AT, "desc"))
    constraints.push(limit(count))

    const snapshot = await getDocs(query(this.requestsRef, ...constraints))
    return snapshot.docs.map(Outsource.RevisionRequest.fromSnapshot)
  }

  observe(id: string, callback: (item: (Outsource.RevisionRequest | null)) => void, cache?: boolean): Unsubscribe {
    return getSnapshots(doc(this.requestsRef, id), async snapshot => {
      if (!snapshot.exists()) {
        callback(null)
        return
      }

      const item = Outsource.RevisionRequest.fromSnapshot(snapshot)
      callback(new Outsource.RevisionRequest(item))
    }, { cache: cache })
  }

  async create(item: OutsourceRevisionEditDetails): Promise<DocumentReference> {
    const target = item.toItem()
    return await addDoc(this.requestsRef, target.toHashMap(false))
  }

  async update(id: string, item: OutsourceRevisionEditDetails): Promise<void> {
    const target = item.toItem()
    return await updateDoc(doc(this.requestsRef, id), target.toHashMap(true))
  }

  async updateState(id: string, state: Outsource.RevisionRequest.State): Promise<void> {
    const snapshot = await getDoc(doc(this.requestsRef, id))
    const currentState = snapshot.data()?.[FirestorePath.Outsource.RevisionRequest.STATE] as Outsource.RevisionRequest.State ?? Outsource.RevisionRequest.State.Default

    const changeAtLabel = Outsource.RevisionRequest.State.getChangeAt(state)
    const item: Record<string, unknown> = { [FirestorePath.Outsource.RevisionRequest.STATE]: state }

    if (changeAtLabel) {
      item[changeAtLabel] = serverTimestamp()
    }

    if (state < currentState) {
      for (const s of Outsource.RevisionRequest.State.valuesNoDraft) {
        if (s > state) {
          const field = Outsource.RevisionRequest.State.getChangeAt(s)
          if (field) {
            item[field] = null
          }
        }
      }
    }

    return await updateDoc(doc(this.requestsRef, id), item)
  }

  async delete(id: string): Promise<void> {
    return await deleteDoc(doc(this.requestsRef, id))
  }

  setSearchKeyword(keyword: string) {
    const normalized = keyword.trim().toLowerCase()

    this.searchKeyword = normalized
    this.mode = normalized ? "search" : "list"
    this.reset()
  }

  clearSearch() {
    this.searchKeyword = ""
    this.mode = "list"
    this.reset()
  }

  async loadNextPage(): Promise<void> {
    if (!this.requestInfoStateList.hasMore || this.requestInfoStateList.isLoading) return

    this.requestInfoStateList = { ...this.requestInfoStateList, isLoading: true }

    try {
      const constraints: QueryConstraint[] = []

      if (this.mode === "search" && this.searchKeyword) {
        constraints.push(orderBy(FirestorePath.Outsource.RevisionRequest.TITLE))
        constraints.push(startAt(this.searchKeyword))
        constraints.push(endAt(this.searchKeyword + "\uf8ff"))
      } else {
        constraints.push(orderBy(FirestorePath.UPDATE_AT, "desc"))
      }

      if (this.requestInfoStateList.lastVisibleDocument) {
        constraints.push(startAfter(this.requestInfoStateList.lastVisibleDocument))
      }

      if (this.isAdmin) {
        constraints.push(where(FirestorePath.Outsource.RevisionRequest.STATE, "in", [
          Outsource.RevisionRequest.State.SENT,
          Outsource.RevisionRequest.State.APPROVED,
          Outsource.RevisionRequest.State.REJECTED,
          Outsource.RevisionRequest.State.APPLIED,
        ]))
      }

      constraints.push(limit(this.PAGE_SIZE))

      const snapshot = await getDocs(query(this.requestsRef, ...constraints))
      const docs = snapshot.docs
      const items = docs.map(Outsource.RevisionRequest.fromSnapshot)
      const newMap = new Map(this.requestInfoStateList.itemList)


      items.forEach(item => {
        newMap.set(item.id, item)
      })

      this.requestInfoStateList = {
        itemList: newMap,
        lastVisibleDocument: docs.at(-1) ?? null,
        isInitialized: true,
        isLoading: false,
        hasMore: docs.length === this.PAGE_SIZE,
      }
    } catch (e) {
      console.error("loadNextPage error", e)
      this.requestInfoStateList = {
        ...this.requestInfoStateList,
        isLoading: false,
      }
    }
  }

  reset() {
    this.requestInfoStateList = {
      itemList: new Map(),
      lastVisibleDocument: null,
      isInitialized: false,
      isLoading: false,
      hasMore: true,
    }
  }
}