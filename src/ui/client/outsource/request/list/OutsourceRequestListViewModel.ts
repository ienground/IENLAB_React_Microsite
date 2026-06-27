import {createZustandContext, type InfScrollStateList} from "@ienlab/react-library"
import type {Outsource} from "@/domain/model/Outsource.ts"
import {createStore} from "zustand"
import type {OutsourceRepository} from "@/domain/repository/OutsourceRepository.ts"
import type {OutsourceInfoState} from "@/ui/client/outsource/detail/OutsourceDetailViewModel.ts"
import type {Unsubscribe} from "firebase/firestore"
import {container} from "@/di/container.ts"
import {OutsourceRepositoryImpl} from "@/data/outsource/OutsourceRepositoryImpl.ts"
import {OutsourceRequestRepositoryFactory} from "@/data/outsource/OutsourceRequestRepositoryImpl.ts"

type Props = {
  id: string
}

interface Store {
  requestInfoStateList: InfScrollStateList<Outsource.InfoRequest>
  infoState: OutsourceInfoState

  init: () => void
  onDisposed: () => void
  loadNextPage: () => void
  refresh: () => void
  setSearchKeyword: (keyword: string) => void
  clearSearch: () => void
  unsub?: Unsubscribe
}

const outsourceRepository: OutsourceRepository = container.get(OutsourceRepositoryImpl)
const requestRepositoryFactory = container.get(OutsourceRequestRepositoryFactory)

const createViewModel = (props: Props) => {
  const requestRepository = requestRepositoryFactory.create(props.id, false)

  return createStore<Store>((set, get) => ({
    requestInfoStateList: requestRepository.requestInfoStateList,
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
      await requestRepository.loadNextPage()
      set({ requestInfoStateList: requestRepository.requestInfoStateList })
    },

    refresh: () => {
      requestRepository.reset()
      set({ requestInfoStateList: requestRepository.requestInfoStateList })
      get().loadNextPage()
    },

    setSearchKeyword: (keyword) => {
      requestRepository.setSearchKeyword(keyword)
      get().loadNextPage()
    },

    clearSearch: () => {
      requestRepository.clearSearch()
      get().loadNextPage()
    }
  }))
}

export const OutsourceRequestListViewModel = createZustandContext<Store, Props>(createViewModel)