import {type FirestoreItem, type Localized, snapshotToData} from "@ienlab/react-library"
import {
  type DocumentReference,
  type DocumentSnapshot,
  type QueryDocumentSnapshot,
  serverTimestamp,
  Timestamp
} from "firebase/firestore"
import {FirestorePath} from "@/constant/FirestorePath.ts"
import type {TFunction} from "i18next"
import type {BadgeColor} from "@ienlab/react-library"

export namespace Notice {
  export class Category implements FirestoreItem {
    id: string = ""
    ref: DocumentReference | null = null
    createAt: Timestamp = Timestamp.now()
    updateAt: Timestamp = Timestamp.now()
    deletedAt: Timestamp | null = null
    lastUsedAt: Timestamp | null = null
    name: Localized<string> = { ko: "", en: "" }
    isActive: boolean = true
    total: number = 0

    constructor(partial: Partial<Category> = {}) {
      Object.assign(this, partial)
    }

    toHashMap(isUpdate: boolean = false) {
      const map: Record<string, unknown> = {
        [FirestorePath.UPDATE_AT]: serverTimestamp(),
        [FirestorePath.DELETED_AT]: this.deletedAt,
        [FirestorePath.Notice.Category.NAME]: this.name,
        [FirestorePath.Notice.Category.IS_ACTIVE]: this.isActive,
      }

      if (!isUpdate) {
        map[FirestorePath.CREATE_AT] = serverTimestamp()
        map[FirestorePath.Notice.Category.LAST_USED_AT] = null
        map[FirestorePath.Notice.Category.TOTAL] = 0
      }

      return map
    }

    static fromSnapshot(snapshot: QueryDocumentSnapshot | DocumentSnapshot): Category {
      const doc = snapshotToData(snapshot)
      return new Category({
        id: doc.id,
        ref: snapshot.ref,
        createAt: doc[FirestorePath.CREATE_AT],
        updateAt: doc[FirestorePath.UPDATE_AT],
        deletedAt: doc[FirestorePath.DELETED_AT],
        lastUsedAt: doc[FirestorePath.Notice.Category.LAST_USED_AT],
        name: doc[FirestorePath.Notice.Category.NAME],
        isActive: doc[FirestorePath.Notice.Category.IS_ACTIVE],
        total: doc[FirestorePath.Notice.Category.TOTAL]
      })
    }
  }

  export namespace Category {

  }
  
  export class Content implements FirestoreItem {
    id: string = ""
    ref: DocumentReference | null = null
    createAt: Timestamp = Timestamp.now()
    updateAt: Timestamp = Timestamp.now()
    deletedAt: Timestamp | null = null
    category: Notice.Category | null = null
    categoryRef: DocumentReference | null = null
    title: Localized<string> = { ko: "", en: "" }
    content: Localized<string> = { ko: "", en: "" }
    state: Notice.Content.State = Notice.Content.State.DRAFT
  
    constructor(partial: Partial<Content> = {}) {
      Object.assign(this, partial)
    }
  
    toHashMap(isUpdate: boolean = false) {
      const map: Record<string, unknown> = {
        [FirestorePath.UPDATE_AT]: serverTimestamp(),
        [FirestorePath.DELETED_AT]: this.deletedAt,
        [FirestorePath.Notice.Content.CATEGORY]: this.categoryRef,
        [FirestorePath.Notice.Content.TITLE]: this.title,
        [FirestorePath.Notice.Content.CONTENT]: this.content,
        [FirestorePath.Notice.Content.STATE]: this.state
      }
  
      if (!isUpdate) {
        map[FirestorePath.CREATE_AT] = serverTimestamp()
      }
  
      return map
    }
  
    static fromSnapshot(snapshot: QueryDocumentSnapshot | DocumentSnapshot): Content {
      const doc = snapshotToData(snapshot)
      return new Content({
        id: doc.id,
        ref: snapshot.ref,
        createAt: doc[FirestorePath.CREATE_AT],
        updateAt: doc[FirestorePath.UPDATE_AT],
        deletedAt: doc[FirestorePath.DELETED_AT],
        categoryRef: doc[FirestorePath.Notice.Content.CATEGORY],
        title: doc[FirestorePath.Notice.Content.TITLE],
        content: doc[FirestorePath.Notice.Content.CONTENT],
        state: doc[FirestorePath.Notice.Content.STATE]
      })
    }
  }
  
  export namespace Content {
    export enum State {
      DRAFT = 0, PUBLISHED = 1, ARCHIVED = 2
    }

    export namespace State {
      export const Default = State.DRAFT
      export const values = [State.DRAFT, State.PUBLISHED, State.ARCHIVED]
      export function getSaveTargets(value: State) {
        switch (value) {
          case State.DRAFT:
            return [State.DRAFT, State.PUBLISHED]
          case State.PUBLISHED:
            return [State.PUBLISHED, State.ARCHIVED]
          case State.ARCHIVED:
            return [State.PUBLISHED, State.ARCHIVED]
        }
      }
      export function getLabel(t: TFunction, value: State) {
        const map = {
          [State.DRAFT]: "임시저장",
          [State.PUBLISHED]: "게시",
          [State.ARCHIVED]: "보관"
        }
        return map[value]
      }

      export function getBadgeColor(value: State): BadgeColor {
        const map = {
          [State.DRAFT]: "outline" as BadgeColor,
          [State.PUBLISHED]: "default" as BadgeColor,
          [State.ARCHIVED]: "secondary" as BadgeColor
        }
        return map[value]
      }
    }
  }
}
