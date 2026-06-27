import type { User as FirebaseUser } from "firebase/auth"
import { createStore } from "zustand"
import { createZustandContext } from "@ienlab/react-library"
import {User} from "@/domain/model/User.ts"
import type {UserRepository} from "@/domain/repository/UserRepository.ts"
import {UserRepositoryImpl} from "@/data/user/UserRepositoryImpl.ts"
import {container} from "@/di/container.ts"

type Props = {}

interface State {
  isLoading: boolean
  isAuthenticated: boolean
  isSigningOut: boolean
  fbUser: FirebaseUser | null
  user: User | null
  initialize: () => () => void
  clear: () => void
  signOut: () => Promise<void>
}

const userRepository: UserRepository = container.get(UserRepositoryImpl)

const createViewModel = (props: Props) => createStore<State>()((set) => ({
  isLoading: true,
  isAuthenticated: false,
  isSigningOut: false,
  fbUser: null,
  user: null,

  initialize: () => {
    let unsubscribeMe: (() => void) | null = null

    const unsubscribeAuth = userRepository.observeCurrentUser((fbUser) => {
      unsubscribeMe?.()
      unsubscribeMe = null

      if (!fbUser) {
        set({
          isLoading: false,
          isAuthenticated: false,
          fbUser: null,
          user: null,
        })
        return
      }

      set({
        isLoading: true,
        isAuthenticated: true,
        fbUser,
      })

      unsubscribeMe = userRepository.observe((user) => {
        set({
          isLoading: false,
          isAuthenticated: true,
          fbUser,
          user,
        })
      }, fbUser.uid)
    })

    return () => {
      unsubscribeMe?.()
      unsubscribeAuth()
    }
  },

  clear: () =>
    set({
      isLoading: false,
      isAuthenticated: false,
      isSigningOut: false,
      fbUser: null,
      user: null,
    }),

  signOut: () => {
    set({ isSigningOut: true })
    return userRepository.signOut().finally(() => set({ isSigningOut: false }))
  }
}))

export const AuthSessionViewModel = createZustandContext<State, Props>(createViewModel)