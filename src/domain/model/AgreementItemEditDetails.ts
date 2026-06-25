import {Env} from "@/domain/model/Env.ts"
import type {Localized} from "@ienlab/react-library"

let uidCounter = 0

export class AgreementItemEditDetails {
  _uid: string
  _docId?: string
  id: string = ""
  title: Localized<string> = { ko: "", en: "" }
  content: Localized<string> = { ko: "", en: "" }
  key: string = ""
  required: boolean = true
  sortOrder: number = 0
  isDirty: boolean = false
  isNew: boolean = false

  constructor(partial: Partial<AgreementItemEditDetails> = {}) {
    this._uid = `edit-${++uidCounter}`
    Object.assign(this, partial)
  }

  toItem(): Env.Agreement.Item {
    return new Env.Agreement.Item({
      id: this.id,
      title: this.title,
      content: this.content,
      key: this.key,
      required: this.required,
      sortOrder: this.sortOrder,
    })
  }

  static fromItem(item: Env.Agreement.Item): AgreementItemEditDetails {
    return new AgreementItemEditDetails({
      _docId: item.ref?.id,
      id: item.id,
      title: {...item.title},
      content: {...item.content},
      key: item.key,
      required: item.required,
      sortOrder: item.sortOrder,
    })
  }
}
