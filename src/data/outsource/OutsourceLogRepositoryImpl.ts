import {
  type FirestoreListMode,
  getSnapshots,
  type InfScrollStateList,
  uploadCompressedImage
} from "@ienlab/react-library"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  type DocumentReference,
  endAt,
  type Firestore,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  type QueryConstraint,
  startAfter,
  startAt,
  type Unsubscribe,
  updateDoc
} from "firebase/firestore"
import {type FirebaseStorage, ref} from "firebase/storage"
import {FirestorePath} from "@/constant/FirestorePath.ts"
import {Outsource} from "@/domain/model/Outsource.ts"
import {OutsourceLogEditDetails} from "@/domain/model/OutsourceLogEditDetails"
import type {OutsourceLogRepository} from "@/domain/repository/OutsourceLogRepository.ts"
import {StoragePath} from "@/constant/StoragePath.ts"

export class OutsourceLogRepositoryImpl implements OutsourceLogRepository {
  private readonly outsourcesRef
  private readonly logsRef
  private readonly storageRef
  private readonly PAGE_SIZE = 20

  private mode: FirestoreListMode = "list"
  private searchKeyword = ""

  constructor(
    readonly firestore: Firestore,
    storage: FirebaseStorage,
    id: string
  ) {
    this.outsourcesRef = collection(firestore, FirestorePath.OUTSOURCE)
    this.logsRef = collection(this.outsourcesRef, id, FirestorePath.Outsource.WORK_LOGS)
    this.storageRef = ref(storage, `${StoragePath.OUTSOURCE}/${id}/${StoragePath.Outsource.WORK_LOG}`)
  }

  logInfoStateList: InfScrollStateList<Outsource.WorkLog> = {
    itemList: new Map(),
    lastVisibleDocument: null,
    isInitialized: false,
    isLoading: false,
    hasMore: true
  }

  async get(id: string): Promise<Outsource.WorkLog | null> {
    const snapshot = await getDoc(doc(this.logsRef, id))
    if (!snapshot.exists()) return null

    return Outsource.WorkLog.fromSnapshot(snapshot)
  }

  async getLatestItems(count: number): Promise<Outsource.WorkLog[]> {
    const constraints: QueryConstraint[] = [
      orderBy(FirestorePath.UPDATE_AT, "desc"),
      limit(count),
    ]
    const snapshot = await getDocs(query(this.logsRef, ...constraints))
    return snapshot.docs.map(Outsource.WorkLog.fromSnapshot)
  }

  observe(id: string, callback: (item: (Outsource.WorkLog | null)) => void, cache?: boolean): Unsubscribe {
    return getSnapshots(doc(this.logsRef, id), async snapshot => {
      if (!snapshot.exists()) {
        callback(null)
        return
      }

      const item = Outsource.WorkLog.fromSnapshot(snapshot)
      callback(new Outsource.WorkLog(item))
    }, {cache: cache})
  }

  private async transformItem(id: string, item: OutsourceLogEditDetails) {
    const imageUrlsDownloadUrl = await Promise.all(item.imageUrls.map((item, index) =>
      uploadCompressedImage(this.storageRef, `${id}/${index}`, item, { maxWidthOrHeight: 1920 }))
    )
    return new Outsource.WorkLog({...item.toItem(),
      imageUrls: imageUrlsDownloadUrl
    })
  }

  async create(item: OutsourceLogEditDetails): Promise<DocumentReference> {
    const target = item.toItem()
    const ref = await addDoc(this.logsRef, target.toHashMap(false))
    const { imageUrls } = await this.transformItem(ref.id, item)
    await updateDoc(ref, {
      [FirestorePath.Outsource.WorkLog.IMAGE_URLS]: imageUrls
    })

    return ref
  }

  async update(id: string, item: OutsourceLogEditDetails): Promise<void> {
    const target = await this.transformItem(id, item)
    return await updateDoc(doc(this.logsRef, id), target.toHashMap(true))
  }

  async delete(id: string): Promise<void> {
    return await deleteDoc(doc(this.logsRef, id))
  }

  setSearchKeyword(keyword: string) {
    const normalized = keyword.trim().toLowerCase()

    this.searchKeyword = normalized
    this.mode = normalized ? "search" : "list"
    this.reset()
  }

  clearSearch() {
    this.searchKeyword = ""
    this.mode = "list"
    this.reset()
  }

  async loadNextPage(): Promise<void> {
    if (!this.logInfoStateList.hasMore || this.logInfoStateList.isLoading) return

    this.logInfoStateList = {...this.logInfoStateList, isLoading: true}

    try {
      const constraints: QueryConstraint[] = []

      if (this.mode === "search" && this.searchKeyword) {
        constraints.push(orderBy(FirestorePath.Outsource.WorkLog.TITLE))
        constraints.push(startAt(this.searchKeyword))
        constraints.push(endAt(this.searchKeyword + "\uf8ff"))
      } else {
        constraints.push(orderBy(FirestorePath.UPDATE_AT, "desc"))
      }

      if (this.logInfoStateList.lastVisibleDocument) {
        constraints.push(startAfter(this.logInfoStateList.lastVisibleDocument))
      }

      constraints.push(limit(this.PAGE_SIZE))

      const snapshot = await getDocs(query(this.logsRef, ...constraints))
      const docs = snapshot.docs
      const items = docs.map(Outsource.WorkLog.fromSnapshot)
      const newMap = new Map(this.logInfoStateList.itemList)


      items.forEach(item => {
        newMap.set(item.id, item)
      })

      this.logInfoStateList = {
        itemList: newMap,
        lastVisibleDocument: docs.at(-1) ?? null,
        isInitialized: true,
        isLoading: false,
        hasMore: docs.length === this.PAGE_SIZE,
      }
    } catch (e) {
      console.error("loadNextPage error", e)
      this.logInfoStateList = {
        ...this.logInfoStateList,
        isLoading: false,
      }
    }
  }

  reset() {
    this.logInfoStateList = {
      itemList: new Map(),
      lastVisibleDocument: null,
      isInitialized: false,
      isLoading: false,
      hasMore: true,
    }
  }
}