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
    requiredUpdateAt: Timestamp | null = null
    optionalUpdateAt: Timestamp | null = null

    constructor(partial: Partial<Agreement> = {}) {
      Object.assign(this, partial)
    }

    static fromSnapshot(snapshot: QueryDocumentSnapshot | DocumentSnapshot): Agreement {
      const doc = snapshotToData(snapshot)
      return new Agreement({
        ref: snapshot.ref,
        requiredUpdateAt: doc[FirestorePath.Env.Agreement.REQUIRED_UPDATE_AT],
        optionalUpdateAt: doc[FirestorePath.Env.Agreement.OPTIONAL_UPDATE_AT],
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
      content: Localized<string> = { ko: "", en: "" }

      constructor(partial: Partial<Item> = {}) {
        Object.assign(this, partial)
      }

      toHashMap(isUpdate: boolean = false) {
        const map: Record<string, unknown> = {
          [FirestorePath.UPDATE_AT]: serverTimestamp(),
          [FirestorePath.DELETED_AT]: this.deletedAt,
          [FirestorePath.Env.Agreement.Items.CONTENT]: this.content
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
          content: doc[FirestorePath.Env.Agreement.Items.CONTENT]
        })
      }
    }

    export namespace Item {

    }
  }
}