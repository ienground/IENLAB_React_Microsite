import type {EnvRepository} from "@/domain/repository/EnvRepository.ts"
import {
  addDoc,
  collection,
  doc,
  type DocumentReference,
  type Firestore,
  getDoc,
  orderBy,
  query,
  serverTimestamp,
  type Unsubscribe,
  updateDoc,
  where
} from "firebase/firestore"
import {FirestorePath} from "@/constant/FirestorePath.ts"
import {Env} from "@/domain/model/Env"
import {getSnapshots} from "@ienlab/react-library"
import type {AgreementItemEditDetails} from "@/domain/model/AgreementItemEditDetails.ts"
import {inject, injectable} from "@needle-di/core"
import {DiToken} from "@/di/token.ts"

@injectable()
export class EnvRepositoryImpl implements EnvRepository {
  private readonly agreementItemsRef
  private readonly dataLengthRef

  constructor(
    firestore: Firestore = inject(DiToken.Firebase.Firestore)
  ) {
    const envsRef = collection(firestore, FirestorePath.ENV)
    this.agreementItemsRef = collection(envsRef, FirestorePath.Env.AGREEMENT, FirestorePath.Env.Agreement.ITEMS)
    this.dataLengthRef = doc(envsRef, FirestorePath.Env.DATA_LENGTH)
  }

  async getDataLength(): Promise<Env.DataLength | null> {
    const snapshot = await getDoc(this.dataLengthRef)
    if (!snapshot.exists()) return null
    return Env.DataLength.fromSnapshot(snapshot)
  }

  observeDataLength(callback: (item: Env.DataLength | null) => void, cache?: boolean): Unsubscribe {
    return getSnapshots(this.dataLengthRef, snapshot => {
      if (!snapshot.exists()) {
        callback(null)
        return
      }

      callback(Env.DataLength.fromSnapshot(snapshot))
    }, { cache: cache })
  }

  observeAgreementItems(callback: (items: Env.Agreement.Item[]) => void, cache?: boolean): Unsubscribe {
    return getSnapshots(query(
      this.agreementItemsRef,
      where(FirestorePath.DELETED_AT, "==", null),
      orderBy(FirestorePath.Env.Agreement.Items.SORT_ORDER, "asc")
    ), snapshot => {
      callback(snapshot.docs.map(Env.Agreement.Item.fromSnapshot))
    }, { cache })
  }

  observeAllAgreementItems(callback: (items: Env.Agreement.Item[]) => void, cache?: boolean): Unsubscribe {
    return getSnapshots(query(
      this.agreementItemsRef,
      orderBy(FirestorePath.Env.Agreement.Items.SORT_ORDER, "asc")
    ), snapshot => {
      callback(snapshot.docs.map(Env.Agreement.Item.fromSnapshot))
    }, { cache })
  }


  async createAgreementItem(details: AgreementItemEditDetails): Promise<DocumentReference> {
    return await addDoc(this.agreementItemsRef, details.toItem().toHashMap(false))
  }

  async updateAgreementItem(id: string, details: AgreementItemEditDetails): Promise<void> {
    await updateDoc(doc(this.agreementItemsRef, id), details.toItem().toHashMap(true))
  }

  async deleteAgreementItem(id: string): Promise<void> {
    await updateDoc(doc(this.agreementItemsRef, id), {
      [FirestorePath.UPDATE_AT]: serverTimestamp(),
      [FirestorePath.DELETED_AT]: serverTimestamp(),
    })
  }
}
