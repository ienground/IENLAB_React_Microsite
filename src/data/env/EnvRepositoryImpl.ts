import type {EnvRepository} from "@/domain/repository/EnvRepository.ts"
import {
  addDoc,
  collection,
  doc,
  type DocumentReference,
  type Firestore,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  type QueryConstraint,
  serverTimestamp,
  startAfter,
  type Unsubscribe,
  updateDoc,
  where
} from "firebase/firestore"
import {FirestorePath} from "@/constant/FirestorePath.ts"
import {Env} from "@/domain/model/Env"
import {getSnapshots, type InfScrollStateList} from "@ienlab/react-library"
import type {AgreementItemEditDetails} from "@/domain/model/AgreementItemEditDetails.ts"
import {inject, injectable} from "@needle-di/core"
import {DiToken} from "@/di/token.ts"

@injectable()
export class EnvRepositoryImpl implements EnvRepository {
  private readonly agreementItemsRef
  private readonly dataLengthRef
  private readonly PAGE_SIZE = 20

  constructor(
    firestore: Firestore = inject(DiToken.Firebase.Firestore)
  ) {
    const envsRef = collection(firestore, FirestorePath.ENV)
    this.agreementItemsRef = collection(envsRef, FirestorePath.Env.AGREEMENT, FirestorePath.Env.Agreement.ITEMS)
    this.dataLengthRef = doc(envsRef, FirestorePath.Env.DATA_LENGTH)
  }

  agmtHistoryInfoStateList: InfScrollStateList<Env.Agreement.Item> = {
    itemList: new Map(),
    lastVisibleDocument: null,
    isInitialized: false,
    isLoading: false,
    hasMore: true
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

  observeAgreement(id: string, callback: (item: (Env.Agreement.Item | null)) => void, cache?: boolean): Unsubscribe {
    return getSnapshots(doc(this.agreementItemsRef, id), async snapshot => {
      if (!snapshot.exists()) {
        callback(null)
        return
      }

      callback(Env.Agreement.Item.fromSnapshot(snapshot))
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

  async loadNextAgmtHistoryPage(): Promise<void> {
    if (!this.agmtHistoryInfoStateList.hasMore || this.agmtHistoryInfoStateList.isLoading) return

    this.agmtHistoryInfoStateList = { ...this.agmtHistoryInfoStateList, isLoading: true }

    try {
      const constraints: QueryConstraint[] = [where(FirestorePath.DELETED_AT, "!=", null)]
      constraints.push(orderBy(FirestorePath.DELETED_AT, "desc"))
      constraints.push(orderBy(FirestorePath.UPDATE_AT, "desc"))

      if (this.agmtHistoryInfoStateList.lastVisibleDocument) {
        constraints.push(startAfter(this.agmtHistoryInfoStateList.lastVisibleDocument))
      }

      constraints.push(limit(this.PAGE_SIZE))

      const snapshot = await getDocs(query(this.agreementItemsRef, ...constraints))
      const docs = snapshot.docs
      const items = docs.map(Env.Agreement.Item.fromSnapshot)
      const newMap = new Map(this.agmtHistoryInfoStateList.itemList)

      items.forEach(item => {
        newMap.set(item.id, item)
      })

      this.agmtHistoryInfoStateList = {
        itemList: newMap,
        lastVisibleDocument: docs.at(-1) ?? null,
        isInitialized: true,
        isLoading: false,
        hasMore: docs.length === this.PAGE_SIZE,
      }
    } catch (e) {
      console.error("loadNextPage error", e)
      this.agmtHistoryInfoStateList = {
        ...this.agmtHistoryInfoStateList,
        isLoading: false,
      }
    }
  }

  resetAgmtHistory() {
    this.agmtHistoryInfoStateList = {
      itemList: new Map(),
      lastVisibleDocument: null,
      isInitialized: false,
      isLoading: false,
      hasMore: true,
    }
  }
}
