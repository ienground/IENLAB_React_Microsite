import type {InfScrollStateList} from "@ienlab/react-library"
import {Notice} from "@/domain/model/Notice.ts"
import type {DocumentReference, Unsubscribe} from "firebase/firestore"
import type {NoticeContentEditDetails} from "@/domain/model/NoticeContentEditDetails.ts"

export interface NoticeContentRepository {
  readonly contentInfoStateList: InfScrollStateList<Notice.Content>

  get(id: string): Promise<Notice.Content | null>
  observe(id: string, callback: (item: Notice.Content | null) => void, cache?: boolean): Unsubscribe

  create(item: NoticeContentEditDetails): Promise<DocumentReference>
  update(id: string, item: NoticeContentEditDetails): Promise<void>
  delete(id: string): Promise<void>
  uploadContentImage(file: File): Promise<string>

  setState(state: Notice.Content.State): void
  clearState(): void

  setSearchKeyword(keyword: string): void
  clearSearch(): void

  loadNextPage(): Promise<void>
  reset(): void
}
