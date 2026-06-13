import type {User as FirebaseUser, UserCredential } from "firebase/auth"
import type {User} from "@/domain/model/User.ts"
import type {DocumentReference, Unsubscribe} from "firebase/firestore"
import {type InfScrollStateList, PhoneVerify, type SignInResult} from "@ienlab/react-library"
import type {UserEditDetails} from "@/domain/model/UserEditDetails.ts"

export interface UserRepository {
  readonly userInfoStateList: InfScrollStateList<User>

  /**
   * Auth
   */
  signInWithEmailAndPassword(email: string, password: string): Promise<SignInResult>
  signInWithToken(token: string): Promise<UserCredential | null>
  signInWithNaver(token: string): Promise<UserCredential | null>
  signInWithKakao(token: string): Promise<UserCredential | null>
  reauth(password: string): Promise<UserCredential | null>
  signOut(): Promise<void>
  sendPhoneVerifyCode(phoneNumber: string): Promise<PhoneVerify.Request>
  verifyPhoneCode(phoneNumber: string, code: string): Promise<PhoneVerify.Result>


  /**
   * User
   */
  getCurrentUser(): FirebaseUser | null
  observeCurrentUser(callback: (fbUser: FirebaseUser | null) => void): () => void

  get(id?: string): Promise<User | null>
  observe(callback: (user: User | null) => void, id?: string, cache?: boolean): Unsubscribe

  update(id: string, user: UserEditDetails): Promise<void>
  approveTempCompany(id: string): Promise<void>
  rejectTempCompany(id: string): Promise<void>
  delete(credential: UserCredential): Promise<boolean>

  setSearchKeyword(keyword: string): void
  clearSearch(): void

  loadNextPage(): Promise<void>
  reset(): void
}
