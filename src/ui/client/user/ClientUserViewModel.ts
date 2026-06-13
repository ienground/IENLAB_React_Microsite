import {createZustandContext, type InfScrollStateList, PhoneVerify} from "@ienlab/react-library"
import {createStore} from "zustand"
import {User} from "@/domain/model/User.ts"
import {UserEditDetails} from "@/domain/model/UserEditDetails.ts"
import type {UserRepository} from "@/domain/repository/UserRepository.ts"
import {Company} from "@/domain/model/Company.ts"
import type { CompanyRepository } from "@/domain/repository/CompanyRepository"

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
  id: string
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
          newState.uiState = new UserEditUiState({ item: item ? UserEditDetails.fromItem(item) : new UserEditDetails(), isInitialized: true })
          hasCapturedInitial = true
        }

        return newState
      })
    }, props.id)
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
    const { uiState } = get()
    return uiState.item.profileUrl.isEmpty
      || uiState.item.name.length === 0
      || uiState.item.company === null
      || uiState.item.phone.length === 0
      || uiState.item.email.length === 0
  },

  save: async (onSuccess, onFailure) => {
    const { uiState, updateUiState } = get()
    try {
      await props.userRepository.update(props.id, uiState.item)

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
    const { uiState } = get()
    try {
      const state = await props.userRepository.sendPhoneVerifyCode(uiState.item.phone)
      onSuccess(state)
    } catch (e) {
      onFailure(e instanceof Error ? e.message : String(e))
    }
  },

  verifyOtpCode: async (onSuccess, onFailure) => {
    const { uiState } = get()
    try {
      const state = await props.userRepository.verifyPhoneCode(uiState.item.phone, uiState.item.otpCode)
      onSuccess(state)
    } catch (e) {
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