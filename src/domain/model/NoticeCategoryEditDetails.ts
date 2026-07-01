import type {Localized} from "@ienlab/react-library"
import {Notice} from "@/domain/model/Notice.ts"
import dayjs, {type Dayjs} from "dayjs"
import {Timestamp} from "firebase/firestore"

export class NoticeCategoryEditDetails {
  deletedAt: Dayjs | null = null
  name: Localized<string> = { ko: "", en: "" }
  isActive: boolean = true

  isDirty: boolean = false

  constructor(partial: Partial<NoticeCategoryEditDetails> = {}) {
    Object.assign(this, partial)
  }

  toItem(): Notice.Category {
    return new Notice.Category({
      deletedAt: this.deletedAt ? Timestamp.fromDate(this.deletedAt.toDate()) : null,
      name: this.name,
      isActive: this.isActive,
    })
  }

  static fromItem(item: Notice.Category): NoticeCategoryEditDetails {
    return new NoticeCategoryEditDetails({
      deletedAt: item.deletedAt ? dayjs(item.deletedAt.toDate()) : null,
      name: item.name,
      isActive: item.isActive
    })
  }
}