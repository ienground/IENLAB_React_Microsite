import type {InfScrollStateList} from "@ienlab/react-library";
import type {Portfolio} from "@/domain/model/Portfolio.ts";
import type { Unsubscribe } from "firebase/firestore";

export interface PortfolioRepository {
  readonly portfolioInfoStateList: InfScrollStateList<Portfolio>

  getPrimaries(callback: (items: Portfolio[]) => void): Unsubscribe
  get(id: string, callback: (item: Portfolio | null) => void): Unsubscribe

  loadNextPage(): Promise<void>
}