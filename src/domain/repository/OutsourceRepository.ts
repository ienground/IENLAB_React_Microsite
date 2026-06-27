import type {InfScrollStateList} from "@ienlab/react-library"
import type {Outsource} from "@/domain/model/Outsource.ts"
import type {DocumentReference, Unsubscribe} from "firebase/firestore"
import type {OutsourceEditDetails} from "@/domain/model/OutsourceEditDetails.ts"

export interface OutsourceRepository {
  readonly outsourceInfoStateList: InfScrollStateList<Outsource>

  get(id: string): Promise<Outsource | null>
  observe(id: string, callback: (item: Outsource | null) => void, cache?: boolean): Unsubscribe

  create(item: OutsourceEditDetails): Promise<DocumentReference>
  update(id: string, item: OutsourceEditDetails): Promise<void>
  delete(id: string): Promise<void>

  getRecentItems(companyRef: DocumentReference, count: number): Promise<Outsource[]>

  setSearchKeyword(keyword: string): void
  clearSearch(): void
  setCompanyFilter(companyRef: DocumentReference | null): void
  clearCompanyFilter(): void
  loadNextPage(): Promise<void>
  reset(): void
}
