import type {InfScrollStateList} from "@ienlab/react-library"
import {Notice} from "@/domain/model/Notice.ts"
import type {DocumentReference, Unsubscribe} from "firebase/firestore"
import type {NoticeCategoryEditDetails} from "@/domain/model/NoticeCategoryEditDetails.ts"

export interface NoticeCategoryRepository {
  readonly categoryInfoStateList: InfScrollStateList<Notice.Category>

  get(id: string): Promise<Notice.Category | null>
  observe(id: string, callback: (item: Notice.Category | null) => void, cache?: boolean): Unsubscribe
  observeList(callback: (items: Notice.Category[]) => void, cache?: boolean): Unsubscribe

  create(item: NoticeCategoryEditDetails): Promise<DocumentReference>
  update(id: string, item: NoticeCategoryEditDetails): Promise<void>
  delete(id: string): Promise<void>

  setSearchKeyword(keyword: string): void
  clearSearch(): void

  loadNextPage(): Promise<void>
  reset(): void
}
