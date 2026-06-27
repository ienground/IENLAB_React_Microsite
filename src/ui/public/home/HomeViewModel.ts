import {Portfolio} from "@/domain/model/Portfolio.ts"
import type { PortfolioRepository } from "@/domain/repository/PortfolioRepository"
import {createStore} from "zustand"
import {createZustandContext} from "@ienlab/react-library"
import {container} from "@/di/container.ts"
import {PortfolioRepositoryImpl} from "@/data/portfolio/PortfolioRepositoryImpl.ts"

export interface PortfolioInfoStateList {
  itemList: Portfolio[]
  isInitialized: boolean
}

type HomeViewModelProps = {}

interface HomeViewModelStore {
  portfolioInfoStateList: PortfolioInfoStateList

  init: () => void
}

const portfolioRepository: PortfolioRepository = container.get(PortfolioRepositoryImpl)

const createHomeStore = (props: HomeViewModelProps) => createStore<HomeViewModelStore>((set, get) => ({
  portfolioInfoStateList: { itemList: [], isInitialized: false },

  init: () => {
    portfolioRepository.observePrimaries(items => {
      set({ portfolioInfoStateList: { itemList: items, isInitialized: true } })
    })
  }
}))

export const HomeViewModel = createZustandContext<HomeViewModelStore, HomeViewModelProps>(createHomeStore)