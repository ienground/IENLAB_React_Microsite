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
  updateDoc
} from "firebase/firestore"
import {FirestorePath} from "@/constant/FirestorePath.ts"
import {fetchItems, type FirestoreListMode, getSnapshots, type InfScrollStateList} from "@ienlab/react-library"
import type {EstimateRepository} from "@/domain/repository/EstimateRepository.ts"
import {Estimate} from "@/domain/model/Estimate.ts"
import {EstimateEditDetails} from "@/domain/model/EstimateEditDetails.ts"
import {Company} from "@/domain/model/Company.ts"
import {type Functions} from "firebase/functions"
import {createCallable} from "@/constant/CreateCallable.ts"

export class EstimateRepositoryImpl implements EstimateRepository {
  private readonly estimatesRef
  private readonly companiesRef
  private readonly createPdfFn
  private readonly PAGE_SIZE = 20

  private readonly companyCache = new Map<string, Company>
  private mode: FirestoreListMode = "list"
  private searchKeyword = ""

  constructor(
    readonly firestore: Firestore,
    readonly functions: Functions,
  ) {
    this.estimatesRef = collection(firestore, FirestorePath.ESTIMATE)
    this.companiesRef = collection(firestore, FirestorePath.COMPANY)
    this.createPdfFn = createCallable(functions, "CreateEstimatePDF")
  }

  estimateInfoStateList: InfScrollStateList<Estimate> = {
    itemList: new Map(),
    lastVisibleDocument: null,
    isInitialized: false,
    isLoading: false,
    hasMore: true
  }

  async get(id: string): Promise<Estimate | null> {
    const snapshot = await getDoc(doc(this.estimatesRef, id))
    if (!snapshot.exists()) return null

    const item = Estimate.fromSnapshot(snapshot)
    await fetchItems(this.companiesRef, Company.fromSnapshot, this.companyCache, [item.companyRef])
    return new Estimate({...item, company: this.companyCache.get(item.companyRef?.path ?? "")})
  }

  observe(id: string, callback: (item: (Estimate | null)) => void, cache?: boolean): Unsubscribe {
    return getSnapshots(doc(this.estimatesRef, id), async snapshot => {
      if (!snapshot.exists()) {
        callback(null)
        return
      }

      const item = Estimate.fromSnapshot(snapshot)
      await fetchItems(this.companiesRef, Company.fromSnapshot, this.companyCache, [item.companyRef])
      callback(new Estimate({...item, company: this.companyCache.get(item.companyRef?.path ?? "")}))
    }, { cache: cache })
  }

  async create(item: EstimateEditDetails): Promise<DocumentReference> {
    const target = item.toItem()
    return await addDoc(this.estimatesRef, target.toHashMap(false))
  }

  async update(id: string, item: EstimateEditDetails): Promise<void> {
    const target = item.toItem()
    return await updateDoc(doc(this.estimatesRef, id), target.toHashMap(true))
  }

  async updateState(id: string, state: Estimate.State): Promise<void> {
    const item: Record<string, unknown> = { [FirestorePath.Estimate.STATE]: state }

    if (state === Estimate.State.SENT) {
      item[FirestorePath.Estimate.ESTIMATE_AT] = serverTimestamp()
    }

    return await updateDoc(doc(this.estimatesRef, id), item)
  }

  async delete(id: string): Promise<void> {
    return await deleteDoc(doc(this.estimatesRef, id))
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
    if (!this.estimateInfoStateList.hasMore || this.estimateInfoStateList.isLoading) return

    this.estimateInfoStateList = { ...this.estimateInfoStateList, isLoading: true }

    try {
      const constraints: QueryConstraint[] = []

      if (this.mode === "search" && this.searchKeyword) {
        constraints.push(orderBy(FirestorePath.Estimate.TITLE))
        constraints.push(startAt(this.searchKeyword))
        constraints.push(endAt(this.searchKeyword + "\uf8ff"))
      } else {
        constraints.push(orderBy(FirestorePath.UPDATE_AT, "desc"))
      }

      if (this.estimateInfoStateList.lastVisibleDocument) {
        constraints.push(startAfter(this.estimateInfoStateList.lastVisibleDocument))
      }

      constraints.push(limit(this.PAGE_SIZE))

      const snapshot = await getDocs(query(this.estimatesRef, ...constraints))
      const docs = snapshot.docs
      const items = docs.map(Estimate.fromSnapshot)
      const newMap = new Map(this.estimateInfoStateList.itemList)

      await fetchItems(this.companiesRef, Company.fromSnapshot, this.companyCache, items.map(item => item.companyRef))

      items.forEach(item => {
        const path = item.companyRef?.path
        newMap.set(item.id, new Estimate({...item, company: path ? this.companyCache.get(path) ?? null : null}))
      })

      this.estimateInfoStateList = {
        itemList: newMap,
        lastVisibleDocument: docs.at(-1) ?? null,
        isInitialized: true,
        isLoading: false,
        hasMore: docs.length === this.PAGE_SIZE,
      }
    } catch (e) {
      console.error("loadNextPage error", e)
      this.estimateInfoStateList = {
        ...this.estimateInfoStateList,
        isLoading: false,
      }
    }
  }

  reset() {
    this.estimateInfoStateList = {
      itemList: new Map(),
      lastVisibleDocument: null,
      isInitialized: false,
      isLoading: false,
      hasMore: true,
    }
  }

  async downloadPdf(itemId: string): Promise<{ result: Blob, name: string }> {
    const result = await this.createPdfFn({ itemId })
    const binary = atob(result.data.pdf)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    return { result: new Blob([bytes], {type: 'application/pdf'}), name: result.data.name }
  }
}
