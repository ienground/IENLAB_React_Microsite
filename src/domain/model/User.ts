import {type BadgeColor, type FirestoreItem, snapshotToData} from "@ienlab/react-library"
import {
  DocumentReference,
  DocumentSnapshot,
  QueryDocumentSnapshot,
  serverTimestamp,
  Timestamp
} from "firebase/firestore"
import {FirestorePath} from "@/constant/FirestorePath.ts"
import type {Company} from "@/domain/model/Company.ts"
import type {TFunction} from "i18next"

export class User implements FirestoreItem {
  id: string = ""
  ref: DocumentReference | null = null
  createAt: Timestamp = Timestamp.now()
  updateAt: Timestamp = Timestamp.now()
  deletedAt: Timestamp | null = null
  visitAt: Timestamp = Timestamp.now()
  name: string = ""
  profileUrl: string = ""
  companyRef: DocumentReference | null = null
  company: Company | null = null
  tempCompanyRef: DocumentReference | null = null
  tempCompany: Company | null = null
  level: User.Level = User.Level.Default
  state: User.State = User.State.Default
  phone: string = ""
  email: string = ""
  agreedAt: Timestamp | null = null
  agreementIds: string[] = []

  constructor(partial: Partial<User> = {}) {
    Object.assign(this, partial)
  }

  toHashMap(isUpdate: boolean = false) {
    const map: Record<string, unknown> = {
      [FirestorePath.UPDATE_AT]: serverTimestamp(),
      [FirestorePath.DELETED_AT]: this.deletedAt,
      [FirestorePath.User.VISIT_AT]: this.visitAt,
      [FirestorePath.User.NAME]: this.name,
      [FirestorePath.User.PROFILE_URL]: this.profileUrl,
      [FirestorePath.User.COMPANY]: this.companyRef,
      [FirestorePath.User.TEMP_COMPANY]: this.tempCompanyRef,
      [FirestorePath.User.PHONE]: this.phone,
    }
    // email은 Firebase Auth가 SOURCE. 직접 저장하지 않음

    if (!isUpdate) {
      map[FirestorePath.CREATE_AT] = serverTimestamp()
    }

    return map
  }

  static fromSnapshot(snapshot: QueryDocumentSnapshot | DocumentSnapshot): User {
    const doc = snapshotToData(snapshot)
    return new User({
      id: doc.id,
      ref: snapshot.ref,
      createAt: doc[FirestorePath.CREATE_AT],
      updateAt: doc[FirestorePath.UPDATE_AT],
      deletedAt: doc[FirestorePath.DELETED_AT],
      visitAt: doc[FirestorePath.User.VISIT_AT],
      name: doc[FirestorePath.User.NAME],
      profileUrl: doc[FirestorePath.User.PROFILE_URL],
      companyRef: doc[FirestorePath.User.COMPANY],
      tempCompanyRef: doc[FirestorePath.User.TEMP_COMPANY],
      level: doc[FirestorePath.User.LEVEL],
      state: doc[FirestorePath.User.STATE],
      phone: doc[FirestorePath.User.PHONE],
      email: doc[FirestorePath.User.EMAIL] ?? "",
      agreedAt: doc[FirestorePath.User.AGREED_AT] ?? null,
      agreementIds: doc[FirestorePath.User.AGREEMENT_IDS] ?? []
    })
  }
}

export namespace User {
  export enum Level {
    MEMBER = 0, ADMIN = 990,
  }

  export namespace Level {
    export const Default = Level.MEMBER
    export const values = [Level.MEMBER, Level.ADMIN]
    export function getLabel(t: TFunction, value: Level) {
      const map = {
        [Level.MEMBER]: t("types:user.level.member.label"),
        [Level.ADMIN]: t("types:user.level.admin.label")
      }

      return map[value]
    }
    export function getDescription(t: TFunction, value: Level) {
      const map = {
        [Level.MEMBER]: t("types:user.level.member.desc"),
        [Level.ADMIN]: t("types:user.level.admin.desc")
      }

      return map[value]
    }
    export function getBadgeColor(value: Level) {
      const map = {
        [Level.MEMBER]: "outline",
        [Level.ADMIN]: "default"
      }

      return map[value] as BadgeColor
    }
  }

  export enum State {
    PENDING, ACTIVE, SUSPENDED, ENDED
  }

  export namespace State {
    export const Default = State.PENDING
    export const values = [State.PENDING, State.ACTIVE, State.SUSPENDED, State.ENDED]
    export function getLabel(t: TFunction, value: State) {
      const map = {
        [State.PENDING]: t("types:user.state.pending.label"),
        [State.ACTIVE]: t("types:user.state.active.label"),
        [State.SUSPENDED]: t("types:user.state.suspended.label"),
        [State.ENDED]: t("types:user.state.ended.label")
      }

      return map[value]
    }
    export function getDescription(t: TFunction, value: State) {
      const map = {
        [State.PENDING]: t("types:user.state.pending.desc"),
        [State.ACTIVE]: t("types:user.state.active.desc"),
        [State.SUSPENDED]: t("types:user.state.suspended.desc"),
        [State.ENDED]: t("types:user.state.ended.desc")
      }

      return map[value]
    }
    export function getBadgeColor(value: State) {
      const map = {
        [State.PENDING]: "outline",
        [State.ACTIVE]: "default",
        [State.SUSPENDED]: "secondary",
        [State.ENDED]: "destructive",
      }

      return map[value] as BadgeColor
    }
  }
}