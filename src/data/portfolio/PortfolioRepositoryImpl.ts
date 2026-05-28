import type {PortfolioRepository} from "@/domain/repository/PortfolioRepository.ts"
import {collection, doc, endAt, getDoc, getDocs, limit, orderBy, query,
  QueryConstraint, startAfter, startAt, where, type Firestore, type Unsubscribe} from "firebase/firestore"
import {FirestorePath} from "@/constant/FirestorePath.ts"
import {type FirestoreListMode, getSnapshots, type InfScrollStateList} from "@ienlab/react-library"
import i18n from "@/locales/i18n.ts"
import {Portfolio} from "@/domain/model/Portfolio.tsx"

export class PortfolioRepositoryImpl implements PortfolioRepository {
  private readonly portfoliosRef
  private readonly PAGE_SIZE = 20
  private mode: FirestoreListMode = "list"
  private searchKeyword = ""

  constructor(
    private readonly firestore: Firestore
  ) {
    this.portfoliosRef = collection(firestore, FirestorePath.PORTFOLIO)
  }

  portfolioInfoStateList: InfScrollStateList<Portfolio> = {
    itemList: new Map(),
    lastVisibleDocument: null,
    isInitialized: false,
    isLoading: false,
    hasMore: true
  }

  async get(id: string): Promise<Portfolio | null> {
    return await getDoc(doc(this.portfoliosRef, id)).then(Portfolio.fromSnapshot)
  }

  observe(id: string, callback: (item: (Portfolio | null)) => void, cache?: boolean): Unsubscribe {
    return getSnapshots(doc(this.portfoliosRef, id), snapshot => {
      callback(Portfolio.fromSnapshot(snapshot))
    }, { cache: cache })
  }
  observePrimaries(callback: (items: Portfolio[]) => void) {
    const q = query(
      this.portfoliosRef,
      where(FirestorePath.Portfolio.IS_PRIMARY, "==", true),
      where(FirestorePath.Portfolio.VISIBILITY, "==", Portfolio.Visibility.PUBLISHED),
    )
    return getSnapshots(
      q,
      snapshot => {
        callback(snapshot.docs.map(Portfolio.fromSnapshot))
      }
    )
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
    if (!this.portfolioInfoStateList.hasMore || this.portfolioInfoStateList.isLoading) return

    this.portfolioInfoStateList = { ...this.portfolioInfoStateList, isLoading: true }

    try {
      const constraints: QueryConstraint[] = []

      if (this.mode === "search" && this.searchKeyword) {
        constraints.push(orderBy(FirestorePath.Portfolio.TITLE + `.${i18n.resolvedLanguage}`))
        constraints.push(startAt(this.searchKeyword))
        constraints.push(endAt(this.searchKeyword + "\uf8ff"))
      } else {
        constraints.push(orderBy(FirestorePath.UPDATE_AT, "desc"))
      }

      if (this.portfolioInfoStateList.lastVisibleDocument) {
        constraints.push(startAfter(this.portfolioInfoStateList.lastVisibleDocument))
      }

      constraints.push(where(FirestorePath.Portfolio.VISIBILITY, "==", Portfolio.Visibility.PUBLISHED))
      constraints.push(limit(this.PAGE_SIZE))

      const snapshot = await getDocs(query(this.portfoliosRef, ...constraints))
      const docs = snapshot.docs
      const items = docs.map(Portfolio.fromSnapshot)
      const newMap = new Map(this.portfolioInfoStateList.itemList)

      items.forEach(item => {
        newMap.set(item.id, item)
      })

      this.portfolioInfoStateList = {
        itemList: newMap,
        lastVisibleDocument: docs.at(-1) ?? null,
        isInitialized: true,
        isLoading: false,
        hasMore: docs.length === this.PAGE_SIZE,
      }
    } catch (e) {
      console.error("loadNextPage error", e)
      this.portfolioInfoStateList = {
        ...this.portfolioInfoStateList,
        isLoading: false,
      }
    }
  }

  reset() {
    this.portfolioInfoStateList = {
      itemList: new Map(),
      lastVisibleDocument: null,
      isInitialized: false,
      isLoading: false,
      hasMore: true,
    }
  }


}