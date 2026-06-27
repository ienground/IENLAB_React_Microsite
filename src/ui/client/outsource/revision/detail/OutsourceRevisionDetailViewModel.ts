import {createStore} from "zustand"
import {createZustandContext} from "@ienlab/react-library"
import {Outsource} from "@/domain/model/Outsource.ts"
import {container} from "@/di/container.ts"
import {OutsourceRevisionRepositoryFactory} from "@/data/outsource/OutsourceRevisionRepositoryImpl.ts"

export interface OutsourceRevisionInfoState {
  item: Outsource.RevisionRequest | null
  isInitialized: boolean
}

type Props = {
  id: string
  revisionId: string
}

interface Store {
  infoState: OutsourceRevisionInfoState

  init: () => void
  onDisposed: () => void
  unsubscribe?: () => void
  del: (onSuccess: () => void, onFailure: (errorKey: string) => void) => Promise<void>
  updateState: (state: Outsource.RevisionRequest.State) => Promise<void>
}

const revisionRepositoryFactory = container.get(OutsourceRevisionRepositoryFactory)

const createViewModel = (props: Props) => {
  const revisionRepository = revisionRepositoryFactory.create(props.id, false)

  return createStore<Store>((set, get) => ({
    infoState: { item: null, isInitialized: false },
    init: () => {
      const { unsubscribe } = get()
      unsubscribe?.()

      const off = revisionRepository.observe(props.revisionId, async item => {
        set({ infoState: { item: item, isInitialized: true } })
      })

      set({ unsubscribe: off })
    },

    onDisposed: () => {
      get().unsubscribe?.()
    },

    del: async (onSuccess, onFailure) => {
      try {
        await revisionRepository.delete(props.revisionId)
        onSuccess()
      } catch (e) {
        onFailure(String(e))
      }
    },

    updateState: async (state) => {
      await revisionRepository.updateState(props.revisionId, state)
    }
  }))
}

export const OutsourceRevisionDetailViewModel = createZustandContext<Store, Props>(createViewModel)