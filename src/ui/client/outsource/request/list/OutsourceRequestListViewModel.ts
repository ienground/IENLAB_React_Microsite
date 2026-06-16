import type {OutsourceRequestRepository} from "@/domain/repository/OutsourceRequestRepository.ts"
import {createZustandContext, type InfScrollStateList} from "@ienlab/react-library"
import type {Outsource} from "@/domain/model/Outsource.ts"
import {createStore} from "zustand"

type Props = {
  id: string
  outsourceRequestRepository: OutsourceRequestRepository
}

interface Store {
  requestInfoStateList: InfScrollStateList<Outsource.InfoRequest>

  init: () => void
  onDisposed: () => void
  loadNextPage: () => void
  refresh: () => void
  setSearchKeyword: (keyword: string) => void
  clearSearch: () => void
}

const createViewModel = (props: Props) => createStore<Store>((set, get) => ({
  requestInfoStateList: props.outsourceRequestRepository.requestInfoStateList,

  init: () => {
    get().loadNextPage()
  },

  onDisposed: () => {},

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