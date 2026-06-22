import type {OutsourceRequestRepository} from "@/domain/repository/OutsourceRequestRepository.ts"
import {createZustandContext, type InfScrollStateList} from "@ienlab/react-library"
import type {Outsource} from "@/domain/model/Outsource.ts"
import {createStore} from "zustand"
import type {OutsourceRepository} from "@/domain/repository/OutsourceRepository.ts"
import type {OutsourceInfoState} from "@/ui/client/outsource/detail/OutsourceDetailViewModel.ts"
import type {Unsubscribe} from "firebase/firestore"

type Props = {
  id: string
  outsourceRepository: OutsourceRepository
  outsourceRequestRepository: OutsourceRequestRepository
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

const createViewModel = (props: Props) => createStore<Store>((set, get) => ({
  requestInfoStateList: props.outsourceRequestRepository.requestInfoStateList,
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
    await props.outsourceRequestRepository.loadNextPage()
    set({ requestInfoStateList: props.outsourceRequestRepository.requestInfoStateList })
  },

  refresh: () => {
    props.outsourceRequestRepository.reset()
    set({ requestInfoStateList: props.outsourceRequestRepository.requestInfoStateList })
    get().loadNextPage()
  },

  setSearchKeyword: (keyword) => {
    props.outsourceRequestRepository.setSearchKeyword(keyword)
    get().loadNextPage()
  },

  clearSearch: () => {
    props.outsourceRequestRepository.clearSearch()
    get().loadNextPage()
  }
}))

export const OutsourceRequestListViewModel = createZustandContext<Store, Props>(createViewModel)