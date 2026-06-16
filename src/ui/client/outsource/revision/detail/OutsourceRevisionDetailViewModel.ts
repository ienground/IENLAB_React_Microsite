import {createStore} from "zustand"
import {createZustandContext} from "@ienlab/react-library"
import type {OutsourceRevisionRepository} from "@/domain/repository/OutsourceRevisionRepository.ts"
import {Outsource} from "@/domain/model/Outsource.ts"

export interface OutsourceRevisionInfoState {
  item: Outsource.RevisionRequest | null
  isInitialized: boolean
}

type Props = {
  id: string
  revisionId: string
  revisionRepository: OutsourceRevisionRepository
}

interface Store {
  infoState: OutsourceRevisionInfoState

  init: () => void
  onDisposed: () => void
  unsubscribe?: () => void
  del: (onSuccess: () => void, onFailure: (errorKey: string) => void) => Promise<void>
  updateState: (state: Outsource.RevisionRequest.State) => Promise<void>
}

const createViewModel = (props: Props) => createStore<Store>((set, get) => ({
  infoState: { item: null, isInitialized: false },
  init: () => {
    const { unsubscribe } = get()
    unsubscribe?.()

    const off = props.revisionRepository.observe(props.revisionId, async item => {
      set({ infoState: { item: item, isInitialized: true } })
    })

    set({ unsubscribe: off })
  },

  onDisposed: () => {
    get().unsubscribe?.()
  },

  del: async (onSuccess, onFailure) => {
    try {
      await props.revisionRepository.delete(props.revisionId)
      onSuccess()
    } catch (e) {
      onFailure(String(e))
    }
  },

  updateState: async (state) => {
    await props.revisionRepository.updateState(props.revisionId, state)
  }
}))

export const OutsourceRevisionDetailViewModel = createZustandContext<Store, Props>(createViewModel)