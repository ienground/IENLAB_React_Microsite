import {createZustandContext, type InfScrollStateList} from "@ienlab/react-library"
import type {Outsource} from "@/domain/model/Outsource.ts"
import {createStore} from "zustand"
import type {OutsourceLogRepository} from "@/domain/repository/OutsourceLogRepository.ts"
import type {OutsourceRepository} from "@/domain/repository/OutsourceRepository.ts"
import type {Unsubscribe} from "firebase/firestore"
import type {OutsourceInfoState} from "@/ui/client/outsource/detail/OutsourceDetailViewModel.ts"

type Props = {
  id: string
  outsourceRepository: OutsourceRepository
  logRepository: OutsourceLogRepository
}

interface Store {
  logInfoStateList: InfScrollStateList<Outsource.WorkLog>
  infoState: OutsourceInfoState

  init: () => void
  onDisposed: () => void
  loadNextPage: () => void
  refresh: () => void
  setSearchKeyword: (keyword: string) => void
  clearSearch: () => void
  unsub?: Unsubscribe
}

const createViewModel = (props: Props) => createStore<Store>((set, get) => ({
  logInfoStateList: props.logRepository.logInfoStateList,
  infoState: { item: null, isInitialized: false },

  init: () => {
    get().loadNextPage()
    const unsub = props.outsourceRepository.observe(props.id, item => {
      set({ infoState: { item, isInitialized: true } })
    })
    set({ unsub })
  },

  onDisposed: () => {
    get().unsub?.()
  },

  loadNextPage: async () => {
    await props.logRepository.loadNextPage()
    set({ logInfoStateList: props.logRepository.logInfoStateList })
  },

  refresh: () => {
    props.logRepository.reset()
    set({ logInfoStateList: props.logRepository.logInfoStateList })
    get().loadNextPage()
  },

  setSearchKeyword: (keyword) => {
    props.logRepository.setSearchKeyword(keyword)
    get().loadNextPage()
  },

  clearSearch: () => {
    props.logRepository.clearSearch()
    get().loadNextPage()
  }
}))

export const OutsourceLogListViewModel = createZustandContext<Store, Props>(createViewModel)