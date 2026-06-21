import {createZustandContext, type InfScrollStateList, PhoneVerify} from "@ienlab/react-library"
import {Timestamp} from "firebase/firestore"
import type {UserRepository} from "@/domain/repository/UserRepository.ts"
import {createStore} from "zustand"
import {UserEditUiState} from "@/ui/client/user/ClientUserViewModel.ts"
import {UserEditDetails} from "@/domain/model/UserEditDetails.ts"
import type {CompanyRepository} from "@/domain/repository/CompanyRepository.ts"
import {Company} from "@/domain/model/Company.ts"
import {userRepository} from "@/di/container.ts"

export class SignupDetails {
  step: number = 0
  agreedRequired: boolean = false
  agreedOptional: boolean = false

  constructor(partial: Partial<SignupDetails> = {}) {
    Object.assign(this, partial)
  }
}

class SignupUiState {
  item: SignupDetails = new SignupDetails()

  constructor(partial?: Partial<SignupUiState>) {
    Object.assign(this, partial)
  }
}

type Props = {
  userRepository: UserRepository
  companyRepository: CompanyRepository
}

interface Store {
  signupUiState: SignupUiState
  userEditUiState: UserEditUiState
  companyInfoStateList: InfScrollStateList<Company>

  init: () => void,
  onDisposed: () => void
  updateSignupUiState: (item: Partial<SignupDetails>) => void
  updateUserEditUiState: (item: Partial<UserEditDetails>, isDirty?: boolean) => void
  invalid: () => boolean

  moveStep: (increment: number) => void
  save: (onSuccess: (id: string | null) => void, onFailure: (errorKey: string) => void) => void

  sendOtpCode: (onSuccess: (result: PhoneVerify.Request) => void, onFailure: (errorKey: string) => void) => void
  verifyOtpCode: (onSuccess: (result: PhoneVerify.Result) => void, onFailure: (errorKey: string) => void) => void

  loadNextCompanyPage: () => void
  setCompanySearchKeyword: (keyword: string) => void
  clearCompanySearch: () => void
}

const createViewModel = (props: Props) => createStore<Store>((set, get) => ({
  signupUiState: new SignupUiState(),
  userEditUiState: new UserEditUiState(),
  companyInfoStateList: props.companyRepository.companyInfoStateList,

  init: () => {},

  onDisposed: () => {
    const { userEditUiState: uiState } = get()
    uiState.item.profileUrl.revokeIfNeeded()
  },

  updateSignupUiState: (item) => {
    set(state => ({
      signupUiState: new SignupUiState({
        item: new SignupDetails({...state.signupUiState.item, ...item}),
      })
    }))
  },

  updateUserEditUiState: (item, isDirty = true) => {
    set(state => ({
      userEditUiState: new UserEditUiState({
        item: new UserEditDetails({...state.userEditUiState.item, ...item, isDirty}),
        isInitialized: state.userEditUiState.isInitialized,
      })
    }))
  },

  invalid: () => {
    const { userEditUiState: uiState } = get()
    return uiState.item.profileUrl.isEmpty
      || uiState.item.name.length === 0
      || uiState.item.company === null
      || uiState.item.phone.length === 0
      || (uiState.item.otpResultState !== PhoneVerify.Result.VERIFIED)
  },

  moveStep: (increment) => {
    const item = get().signupUiState.item
    set({ signupUiState: new SignupUiState({ item: new SignupDetails({ ...item, step: item.step + increment }) }) })
  },

  save: async (onSuccess, onFailure) => {
    const { signupUiState, userEditUiState: uiState, updateUserEditUiState: updateUiState } = get()

    try {
      const userId = userRepository.getCurrentUser()?.uid
      if (!userId) {
        onFailure("strings:error_occurred")
        return
      }

      await props.userRepository.create(userId, uiState.item)

      const updateResult = await props.userRepository.updateAgreedAt(
        signupUiState.item.agreedRequired,
        signupUiState.item.agreedOptional,
      )

      if (!updateResult) {
        onFailure("strings:error_occurred")
        return
      }

      updateUiState({}, false)
      onSuccess(null)
    } catch (e) {
      if (e instanceof Error) {
        switch (e.message) {
          case "already-exist": onFailure("strings:already_existed_id"); return
          default: onFailure(String(e))
        }
      } else {
        onFailure(String(e))
      }
    }
  },

  sendOtpCode: async (onSuccess, onFailure) => {
    const { userEditUiState: uiState, updateUserEditUiState: updateUiState } = get()
    updateUiState({ otpRequestState: PhoneVerify.Request.REQUESTING, otpResultState: PhoneVerify.Result.IDLE, otpCode: "" })
    try {
      const state = await props.userRepository.sendPhoneVerifyCode(uiState.item.phone)
      updateUiState({ otpRequestState: state })
      onSuccess(state)
    } catch (e) {
      updateUiState({ otpRequestState: PhoneVerify.Request.FAILURE_UNKNOWN })
      onFailure(e instanceof Error ? e.message : String(e))
    }
  },

  verifyOtpCode: async (onSuccess, onFailure) => {
    const { userEditUiState: uiState, updateUserEditUiState: updateUiState } = get()
    updateUiState({ otpResultState: PhoneVerify.Result.REQUESTING })
    try {
      const state = await props.userRepository.verifyPhoneCode(uiState.item.phone, uiState.item.otpCode)
      updateUiState({ otpResultState: state })
      onSuccess(state)
    } catch (e) {
      updateUiState({ otpResultState: PhoneVerify.Result.FAILURE_UNKNOWN })
      onFailure(e instanceof Error ? e.message : String(e))
    }
  },


  loadNextCompanyPage: async () => {
    set({ companyInfoStateList: { ...props.companyRepository.companyInfoStateList } })
    await props.companyRepository.loadNextPage()
    set({ companyInfoStateList: { ...props.companyRepository.companyInfoStateList } })
  },

  setCompanySearchKeyword: (keyword) => {
    props.companyRepository.setSearchKeyword(keyword)
    get().loadNextCompanyPage()
  },

  clearCompanySearch: () => {
    props.companyRepository.clearSearch()
    get().loadNextCompanyPage()
  },
}))

export const SignupViewModel = createZustandContext<Store, Props>(createViewModel)