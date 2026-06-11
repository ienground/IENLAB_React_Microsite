import {User} from "@/domain/model/User.ts"
import dayjs, {type Dayjs} from "dayjs"
import {Timestamp, type DocumentReference} from "firebase/firestore"
import {Company} from "@/domain/model/Company.ts"

export class UserEditDetails {
  deletedAt: Dayjs | null = null
  name: string = ""
  companyRef: DocumentReference | null = null
  company: Company | null = null
  level: User.Level = User.Level.Default
  state: User.State = User.State.Default
  phone: string = ""
  email: string = ""

  isDirty: boolean = false

  constructor(partial: Partial<UserEditDetails> = {}) {
    Object.assign(this, partial)
  }

  toItem(): User {
    return new User({
      deletedAt: this.deletedAt ? Timestamp.fromDate(this.deletedAt.toDate()) : null,
      name: this.name,
      companyRef: this.companyRef,
      company: this.company,
      level: this.level,
      state: this.state,
      phone: this.phone,
      email: this.email
    })
  }

  static fromItem(item: User): UserEditDetails {
    return new UserEditDetails({
      deletedAt: item.deletedAt ? dayjs(item.deletedAt.toDate()) : null,
      name: item.name,
      companyRef: item.companyRef,
      company: item.company,
      level: item.level,
      state: item.state,
      phone: item.phone,
      email: item.email
    })
  }
}
