import {type FirestoreItem, snapshotToData} from "@ienlab/react-library"
import {
  type DocumentReference, type DocumentSnapshot,
  type FieldValue,
  type QueryDocumentSnapshot,
  serverTimestamp,
  Timestamp
} from "firebase/firestore"
import {FirestorePath} from "@/constant/FirestorePath.ts"

export class Estimate implements FirestoreItem {
  id: string = ""
  ref: DocumentReference | null = null
  createAt: Timestamp = Timestamp.now()
  updateAt: Timestamp = Timestamp.now()
  deletedAt: Timestamp | null = null


  constructor(partial: Partial<Estimate> = {}) {
    Object.assign(this, partial)
  }

  toHashMap(isUpdate: boolean = false) {
    const map: Record<string, string | number | boolean | FieldValue | Timestamp | DocumentReference | null> = {
      [FirestorePath.UPDATE_AT]: serverTimestamp(),
      [FirestorePath.DELETED_AT]: this.deletedAt,

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

    })
  }
}

export namespace Estimate {

}