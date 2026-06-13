import type { UserRepository } from "@/domain/repository/UserRepository.ts"
import { FirestorePath } from "@/constant/FirestorePath.ts"
import {
  collection,
  doc,
  type DocumentReference,
  Firestore,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
  endAt,
  type QueryConstraint,
  type Unsubscribe, updateDoc, serverTimestamp,
} from "firebase/firestore"
import {
  signInWithCustomToken,
  signInWithEmailAndPassword,
  type Auth,
  type UserCredential,
  type User as FirebaseUser,
  signOut,
} from "firebase/auth"
import { User } from "@/domain/model/User.ts"
import {
  deleteStorageItems,
  fetchItems,
  type FirestoreListMode,
  getAuthErrorKey,
  getSnapshots,
  type InfScrollStateList,
  type SignInResult, uploadCompressedImage,
} from "@ienlab/react-library"
import { FirebaseError } from "firebase/app"
import {UserEditDetails} from "@/domain/model/UserEditDetails.ts"
import {Company} from "@/domain/model/Company.ts"
import {type FirebaseStorage, ref} from "firebase/storage"
import {StoragePath} from "@/constant/StoragePath.ts"

export class UserRepositoryImpl implements UserRepository {
  private readonly auth: Auth
  private readonly usersRef
  private readonly companiesRef
  private readonly storageRef
  private readonly PAGE_SIZE = 20

  private readonly companyCache = new Map<string, Company>
  private mode: FirestoreListMode = "list"
  private searchKeyword = ""

  userInfoStateList: InfScrollStateList<User> = {
    itemList: new Map(),
    lastVisibleDocument: null,
    isInitialized: false,
    isLoading: false,
    hasMore: true,
  }

  constructor(
    firestore: Firestore,
    readonly storage: FirebaseStorage,
    auth: Auth
  ) {
    this.usersRef = collection(firestore, FirestorePath.USER)
    this.companiesRef = collection(firestore, FirestorePath.COMPANY)
    this.storageRef = ref(storage, StoragePath.USER)
    this.auth = auth
  }

  async signInWithEmailAndPassword(email: string, password: string): Promise<SignInResult> {
    try {
      const credential = await signInWithEmailAndPassword(this.auth, email, password)
      return { ok: true, data: credential }
    } catch (e) {
      if (e instanceof FirebaseError) {
        return {
          ok: false,
          errorCode: e.code,
          errorKey: getAuthErrorKey(e.code) ?? "",
        }
      }

      return {
        ok: false,
        errorKey: "",
      }
    }
  }

  async signInWithToken(token: string): Promise<UserCredential | null> {
    try {
      return await signInWithCustomToken(this.auth, token)
    } catch (e) {
      console.error(`signInWithToken error ${e}`)
      return null
    }
  }

  signInWithNaver(token: string): Promise<UserCredential | null> {
    throw Error("not implemented")
  }

  signInWithKakao(token: string): Promise<UserCredential | null> {
    throw Error("not implemented")
  }

  reauth(password: string): Promise<UserCredential | null> {
    throw Error("not implemented")
  }

  async signOut(): Promise<void> {
    return signOut(this.auth)
  }

  getCurrentUser(): FirebaseUser | null {
    return this.auth.currentUser
  }

  observeCurrentUser(callback: (fbUser: FirebaseUser | null) => void): () => void {
    return this.auth.onAuthStateChanged(callback)
  }

  async get(id?: string): Promise<User | null> {
    const userId = id ? id : this.auth.currentUser?.uid

    if (!userId) {
      console.error("userId is null")
      return null
    }

    const snapshot = await getDoc(doc(this.usersRef, userId))
    if (!snapshot.exists()) return null

    const item = User.fromSnapshot(snapshot)
    await fetchItems(this.companiesRef, Company.fromSnapshot, this.companyCache, [item.companyRef, item.tempCompanyRef])

    return new User({
      ...item,
      company: this.companyCache.get(item.companyRef?.path ?? "") ?? null,
      tempCompany: this.companyCache.get(item.tempCompanyRef?.path ?? "") ?? null,
    })
  }

  observe(callback: (user: User | null) => void, id?: string, cache?: boolean): Unsubscribe {
    const userId = id ? id : this.auth.currentUser?.uid

    if (!userId) {
      console.error("userId is null")
      callback(null)
      return () => {}
    }

    return getSnapshots(doc(this.usersRef, userId), async snapshot => {
      if (!snapshot.exists()) {
        callback(null)
        return
      }

      const item = User.fromSnapshot(snapshot)
      await fetchItems(this.companiesRef, Company.fromSnapshot, this.companyCache, [item.companyRef, item.tempCompanyRef])
      callback(new User({
        ...item,
        company: this.companyCache.get(item.companyRef?.path ?? "") ?? null,
        tempCompany: this.companyCache.get(item.tempCompanyRef?.path ?? "") ?? null,
      }))
    }, { cache: cache })
  }

  private async transformItem(id: string, item: UserEditDetails) {
    const profileDownloadUrl = await uploadCompressedImage(this.storageRef, `${id}/${StoragePath.User.PROFILE_URL}`, item.profileUrl, { maxWidthOrHeight: 1024 })

    return new User({...item.toItem(), profileUrl: profileDownloadUrl})
  }

  async update(id: string, item: UserEditDetails): Promise<void> {
    const existingItem = await this.get(id)

    if (existingItem) {
      const newUrls = [item.profileUrl.url]
      await deleteStorageItems(this.storage, [
        { item: item.profileUrl, url: existingItem.profileUrl },
      ].filter(target => !newUrls.includes(target.url)))
    }

    const target = await this.transformItem(id, item)
    return await updateDoc(doc(this.usersRef, id), target.toHashMap(true))
  }

  async approveTempCompany(id: string): Promise<void> {
    const snapshot = await getDoc(doc(this.usersRef, id))
    if (!snapshot.exists()) return

    const item = User.fromSnapshot(snapshot)
    if (!item.tempCompanyRef) return

    await updateDoc(doc(this.usersRef, id), {
      [FirestorePath.User.COMPANY]: item.tempCompanyRef,
      [FirestorePath.User.TEMP_COMPANY]: null,
      [FirestorePath.UPDATE_AT]: serverTimestamp(),
    })
  }

  async rejectTempCompany(id: string): Promise<void> {
    await updateDoc(doc(this.usersRef, id), {
      [FirestorePath.User.TEMP_COMPANY]: null,
      [FirestorePath.UPDATE_AT]: serverTimestamp(),
    })
  }

  delete(credential: UserCredential): Promise<boolean> {
    throw Error("not implemented")
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
    if (!this.userInfoStateList.hasMore || this.userInfoStateList.isLoading) return

    this.userInfoStateList = {
      ...this.userInfoStateList,
      isLoading: true,
    }

    try {
      const constraints: QueryConstraint[] = []

      if (this.mode === "search" && this.searchKeyword) {
        constraints.push(orderBy(FirestorePath.User.NAME))
        constraints.push(startAt(this.searchKeyword))
        constraints.push(endAt(this.searchKeyword + "\uf8ff"))
      } else {
        constraints.push(orderBy(FirestorePath.CREATE_AT, "desc"))
      }

      if (this.userInfoStateList.lastVisibleDocument) {
        constraints.push(startAfter(this.userInfoStateList.lastVisibleDocument))
      }

      constraints.push(limit(this.PAGE_SIZE))

      const snapshot = await getDocs(query(this.usersRef, ...constraints))
      const docs = snapshot.docs
      const items = docs.map(User.fromSnapshot)
      const newMap = new Map(this.userInfoStateList.itemList)

      const refs = items.flatMap(item => [item.companyRef, item.tempCompanyRef])
      await fetchItems(this.companiesRef, Company.fromSnapshot, this.companyCache, refs)

      items.forEach(item => {
        newMap.set(item.id, new User({
          ...item,
          company: this.companyCache.get(item.companyRef?.path ?? "") ?? null,
          tempCompany: this.companyCache.get(item.tempCompanyRef?.path ?? "") ?? null,
        }))
      })

      this.userInfoStateList = {
        itemList: newMap,
        lastVisibleDocument: docs.at(-1) ?? null,
        isInitialized: true,
        isLoading: false,
        hasMore: docs.length === this.PAGE_SIZE,
      }
    } catch (e) {
      console.error("loadNextPage error", e)
      this.userInfoStateList = {
        ...this.userInfoStateList,
        isLoading: false,
      }
    }
  }

  reset() {
    this.userInfoStateList = {
      itemList: new Map(),
      lastVisibleDocument: null,
      isInitialized: false,
      isLoading: false,
      hasMore: true,
    }
  }
}