import type {UserRepository} from "@/domain/repository/UserRepository.ts"
import {FirestorePath} from "@/constant/FirestorePath.ts"
import {
  collection,
  doc,
  endAt,
  Firestore,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  type QueryConstraint,
  serverTimestamp, setDoc,
  startAfter,
  startAt,
  type Unsubscribe,
  updateDoc,
} from "firebase/firestore"
import {
  type Auth,
  sendEmailVerification,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signOut,
  type User as FirebaseUser,
  type UserCredential,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import {User} from "@/domain/model/User.ts"
import {
  type CustomAuthRequest,
  type CustomAuthResponse,
  deleteStorageItems,
  fetchItems,
  type FirestoreListMode,
  getAuthErrorKey,
  getSnapshots,
  type InfScrollStateList,
  PhoneVerify,
  type SignInResult,
  uploadCompressedImage,
} from "@ienlab/react-library"
import {FirebaseError} from "firebase/app"
import {UserEditDetails} from "@/domain/model/UserEditDetails.ts"
import {Company} from "@/domain/model/Company.ts"
import {type FirebaseStorage, ref} from "firebase/storage"
import {StoragePath} from "@/constant/StoragePath.ts"
import {type Functions, type HttpsCallable} from "firebase/functions"
import {createCallable} from "@/constant/CreateCallable.ts"

export class UserRepositoryImpl implements UserRepository {
  private readonly auth: Auth
  private readonly usersRef
  private readonly companiesRef
  private readonly storageRef
  private readonly naverCustomAuthFunction
  private readonly kakaoCustomAuthFunction
  private readonly sendPhoneVerifyFn
  private readonly verifyCodeFn
  private readonly updateUserEmailFn
  private readonly updateUserAgreementFn
  private readonly updateUserStateFn
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
    auth: Auth,
    functions: Functions
  ) {
    this.usersRef = collection(firestore, FirestorePath.USER)
    this.companiesRef = collection(firestore, FirestorePath.COMPANY)
    this.storageRef = ref(storage, StoragePath.USER)
    this.auth = auth
    this.naverCustomAuthFunction = createCallable(functions, "NaverCustomAuth")
    this.kakaoCustomAuthFunction = createCallable(functions, "KakaoCustomAuth")
    this.sendPhoneVerifyFn = createCallable(functions, "SendPhoneVerify")
    this.verifyCodeFn = createCallable(functions, "VerifyCode")
    this.updateUserEmailFn = createCallable(functions, "UpdateUserEmail")
    this.updateUserAgreementFn = createCallable(functions, "UpdateUserAgreement")
    this.updateUserStateFn = createCallable(functions, "UpdateUserState")
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

  async signInWithToken(token: string): Promise<SignInResult> {
    try {
      const credential = await signInWithCustomToken(this.auth, token)
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
        errorKey: String(e),
      }
    }
  }

  async signInWithGoogle(): Promise<SignInResult> {
    try {
      const provider = new GoogleAuthProvider()
      const credential = await signInWithPopup(this.auth, provider)
      return { ok: true, data: credential }
    } catch (e) {
      console.error(e instanceof FirebaseError ? `${e.code} ${e.message}` : String(e))
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

  private async signInWithCustomProvider(fn: HttpsCallable<CustomAuthRequest, CustomAuthResponse>, token: string): Promise<SignInResult> {
    try {
      const result = await fn({ token })
      const fbToken = result.data.firebase_token
      console.log(fbToken)
      if (!fbToken) return { ok: false, errorKey: "strings:error.no_tokens" }

      return await this.signInWithToken(fbToken)
    } catch (e) {
      if (e instanceof FirebaseError) {
        return {
          ok: false,
          errorCode: e.code,
          errorKey: getAuthErrorKey(e.code) ?? "",
        }
      } else {
        console.error("signInWithCustomProvider error", e)
      }

      return {
        ok: false,
        errorKey: String(e),
      }
    }
  }

  signInWithNaver(token: string): Promise<SignInResult> {
    return this.signInWithCustomProvider(this.naverCustomAuthFunction, token)
  }

  async signInWithKakao(token: string): Promise<SignInResult> {
    return this.signInWithCustomProvider(this.kakaoCustomAuthFunction, token)
  }

  reauth(password: string): Promise<SignInResult> {
    throw Error("not implemented")
  }

  async signOut(): Promise<void> {
    return signOut(this.auth)
  }

  async sendChangeEmailVerification(email: string): Promise<void> {
    const user = this.auth.currentUser
    if (!user) throw Error("No authenticated user")
    const idToken = await user.getIdToken()
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${this.auth.config.apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestType: "VERIFY_AND_CHANGE_EMAIL",
          idToken,
          newEmail: email,
        }),
      },
    )
    if (!res.ok) {
      const body = await res.json()
      console.error("sendOobCode error", body)
      throw Error(body.error?.message ?? "sendOobCode failed")
    }
  }

  async sendEmailVerification(): Promise<void> {
    const user = this.auth.currentUser
    if (!user) throw Error("No authenticated user")
    await sendEmailVerification(user)
  }

  async sendPhoneVerifyCode(phoneNumber: string): Promise<PhoneVerify.Request> {
    const uid = this.auth.currentUser?.uid
    if (!uid) return PhoneVerify.Request.FAILURE_UNKNOWN

    const result = await this.sendPhoneVerifyFn({ phoneNumber, uid })
    return result.data.code
  }

  async verifyPhoneCode(phoneNumber: string, code: string): Promise<PhoneVerify.Result> {
    const uid = this.auth.currentUser?.uid
    if (!uid) return PhoneVerify.Result.FAILURE_UNKNOWN

    const result = await this.verifyCodeFn({ phoneNumber, uid, code })
    return result.data.code
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

  async create(id: string, item: UserEditDetails): Promise<void> {
    const target = await this.transformItem(id, item)
    return await setDoc(doc(this.usersRef, id), target.toHashMap(false))
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

  async updateUserEmail(uid: string, email: string): Promise<void> {
    await this.updateUserEmailFn({ uid, email })
  }

  async updateState(id: string, state: User.State): Promise<void> {
    await this.updateUserStateFn({ uid: id, state })
  }

  async updateAgreedAt(agreedRequired: boolean, agreedOptional: boolean): Promise<boolean> {
    const result = await this.updateUserAgreementFn({ agreedRequired, agreedOptional })
    return result.data.code === 200
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