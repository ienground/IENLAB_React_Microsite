import {
  collection,
  query,
  type Firestore,
  type Unsubscribe,
  orderBy,
  startAfter, limit, getDocs, doc, getDoc, updateDoc,
  deleteDoc,
  type DocumentReference, addDoc, type QueryConstraint, startAt, endAt,
  where,
} from "firebase/firestore"
import {FirestorePath} from "@/constant/FirestorePath.ts"
import {
  type FirestoreListMode,
  getSnapshots,
  type InfScrollStateList
} from "@ienlab/react-library"
import type {CompanyRepository} from "@/domain/repository/CompanyRepository.ts"
import {Company} from "@/domain/model/Company.ts"
import i18n from "@/locales/i18n.ts"
import {CompanyEditDetails} from "@/domain/model/CompanyEditDetails.ts"

export class CompanyRepositoryImpl implements CompanyRepository {
  private readonly companiesRef
  private readonly PAGE_SIZE = 20

  private mode: FirestoreListMode = "list"
  private searchKeyword = ""

  constructor(
    readonly firestore: Firestore,
  ) {
    this.companiesRef = collection(firestore, FirestorePath.COMPANY)
  }

  companyInfoStateList: InfScrollStateList<Company> = {
    itemList: new Map(),
    lastVisibleDocument: null,
    isInitialized: false,
    isLoading: false,
    hasMore: true
  }

  async get(id: string): Promise<Company | null> {
    const snapshot = await getDoc(doc(this.companiesRef, id))
    if (!snapshot.exists()) return null
    return Company.fromSnapshot(snapshot)
  }

  observe(id: string, callback: (item: (Company | null)) => void, cache?: boolean): Unsubscribe {
    return getSnapshots(doc(this.companiesRef, id), snapshot => {
      if (!snapshot.exists()) {
        callback(null)
        return
      }

      callback(Company.fromSnapshot(snapshot))
    }, { cache: cache })
  }

  async create(item: CompanyEditDetails): Promise<DocumentReference> {
    const target = item.toItem()
    return await addDoc(this.companiesRef, target.toHashMap(false))
  }

  async update(id: string, item: CompanyEditDetails): Promise<void> {
    const target = item.toItem()
    return await updateDoc(doc(this.companiesRef, id), target.toHashMap(true))
  }

  async delete(id: string): Promise<void> {
    return await deleteDoc(doc(this.companiesRef, id))
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
    if (!this.companyInfoStateList.hasMore || this.companyInfoStateList.isLoading) return
  
    this.companyInfoStateList = { ...this.companyInfoStateList, isLoading: true }
  
    try {
      const constraints: QueryConstraint[] = [where(FirestorePath.DELETED_AT, "==", null)]

      if (this.mode === "search" && this.searchKeyword) {
        constraints.push(orderBy(FirestorePath.Company.NAME + `.${i18n.resolvedLanguage}`))
        constraints.push(startAt(this.searchKeyword))
        constraints.push(endAt(this.searchKeyword + "\uf8ff"))
      } else {
        constraints.push(orderBy(FirestorePath.UPDATE_AT, "desc"))
      }
  
      if (this.companyInfoStateList.lastVisibleDocument) {
        constraints.push(startAfter(this.companyInfoStateList.lastVisibleDocument))
      }
  
      constraints.push(limit(this.PAGE_SIZE))
  
      const snapshot = await getDocs(query(this.companiesRef, ...constraints))
      const docs = snapshot.docs
      const items = docs.map(Company.fromSnapshot)
      const newMap = new Map(this.companyInfoStateList.itemList)
  
      items.forEach(item => {
        newMap.set(item.id, item)
      })
  
      this.companyInfoStateList = {
        itemList: newMap,
        lastVisibleDocument: docs.at(-1) ?? null,
        isInitialized: true,
        isLoading: false,
        hasMore: docs.length === this.PAGE_SIZE,
      }
    } catch (e) {
      console.error("loadNextPage error", e)
      this.companyInfoStateList = {
        ...this.companyInfoStateList,
        isLoading: false,
      }
    }
  }
  
  reset() {
    this.companyInfoStateList = {
      itemList: new Map(),
      lastVisibleDocument: null,
      isInitialized: false,
      isLoading: false,
      hasMore: true,
    }
  }
  
  
}