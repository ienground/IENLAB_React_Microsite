import {FileUploadItem, type InfScrollStateList, Localized} from "@ienlab/react-library"
import type {DocumentReference, Unsubscribe} from "firebase/firestore"
import {Outsource} from "@/domain/model/Outsource.ts"
import type {OutsourceRevisionEditDetails} from "@/domain/model/OutsourceRevisionEditDetails.ts"

export interface OutsourceRevisionRepository {
  readonly requestInfoStateList: InfScrollStateList<Outsource.RevisionRequest>

  get(id: string): Promise<Outsource.RevisionRequest | null>
  observe(id: string, callback: (item: Outsource.RevisionRequest | null) => void, cache?: boolean): Unsubscribe

  create(item: OutsourceRevisionEditDetails): Promise<DocumentReference>
  clientCreate(item: OutsourceRevisionEditDetails): Promise<DocumentReference>
  update(id: string, item: OutsourceRevisionEditDetails): Promise<void>
  updateState(id: string, state: Outsource.RevisionRequest.State): Promise<void>
  clientUpdate(id: string, item: OutsourceRevisionEditDetails): Promise<void>
  delete(id: string): Promise<void>

  getLatestItems(count: number): Promise<Outsource.RevisionRequest[]>

  setSearchKeyword(keyword: string): void
  clearSearch(): void
  loadNextPage(): Promise<void>
  reset(): void
}