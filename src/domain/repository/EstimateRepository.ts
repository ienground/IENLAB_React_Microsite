import type {InfScrollStateList} from "@ienlab/react-library"
import type {DocumentReference, Unsubscribe} from "firebase/firestore"
import type {Estimate} from "@/domain/model/Estimate.ts"
import type {EstimateEditDetails} from "@/domain/model/EstimateEditDetails.ts"

export interface EstimateRepository {
  readonly estimateInfoStateList: InfScrollStateList<Estimate>

  get(id: string): Promise<Estimate | null>
  observe(id: string, callback: (item: Estimate | null) => void, cache?: boolean): Unsubscribe

  create(item: EstimateEditDetails): Promise<DocumentReference>
  update(id: string, item: EstimateEditDetails): Promise<void>
  updateState(id: string, state: Estimate.State): Promise<void>
  delete(id: string): Promise<void>

  setSearchKeyword(keyword: string): void
  clearSearch(): void
  loadNextPage(): Promise<void>
  reset(): void
  downloadPdf(itemId: string): Promise<{ result: Blob, name: string }>
}
