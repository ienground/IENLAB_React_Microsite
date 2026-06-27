import {createStore} from "zustand"
import {createZustandContext, type InfScrollStateList} from "@ienlab/react-library"
import type {DocumentReference, Unsubscribe} from "firebase/firestore"
import type {OutsourceRepository} from "@/domain/repository/OutsourceRepository.ts"
import type {UserRepository} from "@/domain/repository/UserRepository.ts"
import {Outsource} from "@/domain/model/Outsource.ts"
import type {CompanyRepository} from "@/domain/repository/CompanyRepository.ts"
import type {Company} from "@/domain/model/Company.ts"
import {container} from "@/di/container.ts"
import {OutsourceRepositoryImpl} from "@/data/outsource/OutsourceRepositoryImpl.ts"
import {UserRepositoryImpl} from "@/data/user/UserRepositoryImpl.ts"
import {CompanyRepositoryImpl} from "@/data/company/CompanyRepositoryImpl.ts"

interface CompanyInfoState {
  item: Company | null
  isInitialized: boolean
}

type Props = {}

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

const outsourceRepository: OutsourceRepository = container.get(OutsourceRepositoryImpl)
const userRepository: UserRepository = container.get(UserRepositoryImpl)
const companyRepository: CompanyRepository = container.get(CompanyRepositoryImpl)

const createViewModel = (props: Props) => createStore<Store>((set, get) => ({
  outsourceInfoStateList: outsourceRepository.outsourceInfoStateList,
  companyInfoState: { item: null, isInitialized: false },

  init: async () => {
    const user = await userRepository.get()
    if (user?.companyRef) {
      outsourceRepository.setCompanyFilter(user.companyRef)

      const unsubCompany = companyRepository.observe(user.companyRef.id, item => {
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
    await outsourceRepository.loadNextPage()
    set({ outsourceInfoStateList: outsourceRepository.outsourceInfoStateList })
  },

  refresh: () => {
    outsourceRepository.reset()
    set({ outsourceInfoStateList: outsourceRepository.outsourceInfoStateList })
    get().loadNextPage()
  },

  setSearchKeyword: (keyword) => {
    outsourceRepository.setSearchKeyword(keyword)
    get().loadNextPage()
  },

  clearSearch: () => {
    outsourceRepository.clearSearch()
    get().loadNextPage()
  },

  setCompanyFilter: (companyRef) => {
    outsourceRepository.setCompanyFilter(companyRef)
    get().loadNextPage()
  },

  clearCompanyFilter: () => {
    outsourceRepository.clearCompanyFilter()
    get().loadNextPage()
  },
}))

export const OutsourceListViewModel = createZustandContext<Store, Props>(createViewModel)