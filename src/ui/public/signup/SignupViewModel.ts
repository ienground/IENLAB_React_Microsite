import {createZustandContext} from "@ienlab/react-library"
import type {UserRepository} from "@/domain/repository/UserRepository.ts"
import {createStore} from "zustand"

export interface SignupDetails {
  email: string
  password: string
  confirmPassword: string
  name: string
}

class SignupUiState {
  step: number = 1
  agreedRequired: boolean = false
  agreedOptional: boolean = false
  item: SignupDetails = { email: "", password: "", confirmPassword: "", name: "" }
  isLoading: boolean = false

  constructor(partial?: Partial<SignupUiState>) {
    Object.assign(this, partial)
  }
}

type Props = {
  userRepository: UserRepository
}

interface Store {
  uiState: SignupUiState
  updateUiState: (partial: Partial<SignupUiState>) => void
  updateItem: (partial: Partial<SignupDetails>) => void
  nextStep: () => void
  prevStep: () => void
}

const createViewModel = (props: Props) => createStore<Store>((set) => ({
  uiState: new SignupUiState(),
  updateUiState: (partial) => {
    set(state => ({ uiState: new SignupUiState({ ...state.uiState, ...partial }) }))
  },
  updateItem: (partial) => {
    set(state => ({ uiState: new SignupUiState({ ...state.uiState, item: { ...state.uiState.item, ...partial } }) }))
  },
  nextStep: () => {
    set(state => ({ uiState: new SignupUiState({ ...state.uiState, step: state.uiState.step + 1 }) }))
  },
  prevStep: () => {
    set(state => ({ uiState: new SignupUiState({ ...state.uiState, step: state.uiState.step - 1 }) }))
  }
}))

export const SignupViewModel = createZustandContext<Store, Props>(createViewModel)