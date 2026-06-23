import type {InfScrollStateList} from "@ienlab/react-library"
import type {Outsource} from "@/domain/model/Outsource.ts"
import type {DocumentReference, Unsubscribe} from "firebase/firestore"
import type {OutsourceRequestEditDetails} from "@/domain/model/OutsourceRequestEditDetails.ts"

export interface OutsourceRequestRepository {
  readonly requestInfoStateList: InfScrollStateList<Outsource.InfoRequest>

  get(id: string): Promise<Outsource.InfoRequest | null>
  observe(id: string, callback: (item: Outsource.InfoRequest | null) => void, cache?: boolean): Unsubscribe

  create(item: OutsourceRequestEditDetails): Promise<DocumentReference>
  update(id: string, item: OutsourceRequestEditDetails): Promise<void>
  clientUpdate(id: string, item: OutsourceRequestEditDetails): Promise<void>
  updateState(id: string, state: Outsource.InfoRequest.State): Promise<void>
  decryptText(encrypted: string): Promise<string>
  delete(id: string): Promise<void>

  getLatestRequests(count: number): Promise<Outsource.InfoRequest[]>

  setSearchKeyword(keyword: string): void
  clearSearch(): void
  loadNextPage(): Promise<void>
  reset(): void
}
