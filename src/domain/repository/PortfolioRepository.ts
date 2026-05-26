import type {InfScrollStateList} from "@ienlab/react-library"
import type { Unsubscribe } from "firebase/firestore"
import type {Portfolio} from "@/domain/model/Portfolio.tsx"

export interface PortfolioRepository {
  readonly portfolioInfoStateList: InfScrollStateList<Portfolio>

  get(id: string): Promise<Portfolio | null>
  observe(id: string, callback: (item: Portfolio | null) => void, cache?: boolean): Unsubscribe
  observePrimaries(callback: (items: Portfolio[]) => void): Unsubscribe

  setSearchKeyword(keyword: string): void
  clearSearch(): void
  loadNextPage(): Promise<void>
  reset(): void
}