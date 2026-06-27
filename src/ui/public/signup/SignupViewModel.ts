import {createZustandContext, type InfScrollStateList, PhoneVerify} from "@ienlab/react-library"
import {type Unsubscribe} from "firebase/firestore"
import type {UserRepository} from "@/domain/repository/UserRepository.ts"
import {createStore} from "zustand"
import {UserEditUiState} from "@/ui/client/user/ClientUserViewModel.ts"
import {UserEditDetails} from "@/domain/model/UserEditDetails.ts"
import type {CompanyRepository} from "@/domain/repository/CompanyRepository.ts"
import {Company} from "@/domain/model/Company.ts"
import {Env} from "@/domain/model/Env.ts"
import type {EnvRepository} from "@/domain/repository/EnvRepository.ts"
import {container} from "@/di/container.ts"
import {CompanyRepositoryImpl} from "@/data/company/CompanyRepositoryImpl.ts"
import {EnvRepositoryImpl} from "@/data/env/EnvRepositoryImpl.ts"
import {UserRepositoryImpl} from "@/data/user/UserRepositoryImpl.ts"

export class SignupDetails {
  step: number = 0
  agreementIds: string[] = []

  constructor(partial: Partial<SignupDetails> = {}) {
    Object.assign(this, partial)
  }
}

class SignupUiState {
  item: SignupDetails = new SignupDetails()
  agreementItems: Env.Agreement.Item[] = []

  constructor(partial?: Partial<SignupUiState>) {
    Object.assign(this, partial)
  }
}

type Props = {}

interface Store {
  signupUiState: SignupUiState
  userEditUiState: UserEditUiState
  companyInfoStateList: InfScrollStateList<Company>
  unsubscribeAgreementItems: (() => void) | null

  init: () => void,
  onDisposed: () => void
  updateSignupUiState: (item: Partial<SignupDetails>) => void
  updateUserEditUiState: (item: Partial<UserEditDetails>, isDirty?: boolean) => void
  invalid: () => boolean
  allRequiredAgreed: () => boolean

  moveStep: (increment: number) => void
  save: (onSuccess: (id: string | null) => void, onFailure: (errorKey: string) => void) => void

  sendOtpCode: (onSuccess: (result: PhoneVerify.Request) => void, onFailure: (errorKey: string) => void) => void
  verifyOtpCode: (onSuccess: (result: PhoneVerify.Result) => void, onFailure: (errorKey: string) => void) => void

  loadNextCompanyPage: () => void
  setCompanySearchKeyword: (keyword: string) => void
  clearCompanySearch: () => void
}

const companyRepository: CompanyRepository = container.get(CompanyRepositoryImpl)
const envRepository: EnvRepository = container.get(EnvRepositoryImpl)
const userRepository: UserRepository = container.get(UserRepositoryImpl)

const createViewModel = (props: Props) => createStore<Store>((set, get) => ({
  signupUiState: new SignupUiState(),
  userEditUiState: new UserEditUiState(),
  companyInfoStateList: companyRepository.companyInfoStateList,
  unsubscribeAgreementItems: null,

  init: () => {
    get().loadNextCompanyPage()
    const off = envRepository.observeAgreementItems(items => {
      set(state => ({
        signupUiState: new SignupUiState({
          ...state.signupUiState,
          agreementItems: items,
        })
      }))
    })
    set({ unsubscribeAgreementItems: off })
  },

  onDisposed: () => {
    const { userEditUiState: uiState, unsubscribeAgreementItems } = get()
    uiState.item.profileUrl.revokeIfNeeded()
    unsubscribeAgreementItems?.()
  },

  updateSignupUiState: (item) => {
    set(state => ({
      signupUiState: new SignupUiState({
        ...state.signupUiState,
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

  allRequiredAgreed: () => {
    const { signupUiState } = get()
    const requiredItems = signupUiState.agreementItems.filter(i => i.required)
    if (requiredItems.length === 0) return true
    return requiredItems.every(i => signupUiState.item.agreementIds.includes(i.id))
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
    set({ signupUiState: new SignupUiState({ ...get().signupUiState, item: new SignupDetails({ ...item, step: item.step + increment }) }) })
  },

  save: async (onSuccess, onFailure) => {
    const { signupUiState, userEditUiState: uiState, updateUserEditUiState: updateUiState } = get()

    try {
      const userId = userRepository.getCurrentUser()?.uid
      if (!userId) {
        onFailure("strings:error_occurred")
        return
      }

      await userRepository.create(userId, uiState.item)

      const updateResult = await userRepository.updateAgreedAt(signupUiState.item.agreementIds)

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
      const state = await userRepository.sendPhoneVerifyCode(uiState.item.phone)
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
      const state = await userRepository.verifyPhoneCode(uiState.item.phone, uiState.item.otpCode)
      updateUiState({ otpResultState: state })
      onSuccess(state)
    } catch (e) {
      updateUiState({ otpResultState: PhoneVerify.Result.FAILURE_UNKNOWN })
      onFailure(e instanceof Error ? e.message : String(e))
    }
  },


  loadNextCompanyPage: async () => {
    set({ companyInfoStateList: { ...companyRepository.companyInfoStateList } })
    await companyRepository.loadNextPage()
    set({ companyInfoStateList: { ...companyRepository.companyInfoStateList } })
  },

  setCompanySearchKeyword: (keyword) => {
    companyRepository.setSearchKeyword(keyword)
    get().loadNextCompanyPage()
  },

  clearCompanySearch: () => {
    companyRepository.clearSearch()
    get().loadNextCompanyPage()
  },
}))

export const SignupViewModel = createZustandContext<Store, Props>(createViewModel)
