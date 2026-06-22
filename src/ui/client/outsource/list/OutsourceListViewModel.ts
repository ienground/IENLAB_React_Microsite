import {createStore} from "zustand"
import {createZustandContext, type InfScrollStateList} from "@ienlab/react-library"
import type {DocumentReference} from "firebase/firestore"
import type {OutsourceRepository} from "@/domain/repository/OutsourceRepository.ts"
import type {UserRepository} from "@/domain/repository/UserRepository.ts"
import {Outsource} from "@/domain/model/Outsource.ts"

type Props = {
  outsourceRepository: OutsourceRepository
  userRepository: UserRepository
}

interface Store {
  outsourceInfoStateList: InfScrollStateList<Outsource>

  init: () => void
  onDisposed: () => void
  loadNextPage: () => void
  refresh: () => void
  setSearchKeyword: (keyword: string) => void
  clearSearch: () => void
  setCompanyFilter: (companyRef: DocumentReference | null) => void
  clearCompanyFilter: () => void
}

const createViewModel = (props: Props) => createStore<Store>((set, get) => ({
  outsourceInfoStateList: props.outsourceRepository.outsourceInfoStateList,

  init: async () => {
    const user = await props.userRepository.get()
    if (user?.companyRef) {
      props.outsourceRepository.setCompanyFilter(user.companyRef)
    }

    get().loadNextPage()
  },

  onDisposed: () => {},

  loadNextPage: async () => {
    console.log("loadNextPage")
    await props.outsourceRepository.loadNextPage()
    set({ outsourceInfoStateList: props.outsourceRepository.outsourceInfoStateList })
  },

  refresh: () => {
    props.outsourceRepository.reset()
    set({ outsourceInfoStateList: props.outsourceRepository.outsourceInfoStateList })
    get().loadNextPage()
  },

  setSearchKeyword: (keyword) => {
    props.outsourceRepository.setSearchKeyword(keyword)
    get().loadNextPage()
  },

  clearSearch: () => {
    props.outsourceRepository.clearSearch()
    get().loadNextPage()
  },

  setCompanyFilter: (companyRef) => {
    props.outsourceRepository.setCompanyFilter(companyRef)
    get().loadNextPage()
  },

  clearCompanyFilter: () => {
    props.outsourceRepository.clearCompanyFilter()
    get().loadNextPage()
  },
}))

export const OutsourceListViewModel = createZustandContext<Store, Props>(createViewModel)