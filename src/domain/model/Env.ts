import {type FirestoreItem, type Localized, snapshotToData} from "@ienlab/react-library"
import {
  type DocumentReference,
  type DocumentSnapshot,
  type QueryDocumentSnapshot,
  serverTimestamp,
  Timestamp
} from "firebase/firestore"
import {FirestorePath} from "@/constant/FirestorePath.ts"

export namespace Env {
  export class Agreement {
    ref: DocumentReference | null = null
    updateAt: Timestamp = Timestamp.now()

    constructor(partial: Partial<Agreement> = {}) {
      Object.assign(this, partial)
    }

    static fromSnapshot(snapshot: QueryDocumentSnapshot | DocumentSnapshot): Agreement {
      const doc = snapshotToData(snapshot)
      return new Agreement({
        ref: snapshot.ref,
        updateAt: doc[FirestorePath.UPDATE_AT]
      })
    }
  }

  export namespace Agreement {
    export class Item implements FirestoreItem {
      id: string = ""
      ref: DocumentReference | null = null
      createAt: Timestamp = Timestamp.now()
      updateAt: Timestamp = Timestamp.now()
      deletedAt: Timestamp | null = null
      title: Localized<string> = { ko: "", en: "" }
      content: Localized<string> = { ko: "", en: "" }
      required: boolean = true
      sortOrder: number = 0

      constructor(partial: Partial<Item> = {}) {
        Object.assign(this, partial)
      }

      toHashMap(isUpdate: boolean = false) {
        const map: Record<string, unknown> = {
          [FirestorePath.Env.Agreement.Items.KEY]: this.id,
          [FirestorePath.DELETED_AT]: this.deletedAt,
          [FirestorePath.Env.Agreement.Items.TITLE]: this.title,
          [FirestorePath.Env.Agreement.Items.CONTENT]: this.content,
          [FirestorePath.Env.Agreement.Items.REQUIRED]: this.required,
          [FirestorePath.Env.Agreement.Items.SORT_ORDER]: this.sortOrder,
        }

        if (!isUpdate) {
          map[FirestorePath.CREATE_AT] = serverTimestamp()
        }

        return map
      }

      static fromSnapshot(snapshot: QueryDocumentSnapshot | DocumentSnapshot): Item {
        const doc = snapshotToData(snapshot)
        return new Item({
          id: doc[FirestorePath.Env.Agreement.Items.KEY] ?? "",
          ref: snapshot.ref,
          createAt: doc[FirestorePath.CREATE_AT],
          updateAt: doc[FirestorePath.UPDATE_AT],
          deletedAt: doc[FirestorePath.DELETED_AT],
          title: doc[FirestorePath.Env.Agreement.Items.TITLE],
          content: doc[FirestorePath.Env.Agreement.Items.CONTENT],
          required: doc[FirestorePath.Env.Agreement.Items.REQUIRED] ?? true,
          sortOrder: doc[FirestorePath.Env.Agreement.Items.SORT_ORDER] ?? 0,
        })
      }
    }
  }


  export class DataLength {
    user: Env.DataLength.CollectionCount = {total: 0, today: 0, pending: 0, active: 0, suspended: 0, ended: 0}
    estimate: Env.DataLength.CollectionCount = {total: 0, today: 0, draft: 0, sent: 0, accepted: 0, rejected: 0}
    portfolio: Env.DataLength.CollectionCount = {total: 0, today: 0, pending: 0, active: 0, ended: 0}
    company: Env.DataLength.CollectionCount = {total: 0, today: 0, pending: 0, admitted: 0}
    outsource: Env.DataLength.CollectionCount = {total: 0, today: 0, active: 0, paused: 0, cancelled: 0}

    constructor(partial: Partial<DataLength> = {}) {
      Object.assign(this, partial)
    }

    static fromSnapshot(snapshot: QueryDocumentSnapshot | DocumentSnapshot): DataLength {
      const doc = snapshotToData(snapshot)
      const group = (colId: string) => doc?.[colId] ?? {}
      const total = (colId: string) => group(colId)?.[FirestorePath.Env.DataLength.TOTAL] ?? 0
      const today = (colId: string) => group(colId)?.[FirestorePath.Env.DataLength.TODAY] ?? 0
      const get = (colId: string, field: string) => group(colId)?.[field] ?? 0

      return new DataLength({
        user: {
          total: total(FirestorePath.USER),
          today: today(FirestorePath.USER),
          pending: get(FirestorePath.USER, FirestorePath.Env.DataLength.PENDING),
          active: get(FirestorePath.USER, FirestorePath.Env.DataLength.ACTIVE),
          suspended: get(FirestorePath.USER, FirestorePath.Env.DataLength.SUSPENDED),
          ended: get(FirestorePath.USER, FirestorePath.Env.DataLength.ENDED),
        },
        estimate: {
          total: total(FirestorePath.ESTIMATE),
          today: today(FirestorePath.ESTIMATE),
          draft: get(FirestorePath.ESTIMATE, FirestorePath.Env.DataLength.DRAFT),
          sent: get(FirestorePath.ESTIMATE, FirestorePath.Env.DataLength.SENT),
          accepted: get(FirestorePath.ESTIMATE, FirestorePath.Env.DataLength.ACCEPTED),
          rejected: get(FirestorePath.ESTIMATE, FirestorePath.Env.DataLength.REJECTED),
        },
        portfolio: {
          total: total(FirestorePath.PORTFOLIO),
          today: today(FirestorePath.PORTFOLIO),
          pending: get(FirestorePath.PORTFOLIO, FirestorePath.Env.DataLength.PENDING),
          active: get(FirestorePath.PORTFOLIO, FirestorePath.Env.DataLength.ACTIVE),
          ended: get(FirestorePath.PORTFOLIO, FirestorePath.Env.DataLength.ENDED),
        },
        company: {
          total: total(FirestorePath.COMPANY),
          today: today(FirestorePath.COMPANY),
          pending: get(FirestorePath.COMPANY, FirestorePath.Env.DataLength.PENDING),
          admitted: get(FirestorePath.COMPANY, FirestorePath.Env.DataLength.ADMITTED),
        },
        outsource: {
          total: total(FirestorePath.OUTSOURCE),
          today: today(FirestorePath.OUTSOURCE),
          active: get(FirestorePath.OUTSOURCE, FirestorePath.Env.DataLength.ACTIVE),
          paused: get(FirestorePath.OUTSOURCE, FirestorePath.Env.DataLength.PAUSED),
          cancelled: get(FirestorePath.OUTSOURCE, FirestorePath.Env.DataLength.CANCELLED),
        },
      })
    }
  }

  export namespace DataLength {
    export interface CollectionCount {
      total: number
      today: number

      pending?: number
      active?: number
      suspended?: number
      ended?: number
      admitted?: number
      draft?: number
      sent?: number
      accepted?: number
      rejected?: number
      paused?: number
      cancelled?: number
      approved?: number
      applied?: number
      received?: number
    }
  }
}