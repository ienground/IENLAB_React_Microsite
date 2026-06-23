import type {InfScrollStateList} from "@ienlab/react-library"
import type {Portfolio} from "@/domain/model/Portfolio.ts"
import type {Unsubscribe} from "firebase/firestore"
import type {PortfolioEditDetails} from "@/domain/model/PortfolioEditDetails.ts"

export interface PortfolioRepository {
  readonly portfolioInfoStateList: InfScrollStateList<Portfolio>

  get(id: string): Promise<Portfolio | null>
  observe(id: string, callback: (item: Portfolio | null) => void, cache?: boolean): Unsubscribe
  observePrimaries(callback: (items: Portfolio[]) => void): Unsubscribe

  create(id: string, item: PortfolioEditDetails): Promise<void>
  update(id: string, item: PortfolioEditDetails): Promise<void>
  delete(id: string): Promise<void>

  setSearchKeyword(keyword: string): void
  clearSearch(): void
  loadNextPage(): Promise<void>
  reset(): void
}
