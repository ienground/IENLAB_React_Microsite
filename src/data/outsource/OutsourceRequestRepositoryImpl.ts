import type {OutsourceRequestRepository} from "@/domain/repository/OutsourceRequestRepository.ts"
import {
  fetchItems,
  type FirestoreListMode,
  getSnapshots,
  type InfScrollStateList,
  uploadCompressedImage,
  uploadFile,
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
  type QueryConstraint, serverTimestamp,
  startAfter,
  startAt,
  type Unsubscribe,
  updateDoc,
  where,
} from "firebase/firestore"
import {type FirebaseStorage, ref} from "firebase/storage"
import {FirestorePath} from "@/constant/FirestorePath.ts"
import {StoragePath} from "@/constant/StoragePath.ts"
import {Outsource} from "@/domain/model/Outsource.ts"
import {FileUploadItem} from "@ienlab/react-library"
import i18n from "@/locales/i18n.ts"
import {OutsourceRequestEditDetails} from "@/domain/model/OutsourceRequestEditDetails.ts"

export class OutsourceRequestRepositoryImpl implements OutsourceRequestRepository {
  private readonly outsourcesRef
  private readonly requestsRef
  private readonly PAGE_SIZE = 20
  private readonly outsourceDocId: string

  private mode: FirestoreListMode = "list"
  private searchKeyword = ""
  private readonly isAdmin: boolean

  constructor(
    readonly firestore: Firestore,
    readonly storage: FirebaseStorage,
    id: string,
    isAdmin: boolean
  ) {
    this.outsourcesRef = collection(firestore, FirestorePath.OUTSOURCE)
    this.requestsRef = collection(this.outsourcesRef, id, FirestorePath.Outsource.INFO_REQUESTS)
    this.isAdmin = isAdmin
    this.outsourceDocId = id
  }

  requestInfoStateList: InfScrollStateList<Outsource.InfoRequest> = {
    itemList: new Map(),
    lastVisibleDocument: null,
    isInitialized: false,
    isLoading: false,
    hasMore: true
}

  async get(id: string): Promise<Outsource.InfoRequest | null> {
    const snapshot = await getDoc(doc(this.requestsRef, id))
    if (!snapshot.exists()) return null

    return Outsource.InfoRequest.fromSnapshot(snapshot)
  }

  async getLatestRequests(count: number): Promise<Outsource.InfoRequest[]> {
    const constraints: QueryConstraint[] = []

    if (!this.isAdmin) {
      constraints.push(where(FirestorePath.Outsource.InfoRequest.STATE, "in", [
        Outsource.InfoRequest.State.SENT,
        Outsource.InfoRequest.State.RECEIVED,
        Outsource.InfoRequest.State.REJECTED,
      ]))
    }

    constraints.push(orderBy(FirestorePath.UPDATE_AT, "desc"))
    constraints.push(limit(count))

    const snapshot = await getDocs(query(this.requestsRef, ...constraints))
    return snapshot.docs.map(Outsource.InfoRequest.fromSnapshot)
  }

  observe(id: string, callback: (item: (Outsource.InfoRequest | null)) => void, cache?: boolean): Unsubscribe {
    return getSnapshots(doc(this.requestsRef, id), async snapshot => {
      if (!snapshot.exists()) {
        callback(null)
        return
      }

      const item = Outsource.InfoRequest.fromSnapshot(snapshot)
      callback(item)
    }, { cache: cache })
  }

  private async transformMedia(id: string, item: OutsourceRequestEditDetails) {
    if (item.type !== Outsource.InfoRequest.Type.MEDIA || !item.media) return item

    const files = await Promise.all(item.media.files.map(async (file, index) => {
      if (!file.image?.file) return file

      const storageRef = ref(
        this.storage,
        `${StoragePath.OUTSOURCE}/${this.outsourceDocId}/${StoragePath.Outsource.INFO_REQUEST}/${id}`
      )
      const fileName = `${index}_${Date.now()}`
      const downloadUrl = await uploadFile(storageRef, fileName, file.image)

      return new OutsourceRequestEditDetails.Media.UploadedFile({
        ...file,
        path: `${StoragePath.OUTSOURCE}/${this.outsourceDocId}/${StoragePath.Outsource.INFO_REQUEST}/${id}/${fileName}`,
        name: file.image.file.name,
        contentType: file.image.file.type,
        size: file.image.file.size,
        image: new FileUploadItem({ url: downloadUrl }),
      })
    }))

    const media = new OutsourceRequestEditDetails.Media({ ...item.media, files })
    return new OutsourceRequestEditDetails({ ...item, media })
  }

  async create(item: OutsourceRequestEditDetails): Promise<DocumentReference> {
    const target = item.toItem()
    return await addDoc(this.requestsRef, target.toHashMap(false))
  }

  async update(id: string, item: OutsourceRequestEditDetails): Promise<void> {
    const target = item.toItem()
    return await updateDoc(doc(this.requestsRef, id), target.toHashMap(true))
  }

  async clientUpdate(id: string, item: OutsourceRequestEditDetails): Promise<void> {
    const transformed = await this.transformMedia(id, item)
    const target = transformed.toItem()
    return await updateDoc(doc(this.requestsRef, id), target.toClientHashMap())
  }

  async updateState(id: string, state: Outsource.InfoRequest.State): Promise<void> {
    return await updateDoc(doc(this.requestsRef, id), {
      [FirestorePath.Outsource.InfoRequest.STATE]: state,
    })
  }

  async delete(id: string): Promise<void> {
    return await deleteDoc(doc(this.requestsRef, id))
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
    if (!this.requestInfoStateList.hasMore || this.requestInfoStateList.isLoading) return

    this.requestInfoStateList = { ...this.requestInfoStateList, isLoading: true }

    try {
      const constraints: QueryConstraint[] = []

      if (this.mode === "search" && this.searchKeyword) {
        constraints.push(orderBy(FirestorePath.Outsource.InfoRequest.TITLE + `.${i18n.resolvedLanguage}`))
        constraints.push(startAt(this.searchKeyword))
        constraints.push(endAt(this.searchKeyword + "\uf8ff"))
      } else {
        constraints.push(orderBy(FirestorePath.UPDATE_AT, "desc"))
      }

      if (this.requestInfoStateList.lastVisibleDocument) {
        constraints.push(startAfter(this.requestInfoStateList.lastVisibleDocument))
      }

      if (!this.isAdmin) {
        constraints.push(where(FirestorePath.Outsource.InfoRequest.STATE, "in", [
          Outsource.InfoRequest.State.SENT,
          Outsource.InfoRequest.State.RECEIVED,
          Outsource.InfoRequest.State.REJECTED,
        ]))
      }

      constraints.push(limit(this.PAGE_SIZE))

      const snapshot = await getDocs(query(this.requestsRef, ...constraints))
      const docs = snapshot.docs
      const items = docs.map(Outsource.InfoRequest.fromSnapshot)
      const newMap = new Map(this.requestInfoStateList.itemList)

      items.forEach(item => {
        newMap.set(item.id, item)
      })

      this.requestInfoStateList = {
        itemList: newMap,
        lastVisibleDocument: docs.at(-1) ?? null,
        isInitialized: true,
        isLoading: false,
        hasMore: docs.length === this.PAGE_SIZE,
      }
    } catch (e) {
      console.error("loadNextPage error", e)
      this.requestInfoStateList = {
        ...this.requestInfoStateList,
        isLoading: false,
      }
    }
  }

  reset() {
    this.requestInfoStateList = {
      itemList: new Map(),
      lastVisibleDocument: null,
      isInitialized: false,
      isLoading: false,
      hasMore: true,
    }
  }
}