import {createZustandContext, type PageMode} from "@ienlab/react-library"
import {createStore} from "zustand"
import {OutsourceRequestEditDetails} from "@/domain/model/OutsourceRequestEditDetails.ts"
import {Outsource} from "@/domain/model/Outsource.ts"
import {container} from "@/di/container.ts"
import {OutsourceRequestRepositoryFactory} from "@/data/outsource/OutsourceRequestRepositoryImpl.ts"

class OutsourceRequestEditUiState {
  item: OutsourceRequestEditDetails = new OutsourceRequestEditDetails()
  isInitialized: boolean = false

  constructor(partial?: Partial<OutsourceRequestEditUiState>) {
    Object.assign(this, partial)
  }
}

export interface OutsourceRequestInfoState {
  item: Outsource.InfoRequest | null
  isInitialized: boolean
}

type Props = {
  id: string
  requestId: string
  mode: PageMode
}

interface Store {
  uiState: OutsourceRequestEditUiState
  infoState: OutsourceRequestInfoState

  init: () => void
  onDisposed: () => void
  updateUiState: (item: Partial<OutsourceRequestEditDetails>, isDirty?: boolean) => void
  invalid: () => boolean
  save: (state: Outsource.InfoRequest.State, onSuccess: () => void, onFailure: (errorKey: string) => void) => void
  del: (onSuccess: () => void, onFailure: (errorKey: string) => void) => void
  unsubscribe?: () => void
}

const requestRepositoryFactory = container.get(OutsourceRequestRepositoryFactory)

const createViewModel = (props: Props) => {
  const requestRepository = requestRepositoryFactory.create(props.id, false)

  return createStore<Store>((set, get) => ({
    uiState: new OutsourceRequestEditUiState({isInitialized: false}),
    infoState: {item: null, isInitialized: false},

    init: async () => {
      if (props.mode === "edit") {
        const {unsubscribe} = get()
        unsubscribe?.()

        let hasCapturedInitial = false
        const off = requestRepository.observe(props.requestId, item => {
          set(() => {
            const newState: Partial<Store> = {
              unsubscribe: off,
              infoState: {item, isInitialized: true}
            }

            if (!hasCapturedInitial) {
              const editDetails = item ? OutsourceRequestEditDetails.fromItem(item) : new OutsourceRequestEditDetails()
              editDetails.textItems = editDetails.textItems.map(ti =>
                ti.secure ? new Outsource.InfoRequest.TextItem({...ti, value: ""}) : ti
              )
              newState.uiState = new OutsourceRequestEditUiState({
                item: editDetails,
                isInitialized: true
              })
              hasCapturedInitial = true
            }

            return newState
          })
        })
        set({unsubscribe: off})
      } else {
        set({
          infoState: {item: new Outsource.InfoRequest(), isInitialized: true},
          uiState: new OutsourceRequestEditUiState({item: new OutsourceRequestEditDetails(), isInitialized: true})
        })
      }
    },

    onDisposed: () => {
      get().unsubscribe?.()
    },

    updateUiState: (item, isDirty = true) => {
      set(state => ({
        uiState: new OutsourceRequestEditUiState({
          item: new OutsourceRequestEditDetails({...state.uiState.item, ...item, isDirty}),
          isInitialized: state.uiState.isInitialized,
        })
      }))
    },

    invalid: () => {
      const {uiState} = get()
      return uiState.item.type === Outsource.InfoRequest.Type.TEXT
        ? uiState.item.textItems.length === 0
        : false
    },

    save: async (state, onSuccess, onFailure) => {
      const {uiState, updateUiState} = get()
      try {
        await requestRepository.clientUpdate(props.requestId, uiState.item)
        await requestRepository.updateState(props.requestId, state)
        updateUiState({}, false)
        onSuccess()
      } catch (e) {
        if (e instanceof Error) {
          onFailure(String(e))
        } else {
          onFailure(String(e))
        }
      }
    },

    del: async (onSuccess, onFailure) => {
      try {
        await requestRepository.delete(props.requestId)
        onSuccess()
      } catch (e) {
        onFailure(String(e))
      }
    }
  }))
}

export const OutsourceRequestEditViewModel = createZustandContext<Store, Props>(createViewModel)
