import {createZustandContext, type InfScrollStateList} from "@ienlab/react-library"
import type {Outsource} from "@/domain/model/Outsource.ts"
import {createStore} from "zustand"
import type {OutsourceLogRepository} from "@/domain/repository/OutsourceLogRepository.ts"

type Props = {
  id: string
  logRepository: OutsourceLogRepository
}

interface Store {
  logInfoStateList: InfScrollStateList<Outsource.WorkLog>

  init: () => void
  onDisposed: () => void
  loadNextPage: () => void
  refresh: () => void
  setSearchKeyword: (keyword: string) => void
  clearSearch: () => void
}

const createViewModel = (props: Props) => createStore<Store>((set, get) => ({
  logInfoStateList: props.logRepository.logInfoStateList,

  init: () => {
    get().loadNextPage()
  },

  onDisposed: () => {},

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