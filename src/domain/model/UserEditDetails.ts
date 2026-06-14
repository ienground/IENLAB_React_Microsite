import {User} from "@/domain/model/User.ts"
import dayjs, {type Dayjs} from "dayjs"
import {Timestamp, type DocumentReference} from "firebase/firestore"
import {Company} from "@/domain/model/Company.ts"
import {FileUploadItem, PhoneVerify} from "@ienlab/react-library"

export class UserEditDetails {
  deletedAt: Dayjs | null = null
  name: string = ""
  profileUrl: FileUploadItem = new FileUploadItem()
  companyRef: DocumentReference | null = null
  company: Company | null = null
  tempCompanyRef: DocumentReference | null = null
  tempCompany: Company | null = null
  level: User.Level = User.Level.Default
  state: User.State = User.State.Default
  phone: string = ""
  email: string = ""

  otpCode: string = ""
  otpRequestState: PhoneVerify.Request = PhoneVerify.Request.Default
  otpResultState: PhoneVerify.Result = PhoneVerify.Result.Default

  isDirty: boolean = false

  constructor(partial: Partial<UserEditDetails> = {}) {
    Object.assign(this, partial)
  }

  toItem(): User {
    return new User({
      deletedAt: this.deletedAt ? Timestamp.fromDate(this.deletedAt.toDate()) : null,
      name: this.name,
      profileUrl: this.profileUrl.url,
      companyRef: this.companyRef,
      company: this.company,
      tempCompanyRef: this.tempCompanyRef,
      tempCompany: this.tempCompany,
      level: this.level,
      state: this.state,
      phone: this.phone
    })
  }

  static fromItem(item: User, email?: string): UserEditDetails {
    return new UserEditDetails({
      deletedAt: item.deletedAt ? dayjs(item.deletedAt.toDate()) : null,
      name: item.name,
      profileUrl: new FileUploadItem({ url: item.profileUrl, file: null }),
      companyRef: item.companyRef,
      company: item.company,
      tempCompanyRef: item.tempCompanyRef,
      tempCompany: item.tempCompany,
      level: item.level,
      state: item.state,
      phone: item.phone,
      email
    })
  }
}
