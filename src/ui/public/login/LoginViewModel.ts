import type {UserRepository} from "@/domain/repository/UserRepository.ts"
import {createStore} from "zustand"
import {createZustandContext} from "@ienlab/react-library"
import type { UserCredential } from "firebase/auth"
import {container} from "@/di/container.ts"
import {UserRepositoryImpl} from "@/data/user/UserRepositoryImpl.ts"

interface LoginDetails {
  email: string
  password: string
  confirmPassword: string
  errorCode: string | null

  isSignup: boolean
}

class LoginUiState {
  item: LoginDetails = { email: "", password: "", confirmPassword: "", errorCode: null, isSignup: false }

  constructor(partial?: Partial<LoginUiState>) {
    Object.assign(this, partial)
  }
}

type Props = {}

interface Store {
  uiState: LoginUiState
  isLoading: boolean,

  updateUiState: (item: Partial<LoginDetails>) => void
  login: (onSuccess: (credential: UserCredential) => void, onFailure: (errorKey: string) => void) => void
  signup: (onSuccess: (credential: UserCredential) => void, onFailure: (errorKey: string) => void) => void
  googleLogin: (onSuccess: (credential: UserCredential) => void, onFailure: (errorKey: string) => void) => void
  naverLogin: (token: string, onSuccess: (credential: UserCredential) => void, onFailure: (errorKey: string) => void) => void
  kakaoLogin: (token: string, onSuccess: (credential: UserCredential) => void, onFailure: (errorKey: string) => void) => void
}

const userRepository: UserRepository = container.get(UserRepositoryImpl)

const createViewModel = (props: Props) => createStore<Store>((set, get) => ({
  uiState: new LoginUiState({}),
  isLoading: false,

  updateUiState: (item) => {
    set(state => ({ uiState: new LoginUiState({ item: Object.assign(state.uiState.item, item) }) }))
  },

  login: async (onSuccess, onFailure) => {
    const result = await userRepository.signInWithEmailAndPassword(get().uiState.item.email, get().uiState.item.password)
    if (result.ok) {
      if (!result.data.user.emailVerified) {
        await userRepository.signOut()
        onFailure("strings:user.profile.phone.email_not_verified")
        return
      }
      onSuccess(result.data)
    } else {
      onFailure(result.errorKey)
    }
  },

  signup: async (onSuccess, onFailure) => {
    set({ isLoading: true })
    try {
      const { email, password, confirmPassword } = get().uiState.item

      if (password !== confirmPassword) {
        onFailure("strings:password_mismatch")
        return
      }

      const result = await userRepository.signUp(email, password)
      if (result.ok) {
        await userRepository.sendEmailVerification()
        onSuccess(result.data)
      } else {
        onFailure(result.errorKey)
      }
    } finally {
      set({ isLoading: false })
    }
  },

  googleLogin: async (onSuccess, onFailure) => {
    set({ isLoading: true })
    try {
      const result = await userRepository.signInWithGoogle()
      if (result.ok) {
        onSuccess(result.data)
      } else {
        onFailure(result.errorKey)
      }
    } finally {
      set({ isLoading: false })
    }
  },

  naverLogin: async (token, onSuccess, onFailure) => {
    set({ isLoading: true })
    try {
      const result = await userRepository.signInWithNaver(token)
      if (result.ok) {
        onSuccess(result.data)
      } else {
        onFailure(result.errorKey)
      }
    } finally {
      set({ isLoading: false })
    }
  },

  kakaoLogin: async (token, onSuccess, onFailure) => {
    set({ isLoading: true })
    try {
      const result = await userRepository.signInWithKakao(token)
      if (result.ok) {
        onSuccess(result.data)
      } else {
        onFailure(result.errorKey)
      }
    } finally {
      set({ isLoading: false })
    }
  }
}))

export const LoginViewModel = createZustandContext<Store, Props>(createViewModel)
