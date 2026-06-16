import {Outsource} from "@/domain/model/Outsource.ts"
import dayjs, {type Dayjs} from "dayjs"
import {Timestamp, type DocumentReference} from "firebase/firestore"
import {Portfolio} from "@/domain/model/Portfolio.ts"
import {Company} from "@/domain/model/Company.ts"
import {Estimate} from "@/domain/model/Estimate.ts"
import type {Localized} from "@ienlab/react-library"

export class OutsourceEditDetails {
  deletedAt: Dayjs | null = null
  targetCompany: Company | null = null
  targetCompanyRef: DocumentReference | null = null
  title: Localized<string> = { ko: "", en: "" }
  state: Outsource.State = Outsource.State.Default
  phase: Outsource.Phase = Outsource.Phase.Default
  platforms: Portfolio.Platform[] = []
  estimate: Estimate | null = null
  estimateRef: DocumentReference | null = null

  quotedAt: Dayjs | null = null
  contractedAt: Dayjs | null = null
  startedAt: Dayjs | null = null
  dueAt: Dayjs | null = null
  completedAt: Dayjs | null = null
  cancelledAt: Dayjs | null = null
  pausedAt: Dayjs | null = null
  waitingClientAt: Dayjs | null = null

  isDirty = false

  constructor(partial: Partial<OutsourceEditDetails> = {}) {
    Object.assign(this, partial)
  }

  toItem(): Outsource {
    return new Outsource({
      deletedAt: this.deletedAt ? Timestamp.fromDate(this.deletedAt.toDate()) : null,
      targetCompany: this.targetCompany,
      targetCompanyRef: this.targetCompanyRef,
      title: this.title,
      state: this.state,
      phase: this.phase,
      platforms: this.platforms,
      estimate: this.estimate,
      estimateRef: this.estimateRef,

      quotedAt: this.quotedAt ? Timestamp.fromDate(this.quotedAt.toDate()) : null,
      contractedAt: this.contractedAt ? Timestamp.fromDate(this.contractedAt.toDate()) : null,
      startedAt: this.startedAt ? Timestamp.fromDate(this.startedAt.toDate()) : null,
      dueAt: this.dueAt ? Timestamp.fromDate(this.dueAt.toDate()) : null,
      completedAt: this.completedAt ? Timestamp.fromDate(this.completedAt.toDate()) : null,
      cancelledAt: this.cancelledAt ? Timestamp.fromDate(this.cancelledAt.toDate()) : null,
      pausedAt: this.pausedAt ? Timestamp.fromDate(this.pausedAt.toDate()) : null,
      waitingClientAt: this.waitingClientAt ? Timestamp.fromDate(this.waitingClientAt.toDate()) : null,
    })
  }

  static fromItem(item: Outsource): OutsourceEditDetails {
    return new OutsourceEditDetails({
      deletedAt: item.deletedAt ? dayjs(item.deletedAt.toDate()) : null,
      targetCompany: item.targetCompany,
      targetCompanyRef: item.targetCompanyRef,
      title: item.title,
      state: item.state,
      phase: item.phase,
      platforms: item.platforms,
      estimate: item.estimate,
      estimateRef: item.estimateRef,

      quotedAt: item.quotedAt ? dayjs(item.quotedAt.toDate()) : null,
      contractedAt: item.contractedAt ? dayjs(item.contractedAt.toDate()) : null,
      startedAt: item.startedAt ? dayjs(item.startedAt.toDate()) : null,
      dueAt: item.dueAt ? dayjs(item.dueAt.toDate()) : null,
      completedAt: item.completedAt ? dayjs(item.completedAt.toDate()) : null,
      cancelledAt: item.cancelledAt ? dayjs(item.cancelledAt.toDate()) : null,
      pausedAt: item.pausedAt ? dayjs(item.pausedAt.toDate()) : null,
      waitingClientAt: item.waitingClientAt ? dayjs(item.waitingClientAt.toDate()) : null,
    })
  }

  applyStateDate(state: Outsource.State, date: Dayjs | null): Partial<OutsourceEditDetails> {
    switch (state) {
      case Outsource.State.ACTIVE:
        return {}
      case Outsource.State.PAUSED:
        return { pausedAt: date }
      case Outsource.State.CANCELLED:
        return { cancelledAt: date }
      default:
        return {}
    }
  }

  getStateDate(state: Outsource.State) {
    switch (state) {
      case Outsource.State.ACTIVE:
        return this.quotedAt
      case Outsource.State.PAUSED:
        return this.pausedAt
      case Outsource.State.CANCELLED:
        return this.cancelledAt
      default:
        return null
    }
  }

  applyPhaseDate(phase: Outsource.Phase, date: Dayjs | null): Partial<OutsourceEditDetails> {
    switch (phase) {
      case Outsource.Phase.QUOTING:
        return { quotedAt: date }
      case Outsource.Phase.CONTRACT_PENDING:
        return { contractedAt: date }
      case Outsource.Phase.IN_PROGRESS:
        return { startedAt: date }
      case Outsource.Phase.WAITING_CLIENT:
        return { waitingClientAt: date }
      case Outsource.Phase.COMPLETED:
        return { completedAt: date }
      default:
        return {}
    }
  }

  getPhaseDate(phase: Outsource.Phase) {
    switch (phase) {
      case Outsource.Phase.QUOTING:
        return this.quotedAt
      case Outsource.Phase.CONTRACT_PENDING:
        return this.contractedAt
      case Outsource.Phase.IN_PROGRESS:
        return this.startedAt
      case Outsource.Phase.WAITING_CLIENT:
        return this.waitingClientAt
      case Outsource.Phase.COMPLETED:
        return this.completedAt
      default:
        return null
    }
  }
}
