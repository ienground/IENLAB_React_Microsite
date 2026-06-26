import {createZustandContext, type InfScrollStateList} from "@ienlab/react-library"
import type {Outsource} from "@/domain/model/Outsource.ts"
import {createStore} from "zustand"
import type {Unsubscribe} from "firebase/firestore"
import type {OutsourceInfoState} from "@/ui/client/outsource/detail/OutsourceDetailViewModel.ts"
import {container} from "@/di/container.ts"
import {OutsourceRepositoryImpl} from "@/data/outsource/OutsourceRepositoryImpl.ts"
import {OutsourceLogRepositoryFactory} from "@/data/outsource/OutsourceLogRepositoryImpl.ts"

type Props = {
  id: string
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

const outsourceRepository = container.get(OutsourceRepositoryImpl)
const logRepositoryFactory = container.get(OutsourceLogRepositoryFactory)

const createViewModel = (props: Props) => {
  const logRepository = logRepositoryFactory.create(props.id)

  return createStore<Store>((set, get) => ({
    logInfoStateList: logRepository.logInfoStateList,
    infoState: { item: null, isInitialized: false },

    init: () => {
      get().loadNextPage()
      const unsub = outsourceRepository.observe(props.id, item => {
        set({ infoState: { item, isInitialized: true } })
      })
      set({ unsub })
    },

    onDisposed: () => {
      get().unsub?.()
    },

    loadNextPage: async () => {
      await logRepository.loadNextPage()
      set({ logInfoStateList: logRepository.logInfoStateList })
    },

    refresh: () => {
      logRepository.reset()
      set({ logInfoStateList: logRepository.logInfoStateList })
      get().loadNextPage()
    },

    setSearchKeyword: (keyword) => {
      logRepository.setSearchKeyword(keyword)
      get().loadNextPage()
    },

    clearSearch: () => {
      logRepository.clearSearch()
      get().loadNextPage()
    }
  }))
}

export const OutsourceLogListViewModel = createZustandContext<Store, Props>(createViewModel)