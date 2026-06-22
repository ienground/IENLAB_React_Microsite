import {createStore} from "zustand"
import {createZustandContext, type InfScrollStateList} from "@ienlab/react-library"
import type {DocumentReference, Unsubscribe} from "firebase/firestore"
import type {OutsourceRepository} from "@/domain/repository/OutsourceRepository.ts"
import type {UserRepository} from "@/domain/repository/UserRepository.ts"
import {Outsource} from "@/domain/model/Outsource.ts"
import type {CompanyRepository} from "@/domain/repository/CompanyRepository.ts"
import type {Company} from "@/domain/model/Company.ts"

interface CompanyInfoState {
  item: Company | null
  isInitialized: boolean
}

type Props = {
  outsourceRepository: OutsourceRepository
  companyRepository: CompanyRepository
  userRepository: UserRepository
}

interface Store {
  outsourceInfoStateList: InfScrollStateList<Outsource>
  companyInfoState: CompanyInfoState

  init: () => void
  onDisposed: () => void
  loadNextPage: () => void
  refresh: () => void
  setSearchKeyword: (keyword: string) => void
  clearSearch: () => void
  setCompanyFilter: (companyRef: DocumentReference | null) => void
  clearCompanyFilter: () => void
  unsubCompany?: Unsubscribe
}

const createViewModel = (props: Props) => createStore<Store>((set, get) => ({
  outsourceInfoStateList: props.outsourceRepository.outsourceInfoStateList,
  companyInfoState: { item: null, isInitialized: false },

  init: async () => {
    const user = await props.userRepository.get()
    if (user?.companyRef) {
      props.outsourceRepository.setCompanyFilter(user.companyRef)

      const unsubCompany = props.companyRepository.observe(user.companyRef.id, item => {
        set({ companyInfoState: { item, isInitialized: true } })
      })
      set({ unsubCompany })
    }

    get().loadNextPage()
  },

  onDisposed: () => {
    get().unsubCompany?.()
  },

  loadNextPage: async () => {
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