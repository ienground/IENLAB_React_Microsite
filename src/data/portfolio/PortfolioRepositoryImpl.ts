import type {PortfolioRepository} from "@/domain/repository/PortfolioRepository.ts"
import {
  collection,
  query,
  type Firestore,
  type Unsubscribe,
  orderBy,
  startAfter, limit, getDocs, doc, getDoc, updateDoc,
  deleteDoc,
  runTransaction, type QueryConstraint, startAt, endAt,
  where
} from "firebase/firestore"
import {deleteObject, listAll, ref, type FirebaseStorage} from "firebase/storage"
import {FirestorePath} from "@/constant/FirestorePath.ts"
import {Portfolio} from "@/domain/model/Portfolio.ts"
import {PortfolioEditDetails} from "@/domain/model/PortfolioEditDetails.ts"
import {
  type FirestoreListMode,
  getSnapshots, type ImageCompressionPolicy, FileUploadItem,
  type InfScrollStateList, uploadCompressedImage,
  uploadFile, deleteStorageItems
} from "@ienlab/react-library"
import {StoragePath} from "@/constant/StoragePath.ts"
import i18n from "@/locales/i18n.ts"
import imageCompression from "browser-image-compression"

export class PortfolioRepositoryImpl implements PortfolioRepository {
  private readonly portfoliosRef
  private readonly storageRef
  private readonly PAGE_SIZE = 20
  private mode: FirestoreListMode = "list"
  private searchKeyword = ""

  constructor(
    readonly firestore: Firestore,
    readonly storage: FirebaseStorage
  ) {
    this.portfoliosRef = collection(firestore, FirestorePath.PORTFOLIO)
    this.storageRef = ref(storage, StoragePath.PORTFOLIO)
  }

  portfolioInfoStateList: InfScrollStateList<Portfolio> = {
    itemList: new Map(),
    lastVisibleDocument: null,
    isInitialized: false,
    isLoading: false,
    hasMore: true
  }

  async get(id: string): Promise<Portfolio | null> {
    const snapshot = await getDoc(doc(this.portfoliosRef, id))
    if (!snapshot.exists()) return null

    return Portfolio.fromSnapshot(snapshot)
  }

  observe(id: string, callback: (item: (Portfolio | null)) => void, cache?: boolean): Unsubscribe {
    return getSnapshots(doc(this.portfoliosRef, id), snapshot => {
      if (!snapshot.exists()) {
        callback(null)
        return
      }

      callback(Portfolio.fromSnapshot(snapshot))
    }, { cache: cache })
  }

  observePrimaries(callback: (items: Portfolio[]) => void) {
    const q = query(
      this.portfoliosRef,
      where(FirestorePath.Portfolio.IS_PRIMARY, "==", true),
      where(FirestorePath.Portfolio.VISIBILITY, "==", Portfolio.Visibility.PUBLISHED),
    )
    return getSnapshots(
      q,
      snapshot => {
        callback(snapshot.docs.map(Portfolio.fromSnapshot))
      }
    )
  }

  private getCompressionPolicy(path: string): ImageCompressionPolicy {
    if (path.includes(StoragePath.Portfolio.LOGO)) {
      return { maxWidthOrHeight: 512 }
    }

    if (
      path.includes(StoragePath.Portfolio.THUMBNAIL_KO) ||
      path.includes(StoragePath.Portfolio.THUMBNAIL_EN)
    ) {
      return { maxWidthOrHeight: 2560 }
    }

    return { maxWidthOrHeight: 2160 }
  }

  private async transformItem(id: string, item: PortfolioEditDetails) {
    const logoDownloadUrl = await uploadCompressedImage(this.storageRef, `${id}/${StoragePath.Portfolio.LOGO}`, item.logo, this.getCompressionPolicy(StoragePath.Portfolio.LOGO))
    const thumbnailKoDownloadUrl = await uploadCompressedImage(this.storageRef, `${id}/${StoragePath.Portfolio.THUMBNAIL_KO}`, item.thumbnail.ko, this.getCompressionPolicy(StoragePath.Portfolio.THUMBNAIL_KO))
    const thumbnailEnDownloadUrl = await uploadCompressedImage(this.storageRef, `${id}/${StoragePath.Portfolio.THUMBNAIL_EN}`, item.thumbnail.en, this.getCompressionPolicy(StoragePath.Portfolio.THUMBNAIL_EN))
    const imageUrlsKoDownloadUrl = await Promise.all(item.imageUrls.ko.map((item, index) =>
      uploadCompressedImage(this.storageRef, `${id}/${StoragePath.Portfolio.IMAGE_URLS_KO}_${index}`, item, this.getCompressionPolicy(StoragePath.Portfolio.IMAGE_URLS_KO)))
    )
    const imageUrlsEnDownloadUrl = await Promise.all(item.imageUrls.en.map((item, index) =>
      uploadCompressedImage(this.storageRef, `${id}/${StoragePath.Portfolio.IMAGE_URLS_EN}_${index}`, item, this.getCompressionPolicy(StoragePath.Portfolio.IMAGE_URLS_EN)))
    )

    return new Portfolio({...item.toItem(),
      logo: logoDownloadUrl,
      thumbnail: { ko: thumbnailKoDownloadUrl, en: thumbnailEnDownloadUrl },
      imageUrls: { ko: imageUrlsKoDownloadUrl, en: imageUrlsEnDownloadUrl }
    })
  }

  async createPortfolio(id: string, item: PortfolioEditDetails): Promise<void> {
    const ref = doc(this.portfoliosRef, id)
    const target = await this.transformItem(id, item)

    return await runTransaction(this.firestore, async (transaction) => {
      const snapshot = await transaction.get(ref)

      if (snapshot.exists()) {
        throw new Error(`already-exist`)
      }

      transaction.set(ref, target.toHashMap(false))
    })
  }

  /**
   * 포트폴리오 정보를 수정합니다.
   *
   * 1) 기존 Firestore 문서에서 이미지 URL 목록을 조회합니다.
   * 2) 사용자가 제거한 이미지(item.*.isEmpty)를 Storage에서 삭제합니다.
   * 3) 새로 추가/교체된 이미지는 업로드 후 Firestore 문서를 갱신합니다.
   *
   * @param id       대상 포트폴리오 문서 ID
   * @param item     수정할 포트폴리오 상세 정보 (FileUploadItem 포함)
   */
  async updatePortfolio(id: string, item: PortfolioEditDetails): Promise<void> {
    const existingItem = await this.get(id)
    const target = await this.transformItem(id, item)

    if (existingItem) {
      const newUrls = [item.logo.url, item.thumbnail.ko.url, item.thumbnail.en.url, ...item.imageUrls.ko.map(i => i.url), ...item.imageUrls.en.map(i => i.url)]
      
      await deleteStorageItems(this.storage, [
        { item: item.logo, url: existingItem.logo },
        { item: item.thumbnail.ko, url: existingItem.thumbnail.ko },
        { item: item.thumbnail.en, url: existingItem.thumbnail.en },
        ...existingItem.imageUrls.ko.map((url, index) => ({ item: item.imageUrls.ko[index], url })),
        ...existingItem.imageUrls.en.map((url, index) => ({ item: item.imageUrls.en[index], url })),
      ].filter(target => !newUrls.includes(target.url)))
    }

    return await updateDoc(doc(this.portfoliosRef, id), target.toHashMap(true))
  }

  async deletePortfolio(id: string): Promise<void> {
    const storageRef = ref(this.storage, `${StoragePath.PORTFOLIO}/${id}`)
    try {
      const result = await listAll(storageRef)
      await Promise.all(result.items.map(item => deleteObject(item)))
    } catch (e) {
      console.warn("Failed to delete storage files for portfolio", id, e)
    }

    return await deleteDoc(doc(this.portfoliosRef, id))
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
    if (!this.portfolioInfoStateList.hasMore || this.portfolioInfoStateList.isLoading) return

    this.portfolioInfoStateList = { ...this.portfolioInfoStateList, isLoading: true }

    try {
      const constraints: QueryConstraint[] = []

      if (this.mode === "search" && this.searchKeyword) {
        constraints.push(orderBy(FirestorePath.Portfolio.TITLE + `.${i18n.resolvedLanguage}`))
        constraints.push(startAt(this.searchKeyword))
        constraints.push(endAt(this.searchKeyword + "\uf8ff"))
      } else {
        constraints.push(orderBy(FirestorePath.UPDATE_AT, "desc"))
      }

      if (this.portfolioInfoStateList.lastVisibleDocument) {
        constraints.push(startAfter(this.portfolioInfoStateList.lastVisibleDocument))
      }

      constraints.push(limit(this.PAGE_SIZE))

      const snapshot = await getDocs(query(this.portfoliosRef, ...constraints))
      const docs = snapshot.docs
      const items = docs.map(Portfolio.fromSnapshot)
      const newMap = new Map(this.portfolioInfoStateList.itemList)

      items.forEach(item => {
        newMap.set(item.id, item)
      })

      this.portfolioInfoStateList = {
        itemList: newMap,
        lastVisibleDocument: docs.at(-1) ?? null,
        isInitialized: true,
        isLoading: false,
        hasMore: docs.length === this.PAGE_SIZE,
      }
    } catch (e) {
      console.error("loadNextPage error", e)
      this.portfolioInfoStateList = {
        ...this.portfolioInfoStateList,
        isLoading: false,
      }
    }
  }

  reset() {
    this.portfolioInfoStateList = {
      itemList: new Map(),
      lastVisibleDocument: null,
      isInitialized: false,
      isLoading: false,
      hasMore: true,
    }
  }
}