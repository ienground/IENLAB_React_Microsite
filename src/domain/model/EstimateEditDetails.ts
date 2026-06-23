import dayjs, {type Dayjs} from "dayjs"
import {Timestamp} from "firebase/firestore"
import type {DocumentReference} from "firebase/firestore"
import {Estimate} from "@/domain/model/Estimate.ts"
import {Company} from "@/domain/model/Company.ts"
import {Portfolio} from "@/domain/model/Portfolio.ts"

export class EstimateEditDetails {
  expireAt: Dayjs | null = null
  estimateAt: Dayjs | null = null
  title: string = ""
  memo: string = ""
  budget: number = 0
  companyRef: DocumentReference | null = null
  company: Company | null = null
  platforms: Portfolio.Platform[] = []
  state: Estimate.State = Estimate.State.Default
  totalAmount: number = 0

  isDirty: boolean = false

  constructor(partial: Partial<EstimateEditDetails> = {}) {
    Object.assign(this, partial)
  }

  toItem(): Estimate {
    return new Estimate({
      expireAt: this.expireAt ? Timestamp.fromDate(this.expireAt.toDate()) : null,
      estimateAt: this.estimateAt ? Timestamp.fromDate(this.estimateAt.toDate()) : null,
      title: this.title,
      memo: this.memo,
      budget: this.budget,
      companyRef: this.companyRef,
      company: this.company,
      platforms: this.platforms,
      state: this.state,
      totalAmount: this.totalAmount,
    })
  }

  static fromItem(item: Estimate): EstimateEditDetails {
    return new EstimateEditDetails({
      expireAt: item.expireAt ? dayjs(item.expireAt.toDate()) : null,
      estimateAt: item.estimateAt ? dayjs(item.estimateAt.toDate()) : null,
      title: item.title,
      memo: item.memo,
      budget: item.budget,
      companyRef: item.companyRef,
      company: item.company,
      platforms: item.platforms,
      state: item.state,
      totalAmount: item.totalAmount,
    })
  }
}
