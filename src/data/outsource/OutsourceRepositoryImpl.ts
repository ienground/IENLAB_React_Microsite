import type {OutsourceRepository} from "@/domain/repository/OutsourceRepository.ts"
import {
  addDoc,
  collection, deleteDoc,
  doc, type DocumentReference, endAt,
  type Firestore,
  getDoc,
  getDocs,
  limit,
  orderBy, query, type QueryConstraint,
  startAfter, startAt, where,
  type Unsubscribe, updateDoc
} from "firebase/firestore"
import type {FirebaseStorage} from "firebase/storage"
import {FirestorePath} from "@/constant/FirestorePath.ts"
import {fetchItems, type FirestoreListMode, getSnapshots, type InfScrollStateList} from "@ienlab/react-library"
import {Outsource} from "@/domain/model/Outsource.ts"
import {Company} from "@/domain/model/Company.ts"
import {OutsourceEditDetails} from "@/domain/model/OutsourceEditDetails.ts"
import i18n from "@/locales/i18n.ts"
import {Estimate} from "@/domain/model/Estimate.ts"

export class OutsourceRepositoryImpl implements OutsourceRepository {
  private readonly outsourcesRef
  private readonly companiesRef
  private readonly estimatesRef
  private readonly PAGE_SIZE = 20

  private readonly companyCache = new Map<string, Company>
  private readonly estimateCache = new Map<string, Estimate>
  private mode: FirestoreListMode = "list"
  private searchKeyword = ""
  private companyFilterRef: DocumentReference | null = null

  constructor(
    readonly firestore: Firestore,
    readonly storage: FirebaseStorage
  ) {
    this.outsourcesRef = collection(firestore, FirestorePath.OUTSOURCE)
    this.companiesRef = collection(firestore, FirestorePath.COMPANY)
    this.estimatesRef = collection(firestore, FirestorePath.ESTIMATE)
  }

  outsourceInfoStateList: InfScrollStateList<Outsource> = {
    itemList: new Map(),
    lastVisibleDocument: null,
    isInitialized: false,
    isLoading: false,
    hasMore: true
  }

  async get(id: string): Promise<Outsource | null> {
    const snapshot = await getDoc(doc(this.outsourcesRef, id))
    if (!snapshot.exists()) return null

    const item = Outsource.fromSnapshot(snapshot)
    await fetchItems(this.companiesRef, Company.fromSnapshot, this.companyCache, [item.targetCompanyRef])
    await fetchItems(this.estimatesRef, Estimate.fromSnapshot, this.estimateCache, [item.estimateRef])
    return new Outsource({...item,
      targetCompany: item.targetCompanyRef ? this.companyCache.get(item.targetCompanyRef.path) : null,
      estimate: item.estimateRef ? this.estimateCache.get(item.estimateRef.path) : null
    })
  }
  
  observe(id: string, callback: (item: (Outsource | null)) => void, cache?: boolean): Unsubscribe {
    return getSnapshots(doc(this.outsourcesRef, id), async snapshot => {
      if (!snapshot.exists()) {
        callback(null)
        return
      }

      const item = Outsource.fromSnapshot(snapshot)
      await fetchItems(this.companiesRef, Company.fromSnapshot, this.companyCache, [item.targetCompanyRef])
      callback(new Outsource({...item,
        targetCompany: item.targetCompanyRef ? this.companyCache.get(item.targetCompanyRef.path) : null,
        estimate: item.estimateRef ? this.estimateCache.get(item.estimateRef.path) : null
      }))
    }, { cache: cache })
  }

  async create(item: OutsourceEditDetails): Promise<DocumentReference> {
    const target = item.toItem()
    return await addDoc(this.outsourcesRef, target.toHashMap(false))
  }

  async update(id: string, item: OutsourceEditDetails): Promise<void> {
    const target = item.toItem()
    return await updateDoc(doc(this.outsourcesRef, id), target.toHashMap(true))
  }

  async delete(id: string): Promise<void> {
    return await deleteDoc(doc(this.outsourcesRef, id))
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

  setCompanyFilter(companyRef: DocumentReference | null) {
    this.companyFilterRef = companyRef
    this.reset()
  }

  clearCompanyFilter() {
    this.companyFilterRef = null
    this.reset()
  }
  
  async loadNextPage(): Promise<void> {
    if (!this.outsourceInfoStateList.hasMore || this.outsourceInfoStateList.isLoading) return
  
    this.outsourceInfoStateList = { ...this.outsourceInfoStateList, isLoading: true }
  
    try {
      const constraints: QueryConstraint[] = [where(FirestorePath.DELETED_AT, "==", null)]

      if (this.companyFilterRef) {
        constraints.push(where(FirestorePath.Outsource.TARGET_COMPANY, "==", this.companyFilterRef))
      }

      if (this.mode === "search" && this.searchKeyword) {
        constraints.push(orderBy(FirestorePath.Outsource.TITLE + `.${i18n.resolvedLanguage}`))
        constraints.push(startAt(this.searchKeyword))
        constraints.push(endAt(this.searchKeyword + "\uf8ff"))
      } else {
        constraints.push(orderBy(FirestorePath.UPDATE_AT, "desc"))
      }
  
      if (this.outsourceInfoStateList.lastVisibleDocument) {
        constraints.push(startAfter(this.outsourceInfoStateList.lastVisibleDocument))
      }
  
      constraints.push(limit(this.PAGE_SIZE))
  
      const snapshot = await getDocs(query(this.outsourcesRef, ...constraints))
      const docs = snapshot.docs
      const items = docs.map(Outsource.fromSnapshot)
      const newMap = new Map(this.outsourceInfoStateList.itemList)

      await fetchItems(this.companiesRef, Company.fromSnapshot, this.companyCache, items.map(item => item.targetCompanyRef))
      await fetchItems(this.estimatesRef, Estimate.fromSnapshot, this.estimateCache, items.map(item => item.estimateRef))

      items.forEach(item => {
        newMap.set(item.id, new Outsource({...item,
          targetCompany: item.targetCompanyRef ? this.companyCache.get(item.targetCompanyRef.path) : null,
          estimate: item.estimateRef ? this.estimateCache.get(item.estimateRef.path) : null
        }))
      })
  
      this.outsourceInfoStateList = {
        itemList: newMap,
        lastVisibleDocument: docs.at(-1) ?? null,
        isInitialized: true,
        isLoading: false,
        hasMore: docs.length === this.PAGE_SIZE,
      }
    } catch (e) {
      console.error("loadNextPage error", e)
      this.outsourceInfoStateList = {
        ...this.outsourceInfoStateList,
        isLoading: false,
      }
    }
  }
  
  reset() {
    this.outsourceInfoStateList = {
      itemList: new Map(),
      lastVisibleDocument: null,
      isInitialized: false,
      isLoading: false,
      hasMore: true,
    }
  }
}