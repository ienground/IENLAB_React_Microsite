import {type BadgeColor, type FirestoreItem, type Localized, snapshotToData} from "@ienlab/react-library"
import {
  type DocumentReference,
  type DocumentSnapshot,
  type QueryDocumentSnapshot,
  serverTimestamp,
  Timestamp
} from "firebase/firestore"
import {FirestorePath} from "@/constant/FirestorePath.ts"
import type {TFunction} from "i18next"

export class Company implements FirestoreItem {
  id: string = ""
  ref: DocumentReference | null = null
  createAt: Timestamp = Timestamp.now()
  updateAt: Timestamp = Timestamp.now()
  deletedAt: Timestamp | null = null
  name: Localized<string> = { ko: "", en: "" }
  state: Company.State = Company.State.Default

  outsource: number = 0
  estimate: number = 0

  constructor(partial: Partial<Company> = {}) {
    Object.assign(this, partial)
  }

  toHashMap(isUpdate: boolean = false) {
    const map: Record<string, unknown> = {
      [FirestorePath.UPDATE_AT]: serverTimestamp(),
      [FirestorePath.DELETED_AT]: this.deletedAt,
      [FirestorePath.Company.NAME]: this.name,
      [FirestorePath.Company.STATE]: this.state
    }

    if (!isUpdate) {
      map[FirestorePath.CREATE_AT] = serverTimestamp()
    }

    return map
  }

  static fromSnapshot(snapshot: QueryDocumentSnapshot | DocumentSnapshot): Company {
    const doc = snapshotToData(snapshot)
    return new Company({
      id: doc.id,
      ref: snapshot.ref,
      createAt: doc[FirestorePath.CREATE_AT],
      updateAt: doc[FirestorePath.UPDATE_AT],
      deletedAt: doc[FirestorePath.DELETED_AT],
      name: doc[FirestorePath.Company.NAME],
      state: doc[FirestorePath.Company.STATE],
      outsource: doc[FirestorePath.Company.OUTSOURCE],
      estimate: doc[FirestorePath.Company.ESTIMATE]
    })
  }
}

export namespace Company {
  export enum State {
    PENDING, ADMITTED
  }

  export namespace State {
    export const Default = State.PENDING
    export const values = [State.PENDING, State.ADMITTED]
    export function getLabel(t: TFunction, value: State) {
      const map = {
        [State.PENDING]: t("types:company.state.pending.label"),
        [State.ADMITTED]: t("types:company.state.admitted.label"),
      }

      return map[value]
    }
    export function getDescription(t: TFunction, value: State) {
      const map = {
        [State.PENDING]: t("types:company.state.pending.desc"),
        [State.ADMITTED]: t("types:company.state.admitted.desc"),
      }

      return map[value]
    }
    export function getBadgeColor(value: State) {
      const map = {
        [State.PENDING]: "outline",
        [State.ADMITTED]: "default",
      }

      return map[value] as BadgeColor
    }
  }
}