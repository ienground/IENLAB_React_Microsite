import {createZustandContext, type InfScrollStateList, PhoneVerify} from "@ienlab/react-library"
import {createStore} from "zustand"
import {User} from "@/domain/model/User.ts"
import {UserEditDetails} from "@/domain/model/UserEditDetails.ts"
import type {UserRepository} from "@/domain/repository/UserRepository.ts"
import {Company} from "@/domain/model/Company.ts"
import type {CompanyRepository} from "@/domain/repository/CompanyRepository"
import Result = PhoneVerify.Result

class UserEditUiState {
  item: UserEditDetails = new UserEditDetails()
  isInitialized: boolean = false

  constructor(partial?: Partial<UserEditUiState>) {
    Object.assign(this, partial)
  }
}

export interface UserInfoState {
  item: User | null
  isInitialized: boolean
}

type Props = {
  userRepository: UserRepository
  companyRepository: CompanyRepository
}

interface Store {
  uiState: UserEditUiState
  infoState: UserInfoState
  companyInfoStateList: InfScrollStateList<Company>

  init: () => void
  onDisposed: () => void
  updateUiState: (item: Partial<UserEditDetails>, isDirty?: boolean) => void
  invalid: () => boolean
  save: (onSuccess: (id: string | null) => void, onFailure: (errorKey: string) => void) => void
  del: (onSuccess: () => void, onFailure: (errorKey: string) => void) => void
  unsubscribe?: () => void

  sendOtpCode: (onSuccess: (result: PhoneVerify.Request) => void, onFailure: (errorKey: string) => void) => void
  verifyOtpCode: (onSuccess: (result: PhoneVerify.Result) => void, onFailure: (errorKey: string) => void) => void

  loadNextCompanyPage: () => void
  setCompanySearchKeyword: (keyword: string) => void
  clearCompanySearch: () => void
}

const createViewModel = (props: Props) => createStore<Store>((set, get) => ({
  uiState: new UserEditUiState({ isInitialized: false }),
  infoState: { item: null, isInitialized: false },
  companyInfoStateList: props.companyRepository.companyInfoStateList,
  otpRequestState: PhoneVerify.Request.IDLE,
  otpResultState: PhoneVerify.Result.IDLE,

  init: async () => {
    const { unsubscribe } = get()
    unsubscribe?.()

    let hasCapturedInitial = false
    const off = props.userRepository.observe(item => {
      set(() => {
        const newState: Partial<Store> = {
          unsubscribe: off,
          infoState: { item: item, isInitialized: true }
        }

        if (!hasCapturedInitial) {
          const fbUser = props.userRepository.getCurrentUser()
          newState.uiState = new UserEditUiState({ item: item ? UserEditDetails.fromItem(item, fbUser?.email ?? undefined) : new UserEditDetails({ email: fbUser?.email ?? undefined }), isInitialized: true })
          hasCapturedInitial = true
        }

        return newState
      })
    })
    set({ unsubscribe: off })
  },

  onDisposed: () => {
    const { uiState, unsubscribe } = get()
    uiState.item.profileUrl.revokeIfNeeded()
    unsubscribe?.()
  },

  updateUiState: (item, isDirty = true) => {
    set(state => ({
      uiState: new UserEditUiState({
        item: new UserEditDetails({...state.uiState.item, ...item, isDirty}),
        isInitialized: state.uiState.isInitialized,
      })
    }))
  },

  invalid: () => {
    const { uiState, infoState } = get()
    const phoneChanged = uiState.item.phone !== infoState.item?.phone
    return uiState.item.profileUrl.isEmpty
      || uiState.item.name.length === 0
      || uiState.item.company === null
      || uiState.item.phone.length === 0
      || (phoneChanged && uiState.item.otpResultState !== PhoneVerify.Result.VERIFIED)
  },

  save: async (onSuccess, onFailure) => {
    const { uiState, updateUiState, infoState } = get()
    if (infoState.item === null) {
      onFailure("strings:error_occurred")
      return
    }
    try {
      const currentEmail = props.userRepository.getCurrentUser()?.email
      const emailChanged = uiState.item.email !== currentEmail

      if (emailChanged) {
        await props.userRepository.sendChangeEmailVerification(uiState.item.email)
      }
      await props.userRepository.update(infoState.item.id, uiState.item)

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

  del: async (onSuccess, onFailure) => {
    throw Error("not implemented")
    // try {
    //   await outsourceRepository.deleteOutsource(id)
    //   onSuccess()
    // } catch (e) {
    //   onFailure(String(e))
    // }
  },

  sendOtpCode: async (onSuccess, onFailure) => {
    const { uiState, updateUiState } = get()
    updateUiState({ otpRequestState: PhoneVerify.Request.REQUESTING, otpResultState: Result.IDLE, otpCode: "" })
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
    const { uiState, updateUiState } = get()
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
    await props.companyRepository.loadNextPage()
    set({ companyInfoStateList: props.companyRepository.companyInfoStateList })
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

export const ClientUserViewModel = createZustandContext<Store, Props>(createViewModel)