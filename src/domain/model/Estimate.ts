import {type BadgeColor, type FirestoreItem, type Localized, snapshotToData} from "@ienlab/react-library"
import {
  type DocumentReference, type DocumentSnapshot,
  type QueryDocumentSnapshot,
  serverTimestamp,
  Timestamp
} from "firebase/firestore"
import {FirestorePath} from "@/constant/FirestorePath.ts"
import type {TFunction} from "i18next"
import {Company} from "@/domain/model/Company.ts"
import {Portfolio} from "@/domain/model/Portfolio.ts"

export class Estimate implements FirestoreItem {
  id: string = ""
  ref: DocumentReference | null = null
  createAt: Timestamp = Timestamp.now()
  updateAt: Timestamp = Timestamp.now()
  deletedAt: Timestamp | null = null
  expireAt: Timestamp | null = null
  estimateAt: Timestamp | null = null
  title: string = ""
  memo: string = ""
  budget: number = 0
  companyRef: DocumentReference | null = null
  company: Company | null = null
  platforms: Portfolio.Platform[] = []
  state: Estimate.State = Estimate.State.Default
  plans: Estimate.Plan[] = []
  totalAmount: number = 0

  constructor(partial: Partial<Estimate> = {}) {
    Object.assign(this, partial)
  }

  toHashMap(isUpdate: boolean = false) {
    const map: Record<string, unknown> = {
      [FirestorePath.UPDATE_AT]: serverTimestamp(),
      [FirestorePath.DELETED_AT]: this.deletedAt,
      [FirestorePath.Estimate.EXPIRE_AT]: this.expireAt,
      [FirestorePath.Estimate.TITLE]: this.title,
      [FirestorePath.Estimate.MEMO]: this.memo,
      [FirestorePath.Estimate.BUDGET]: this.budget,
      [FirestorePath.Estimate.COMPANY]: this.companyRef,
      [FirestorePath.Estimate.PLATFORMS]: this.platforms,
      [FirestorePath.Estimate.PLANS]: this.plans,
      [FirestorePath.Estimate.TOTAL_AMOUNT]: this.totalAmount,
    }

    if (!isUpdate) {
      map[FirestorePath.CREATE_AT] = serverTimestamp()
    }

    return map
  }

  static fromSnapshot(snapshot: QueryDocumentSnapshot | DocumentSnapshot): Estimate {
    const doc = snapshotToData(snapshot)
    return new Estimate({
      id: doc.id,
      ref: snapshot.ref,
      createAt: doc[FirestorePath.CREATE_AT],
      updateAt: doc[FirestorePath.UPDATE_AT],
      deletedAt: doc[FirestorePath.DELETED_AT],
      expireAt: doc[FirestorePath.Estimate.EXPIRE_AT],
      estimateAt: doc[FirestorePath.Estimate.ESTIMATE_AT],
      title: doc[FirestorePath.Estimate.TITLE],
      memo: doc[FirestorePath.Estimate.MEMO],
      budget: doc[FirestorePath.Estimate.BUDGET],
      companyRef: doc[FirestorePath.Estimate.COMPANY],
      platforms: doc[FirestorePath.Estimate.PLATFORMS],
      state: doc[FirestorePath.Estimate.STATE],
      plans: doc[FirestorePath.Estimate.PLANS] ?? [],
      totalAmount: doc[FirestorePath.Estimate.TOTAL_AMOUNT] ?? 0,
    })
  }
}

export namespace Estimate {
  export enum State {
    DRAFT = 0, SENT = 1, ACCEPTED = 2, REJECTED = 3
  }

  export namespace State {
    export const Default = State.DRAFT
    export const values = [State.DRAFT, State.SENT, State.ACCEPTED, State.REJECTED]
    export function getLabel(t: TFunction, value: State) {
      const map = {
        [State.DRAFT]: t("types:estimate.state.draft.label"),
        [State.SENT]: t("types:estimate.state.sent.label"),
        [State.ACCEPTED]: t("types:estimate.state.accepted.label"),
        [State.REJECTED]: t("types:estimate.state.rejected.label"),
      }
      return map[value]
    }
    export function getDescription(t: TFunction, value: State) {
      const map = {
        [State.DRAFT]: t("types:estimate.state.draft.desc"),
        [State.SENT]: t("types:estimate.state.sent.desc"),
        [State.ACCEPTED]: t("types:estimate.state.accepted.desc"),
        [State.REJECTED]: t("types:estimate.state.rejected.desc"),
      }
      return map[value]
    }
    export function getBadgeColor(value: State) {
      const map = {
        [State.DRAFT]: "outline" as BadgeColor,
        [State.SENT]: "default" as BadgeColor,
        [State.ACCEPTED]: "success" as BadgeColor,
        [State.REJECTED]: "destructive" as BadgeColor,
      }
      return map[value]
    }
  }

  export class Plan {
    title: string = ""
    days: number = 0

    constructor(partial: Partial<Plan> = {}) {
      Object.assign(this, partial)
    }
  }

  export class Item implements FirestoreItem {
    id: string = ""
    ref: DocumentReference | null = null
    createAt: Timestamp = Timestamp.now()
    updateAt: Timestamp = Timestamp.now()
    deletedAt: Timestamp | null = null
    title: Localized<string> = { ko: "", en: "" }
    description: Localized<string> = { ko: "", en: "" }
    unitPrice: number = 0
    amount: number = 0
    sortOrder: number = 0
    priceContentRef: DocumentReference | null = null

    constructor(partial: Partial<Item> = {}) {
      Object.assign(this, partial)
    }

    toHashMap(isUpdate: boolean = false) {
      const map: Record<string, unknown> = {
        [FirestorePath.UPDATE_AT]: serverTimestamp(),
        [FirestorePath.DELETED_AT]: this.deletedAt,
        [FirestorePath.Estimate.Item.TITLE]: this.title,
        [FirestorePath.Estimate.Item.DESCRIPTION]: this.description,
        [FirestorePath.Estimate.Item.UNIT_PRICE]: this.unitPrice,
        [FirestorePath.Estimate.Item.AMOUNT]: this.amount,
        [FirestorePath.Estimate.Item.SORT_ORDER]: this.sortOrder,
        [FirestorePath.Estimate.Item.PRICE_CONTENT]: this.priceContentRef,
      }

      if (!isUpdate) {
        map[FirestorePath.CREATE_AT] = serverTimestamp()
      }

      return map
    }

    static fromSnapshot(snapshot: QueryDocumentSnapshot | DocumentSnapshot): Item {
      const doc = snapshotToData(snapshot)
      return new Item({
        id: doc.id,
        ref: snapshot.ref,
        createAt: doc[FirestorePath.CREATE_AT],
        updateAt: doc[FirestorePath.UPDATE_AT],
        deletedAt: doc[FirestorePath.DELETED_AT],
        title: doc[FirestorePath.Estimate.Item.TITLE],
        description: doc[FirestorePath.Estimate.Item.DESCRIPTION],
        unitPrice: doc[FirestorePath.Estimate.Item.UNIT_PRICE],
        amount: doc[FirestorePath.Estimate.Item.AMOUNT],
        sortOrder: doc[FirestorePath.Estimate.Item.SORT_ORDER] ?? 0,
        priceContentRef: doc[FirestorePath.Estimate.Item.PRICE_CONTENT],
      })
    }
  }
}
