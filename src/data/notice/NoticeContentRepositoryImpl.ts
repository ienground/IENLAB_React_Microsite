import {inject, injectable} from "@needle-di/core"
import {fetchItems, type FirestoreListMode, getSnapshots, type InfScrollStateList} from "@ienlab/react-library"
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
  updateDoc,
  where
} from "firebase/firestore"
import {getDownloadURL, type FirebaseStorage, ref, uploadBytes} from "firebase/storage"
import imageCompression from "browser-image-compression"
import {DiToken} from "@/di/token.ts"
import {FirestorePath} from "@/constant/FirestorePath.ts"
import {StoragePath} from "@/constant/StoragePath.ts"
import {Notice} from "@/domain/model/Notice.ts"
import i18n from "@/locales/i18n.ts"
import type {NoticeContentRepository} from "@/domain/repository/NoticeContentRepository.ts"
import type {NoticeContentEditDetails} from "@/domain/model/NoticeContentEditDetails.ts"

@injectable()
export class NoticeContentRepositoryImpl implements NoticeContentRepository {
  private readonly categoryRef
  private readonly contentRef
  private readonly storageRef
  private readonly PAGE_SIZE = 20

  private readonly categoryCache = new Map<string, Notice.Category>
  private mode: FirestoreListMode = "list"
  private searchKeyword = ""
  private state: Notice.Content.State | null = null

  constructor(
    firestore: Firestore = inject(DiToken.Firebase.Firestore),
    storage: FirebaseStorage = inject(DiToken.Firebase.Storage)
  ) {
    this.categoryRef = collection(firestore, FirestorePath.NOTICE, FirestorePath.Notice.ITEMS, FirestorePath.Notice.CATEGORY)
    this.contentRef = collection(firestore, FirestorePath.NOTICE, FirestorePath.Notice.ITEMS, FirestorePath.Notice.CONTENT)
    this.storageRef = ref(storage, `${StoragePath.NOTICE}/${StoragePath.Notice.CONTENT_IMAGES}`)
  }

  contentInfoStateList: InfScrollStateList<Notice.Content> = {
    itemList: new Map(),
    lastVisibleDocument: null,
    isInitialized: false,
    isLoading: false,
    hasMore: true
  }

  async get(id: string): Promise<Notice.Content | null> {
    const snapshot = await getDoc(doc(this.contentRef, id))
    if (!snapshot.exists()) return null

    const item = Notice.Content.fromSnapshot(snapshot)
    await fetchItems(this.categoryRef, Notice.Category.fromSnapshot, this.categoryCache, [item.categoryRef])
    return new Notice.Content({...item,
      category: item.categoryRef ? this.categoryCache.get(item.categoryRef.path) : null,
    })
  }

  observe(id: string, callback: (item: (Notice.Content | null)) => void, cache?: boolean): Unsubscribe {
    return getSnapshots(doc(this.contentRef, id), async snapshot => {
      if (!snapshot.exists()) {
        callback(null)
        return
      }

      const item = Notice.Content.fromSnapshot(snapshot)
      await fetchItems(this.categoryRef, Notice.Category.fromSnapshot, this.categoryCache, [item.categoryRef])
      callback(new Notice.Content({...item,
        category: item.categoryRef ? this.categoryCache.get(item.categoryRef.path) : null,
      }))
    }, { cache: cache })
  }

  async create(item: NoticeContentEditDetails): Promise<DocumentReference> {
    const target = item.toItem()
    return await addDoc(this.contentRef, target.toHashMap(false))
  }

  async update(id: string, item: NoticeContentEditDetails): Promise<void> {
    const target = item.toItem()
    return await updateDoc(doc(this.contentRef, id), target.toHashMap(true))
  }

  async delete(id: string): Promise<void> {
    return await deleteDoc(doc(this.contentRef, id))
  }

  async uploadContentImage(file: File): Promise<string> {
    const compressedFile = await imageCompression(file, {
      maxWidthOrHeight: 2160,
      useWebWorker: true,
    })
    const safeName = file.name.replaceAll(/[^\w.-]/g, "_")
    const imageId = typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}`
    const imageRef = ref(this.storageRef, `${imageId}_${safeName}`)

    await uploadBytes(imageRef, compressedFile, {
      contentType: compressedFile.type || file.type,
    })
    return getDownloadURL(imageRef)
  }

  setState(state: Notice.Content.State) {
    this.state = state
    this.reset()
  }

  clearState() {
    this.state = null
    this.reset()
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
    if (!this.contentInfoStateList.hasMore || this.contentInfoStateList.isLoading) return

    this.contentInfoStateList = { ...this.contentInfoStateList, isLoading: true }

    try {
      const constraints: QueryConstraint[] = [where(FirestorePath.DELETED_AT, "==", null)]

      if (this.mode === "search" && this.searchKeyword) {
        constraints.push(orderBy(FirestorePath.Notice.Content.TITLE + `.${i18n.resolvedLanguage}`))
        constraints.push(startAt(this.searchKeyword))
        constraints.push(endAt(this.searchKeyword + "\uf8ff"))
      } else {
        constraints.push(orderBy(FirestorePath.UPDATE_AT, "desc"))
      }

      if (this.state !== null) {
        constraints.push(where(FirestorePath.Notice.Content.STATE, "==", this.state))
      }

      if (this.contentInfoStateList.lastVisibleDocument) {
        constraints.push(startAfter(this.contentInfoStateList.lastVisibleDocument))
      }

      constraints.push(limit(this.PAGE_SIZE))

      const snapshot = await getDocs(query(this.contentRef, ...constraints))
      const docs = snapshot.docs
      const items = docs.map(Notice.Content.fromSnapshot)
      const newMap = new Map(this.contentInfoStateList.itemList)

      await fetchItems(this.categoryRef, Notice.Category.fromSnapshot, this.categoryCache, items.map(item => item.categoryRef))

      items.forEach(item => {
        newMap.set(item.id, new Notice.Content({...item,
          category: item.categoryRef ? this.categoryCache.get(item.categoryRef.path) : null,
        }))
      })

      this.contentInfoStateList = {
        itemList: newMap,
        lastVisibleDocument: docs.at(-1) ?? null,
        isInitialized: true,
        isLoading: false,
        hasMore: docs.length === this.PAGE_SIZE,
      }
    } catch (e) {
      console.error("loadNextPage error", e)
      this.contentInfoStateList = {
        ...this.contentInfoStateList,
        isLoading: false,
      }
    }
  }

  reset() {
    this.contentInfoStateList = {
      itemList: new Map(),
      lastVisibleDocument: null,
      isInitialized: false,
      isLoading: false,
      hasMore: true,
    }
  }
}
