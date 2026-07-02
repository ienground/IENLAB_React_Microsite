import dayjs, {type Dayjs} from "dayjs"
import type {Localized} from "@ienlab/react-library"
import {Notice} from "@/domain/model/Notice.ts"
import {type DocumentReference, Timestamp} from "firebase/firestore"

export class NoticeContentEditDetails {
  deletedAt: Dayjs | null = null
  category: Notice.Category | null = null
  categoryRef: DocumentReference | null = null
  title: Localized<string> = { ko: "", en: "" }
  content: Localized<string> = { ko: "", en: "" }
  state: Notice.Content.State = Notice.Content.State.Default

  isDirty: boolean = false

  constructor(partial: Partial<NoticeContentEditDetails> = {}) {
    Object.assign(this, partial)
  }

  toItem(): Notice.Content {
    return new Notice.Content({
      deletedAt: this.deletedAt ? Timestamp.fromDate(this.deletedAt.toDate()) : null,
      category: this.category,
      categoryRef: this.categoryRef,
      title: this.title,
      content: this.content,
      state: this.state
    })
  }

  static fromItem(item: Notice.Content): NoticeContentEditDetails {
    return new NoticeContentEditDetails({
      deletedAt: item.deletedAt ? dayjs(item.deletedAt.toDate()) : null,
      category: item.category,
      categoryRef: item.categoryRef,
      title: item.title,
      content: item.content,
      state: item.state
    })
  }
}