import {Company} from "@/domain/model/Company.ts"
import dayjs, {type Dayjs} from "dayjs"
import {Timestamp} from "firebase/firestore"
import type {Localized} from "@ienlab/react-library"

export class CompanyEditDetails {
  deletedAt: Dayjs | null = null
  name: Localized<string> = { ko: "", en: "" }
  state: Company.State = Company.State.Default

  isDirty: boolean = false

  constructor(partial: Partial<CompanyEditDetails> = {}) {
    Object.assign(this, partial)
  }

  toItem(): Company {
    return new Company({
      deletedAt: this.deletedAt ? Timestamp.fromDate(this.deletedAt.toDate()) : null,
      name: this.name,
      state: this.state
    })
  }

  static fromItem(item: Company): CompanyEditDetails {
    return new CompanyEditDetails({
      deletedAt: item.deletedAt ? dayjs(item.deletedAt.toDate()) : null,
      name: item.name,
      state: item.state
    })
  }
}
