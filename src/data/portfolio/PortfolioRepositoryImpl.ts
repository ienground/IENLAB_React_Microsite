import type {PortfolioRepository} from "@/domain/repository/PortfolioRepository.ts";
import {collection, onSnapshot, query, where, type Firestore, type Unsubscribe} from "firebase/firestore";
import {FirestorePath} from "@/constant/FirestorePath.ts";
import {Portfolio} from "@/domain/model/Portfolio.ts";
import {getSnapshots, type InfScrollStateList} from "@ienlab/react-library";

export class PortfolioRepositoryImpl implements PortfolioRepository {
  private readonly portfoliosRef
  private readonly PAGE_SIZE = 20;

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

  getPrimaries(callback: (items: Portfolio[]) => void) {
    const q = query(
      this.portfoliosRef,
      where(FirestorePath.Portfolio.IS_PRIMARY, "==", true)
    )
    return getSnapshots(
      q,
      snapshot => {
        callback(snapshot.docs.map(Portfolio.fromSnapshot))
      }
    )
  }
  get(id: string, callback: (item: (Portfolio | null)) => void): Unsubscribe {
    throw Error("Method not implemented")
  }

  loadNextPage(): Promise<void> {
    throw Error("Method not implemented")
  }
}