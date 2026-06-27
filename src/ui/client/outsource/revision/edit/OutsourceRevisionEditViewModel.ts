import {OutsourceRevisionEditDetails} from "@/domain/model/OutsourceRevisionEditDetails.ts"
import {createZustandContext, type PageMode} from "@ienlab/react-library"
import type {
  OutsourceRevisionInfoState
} from "@/ui/client/outsource/revision/detail/OutsourceRevisionDetailViewModel.ts"
import {createStore} from "zustand"
import {Outsource} from "@/domain/model/Outsource.ts"
import type {DocumentReference} from "firebase/firestore"
import {container} from "@/di/container.ts"
import {OutsourceRevisionRepositoryFactory} from "@/data/outsource/OutsourceRevisionRepositoryImpl.ts"

class OutsourceRevisionEditUiState {
  item: OutsourceRevisionEditDetails = new OutsourceRevisionEditDetails()
  isInitialized: boolean = false

  constructor(partial?: Partial<OutsourceRevisionEditUiState>) {
    Object.assign(this, partial)
  }
}

type Props = {
  id: string
  revisionId?: string
  mode: PageMode
}

interface Store {
  uiState: OutsourceRevisionEditUiState
  infoState: OutsourceRevisionInfoState

  init: () => void
  onDisposed: () => void
  updateUiState: (item: Partial<OutsourceRevisionEditDetails>, isDirty?: boolean) => void
  invalid: () => boolean
  save: (state: Outsource.RevisionRequest.State, onSuccess: (id: string | null) => void, onFailure: (errorKey: string) => void) => void
  del: (onSuccess: () => void, onFailure: (errorKey: string) => void) => void
  unsubscribe?: () => void
}

const revisionRepositoryFactory = container.get(OutsourceRevisionRepositoryFactory)

const createViewModel = (props: Props) => {
  const revisionRepository = revisionRepositoryFactory.create(props.id, false)
  return createStore<Store>((set, get) => ({
    uiState: new OutsourceRevisionEditUiState({isInitialized: false}),
    infoState: {item: null, isInitialized: false},

    init: async () => {
      if (props.mode === "edit" && props.revisionId) {
        const {unsubscribe} = get()
        unsubscribe?.()

        let hasCapturedInitial = false
        const off = revisionRepository.observe(props.revisionId, item => {
          set(() => {
            const newState: Partial<Store> = {
              unsubscribe: off,
              infoState: {item: item, isInitialized: true}
            }

            if (!hasCapturedInitial) {
              newState.uiState = new OutsourceRevisionEditUiState({
                item: item ? OutsourceRevisionEditDetails.fromItem(item) : new OutsourceRevisionEditDetails(),
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
          infoState: {item: new Outsource.RevisionRequest(), isInitialized: true},
          uiState: new OutsourceRevisionEditUiState({item: new OutsourceRevisionEditDetails(), isInitialized: true})
        })
      }
    },

    onDisposed: () => {
      const { uiState, unsubscribe } = get()
      uiState.item.imageUrls.forEach(item => item.revokeIfNeeded())
      unsubscribe?.()
    },

    updateUiState: (item, isDirty = true) => {
      set(state => ({
        uiState: new OutsourceRevisionEditUiState({
          item: new OutsourceRevisionEditDetails({...state.uiState.item, ...item, isDirty}),
          isInitialized: state.uiState.isInitialized,
        })
      }))
    },

    invalid: () => {
      const {uiState} = get()
      return uiState.item.title.length === 0
        || uiState.item.reason.length === 0
    },

    save: async (state, onSuccess, onFailure) => {
      const {uiState, updateUiState} = get()
      try {
        let ref: DocumentReference | null = null
        if (props.mode === "edit" && props.revisionId) {
          await revisionRepository.clientUpdate(props.revisionId, uiState.item)
          await revisionRepository.updateState(props.revisionId, state)
        } else {
          ref = await revisionRepository.clientCreate(uiState.item)
          await revisionRepository.updateState(ref?.id, state)
        }

        updateUiState({}, false)
        onSuccess(ref?.id ?? null)
      } catch (e) {
        if (e instanceof Error) {
          switch (e.message) {
            case "already-exist":
              onFailure("strings:already_existed_id")
              return
            default:
              onFailure(String(e))
          }
        } else {
          onFailure(String(e))
        }
      }
    },

    del: async (onSuccess, onFailure) => {
      try {
        if (props.revisionId) {
          await revisionRepository.delete(props.revisionId)
          onSuccess()
        } else {
          onFailure("strings:error.no_valid_id")
        }
      } catch (e) {
        onFailure(String(e))
      }
    }
  }))
}

export const OutsourceRevisionEditViewModel = createZustandContext<Store, Props>(createViewModel)