import {type InfScrollStateList} from "@ienlab/react-library"
import type {DocumentReference, Unsubscribe} from "firebase/firestore"
import {Outsource} from "@/domain/model/Outsource.ts"
import type {OutsourceLogEditDetails} from "@/domain/model/OutsourceLogEditDetails.ts"

export interface OutsourceLogRepository {
  readonly logInfoStateList: InfScrollStateList<Outsource.WorkLog>

  get(id: string): Promise<Outsource.WorkLog | null>
  observe(id: string, callback: (item: Outsource.WorkLog | null) => void, cache?: boolean): Unsubscribe

  create(item: OutsourceLogEditDetails): Promise<DocumentReference>
  update(id: string, item: OutsourceLogEditDetails): Promise<void>
  delete(id: string): Promise<void>

  getLatestItems(count: number): Promise<Outsource.WorkLog[]>

  setSearchKeyword(keyword: string): void
  clearSearch(): void
  loadNextPage(): Promise<void>
  reset(): void
}