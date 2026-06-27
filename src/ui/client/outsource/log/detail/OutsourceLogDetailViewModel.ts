import {Outsource} from "@/domain/model/Outsource.ts"
import {createStore} from "zustand"
import {createZustandContext} from "@ienlab/react-library"
import {container} from "@/di/container.ts"
import {OutsourceLogRepositoryFactory} from "@/data/outsource/OutsourceLogRepositoryImpl.ts"

export interface OutsourceLogInfoState {
  item: Outsource.WorkLog | null
  isInitialized: boolean
}

type Props = {
  id: string
  logId: string
}

interface Store {
  infoState: OutsourceLogInfoState

  init: () => void
  onDisposed: () => void
  unsubscribe?: () => void
}

const logRepositoryFactory = container.get(OutsourceLogRepositoryFactory)

const createViewModel = (props: Props) => {
  const logRepository = logRepositoryFactory.create(props.id)

  return createStore<Store>((set, get) => ({
    infoState: { item: null, isInitialized: false },
    init: () => {
      const {unsubscribe} = get()
      unsubscribe?.()

      const off = logRepository.observe(props.logId, async item => {
        set({infoState: {item: item, isInitialized: true}})
      })

      set({unsubscribe: off})
    },

    onDisposed: () => {
      get().unsubscribe?.()
    },
  }))
}

export const OutsourceLogDetailViewModel = createZustandContext<Store, Props>(createViewModel)