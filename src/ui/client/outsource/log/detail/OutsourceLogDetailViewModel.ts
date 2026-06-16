import type {OutsourceLogRepository} from "@/domain/repository/OutsourceLogRepository.ts"
import {Outsource} from "@/domain/model/Outsource.ts"
import {createStore} from "zustand"
import {createZustandContext} from "@ienlab/react-library"

export interface OutsourceLogInfoState {
  item: Outsource.WorkLog | null
  isInitialized: boolean
}

type Props = {
  id: string
  logId: string
  logRepository: OutsourceLogRepository
}

interface Store {
  infoState: OutsourceLogInfoState

  init: () => void
  onDisposed: () => void
  unsubscribe?: () => void
}

const createViewModel = (props: Props) => createStore<Store>((set, get) => ({
  infoState: { item: null, isInitialized: false },
  init: () => {
    const {unsubscribe} = get()
    unsubscribe?.()

    const off = props.logRepository.observe(props.logId, async item => {
      set({infoState: {item: item, isInitialized: true}})
    })

    set({unsubscribe: off})
  },

  onDisposed: () => {
    get().unsubscribe?.()
  },
}))

export const OutsourceLogDetailViewModel = createZustandContext<Store, Props>(createViewModel)