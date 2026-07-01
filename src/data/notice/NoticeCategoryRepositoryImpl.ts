import {inject, injectable} from "@needle-di/core"
import type {NoticeCategoryRepository} from "@/domain/repository/NoticeCategoryRepository.ts"
import {type FirestoreListMode, getSnapshots, type InfScrollStateList} from "@ienlab/react-library"
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
  type QuerySnapshot,
  type QueryConstraint,
  startAfter,
  startAt,
  type Unsubscribe,
  updateDoc,
  where
} from "firebase/firestore"
import {DiToken} from "@/di/token.ts"
import {FirestorePath} from "@/constant/FirestorePath.ts"
import {Notice} from "@/domain/model/Notice.ts"
import i18n from "@/locales/i18n.ts"
import type {NoticeCategoryEditDetails} from "@/domain/model/NoticeCategoryEditDetails.ts"

@injectable()
export class NoticeCategoryRepositoryImpl implements NoticeCategoryRepository {
  private readonly categoryRef
  private readonly PAGE_SIZE = 20

  private mode: FirestoreListMode = "list"
  private searchKeyword = ""

  constructor(
    firestore: Firestore = inject(DiToken.Firebase.Firestore)
  ) {
    this.categoryRef = collection(firestore, FirestorePath.NOTICE, FirestorePath.Notice.ITEMS, FirestorePath.Notice.CATEGORY)
  }

  categoryInfoStateList: InfScrollStateList<Notice.Category> = {
    itemList: new Map(),
    lastVisibleDocument: null,
    isInitialized: false,
    isLoading: false,
    hasMore: true
  }

  async get(id: string): Promise<Notice.Category | null> {
    const snapshot = await getDoc(doc(this.categoryRef, id))
    if (!snapshot.exists()) return null

    return Notice.Category.fromSnapshot(snapshot)
  }

  observe(id: string, callback: (item: (Notice.Category | null)) => void, cache?: boolean): Unsubscribe {
    return getSnapshots(doc(this.categoryRef, id), async snapshot => {
      if (!snapshot.exists()) {
        callback(null)
        return
      }

      callback(Notice.Category.fromSnapshot(snapshot))
    }, { cache: cache })
  }

  observeList(callback: (items: Notice.Category[]) => void, cache?: boolean): Unsubscribe {
    const q = query(this.categoryRef,
      where(FirestorePath.DELETED_AT, "==", null),
      orderBy(FirestorePath.UPDATE_AT, "desc")
    )
    return getSnapshots(q, (snapshot: QuerySnapshot) => {
      callback(snapshot.docs.map(Notice.Category.fromSnapshot))
    }, { cache: cache })
  }

  async create(item: NoticeCategoryEditDetails): Promise<DocumentReference> {
    const target = item.toItem()
    return await addDoc(this.categoryRef, target.toHashMap(false))
  }

  async update(id: string, item: NoticeCategoryEditDetails): Promise<void> {
    const target = item.toItem()
    return await updateDoc(doc(this.categoryRef, id), target.toHashMap(true))
  }

  async delete(id: string): Promise<void> {
    return await deleteDoc(doc(this.categoryRef, id))
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
    if (!this.categoryInfoStateList.hasMore || this.categoryInfoStateList.isLoading) return

    this.categoryInfoStateList = { ...this.categoryInfoStateList, isLoading: true }

    try {
      const constraints: QueryConstraint[] = [where(FirestorePath.DELETED_AT, "==", null)]

      if (this.mode === "search" && this.searchKeyword) {
        constraints.push(orderBy(FirestorePath.Notice.Category.NAME + `.${i18n.resolvedLanguage}`))
        constraints.push(startAt(this.searchKeyword))
        constraints.push(endAt(this.searchKeyword + "\uf8ff"))
      } else {
        constraints.push(orderBy(FirestorePath.UPDATE_AT, "desc"))
      }

      if (this.categoryInfoStateList.lastVisibleDocument) {
        constraints.push(startAfter(this.categoryInfoStateList.lastVisibleDocument))
      }

      constraints.push(limit(this.PAGE_SIZE))

      const snapshot = await getDocs(query(this.categoryRef, ...constraints))
      const docs = snapshot.docs
      const items = docs.map(Notice.Category.fromSnapshot)
      const newMap = new Map(this.categoryInfoStateList.itemList)

      items.forEach(item => {
        newMap.set(item.id, item)
      })

      this.categoryInfoStateList = {
        itemList: newMap,
        lastVisibleDocument: docs.at(-1) ?? null,
        isInitialized: true,
        isLoading: false,
        hasMore: docs.length === this.PAGE_SIZE,
      }
    } catch (e) {
      console.error("loadNextPage error", e)
      this.categoryInfoStateList = {
        ...this.categoryInfoStateList,
        isLoading: false,
      }
    }
  }

  reset() {
    this.categoryInfoStateList = {
      itemList: new Map(),
      lastVisibleDocument: null,
      isInitialized: false,
      isLoading: false,
      hasMore: true,
    }
  }
}
