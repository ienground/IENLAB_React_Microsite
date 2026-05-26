import {Portfolio} from "../../../domain/model/Portfolio.tsx";
import type { PortfolioRepository } from "@/domain/repository/PortfolioRepository";
import {createStore} from "zustand";
import {createZustandContext} from "@ienlab/react-library";

export interface PortfolioInfoStateList {
  itemList: Portfolio[]
  isInitialized: boolean
}

type HomeViewModelProps = {
  portfolioRepository: PortfolioRepository
}

interface HomeViewModelStore {
  portfolioInfoStateList: PortfolioInfoStateList

  init: () => void
}

const createHomeStore = (props: HomeViewModelProps) => createStore<HomeViewModelStore>((set, get) => ({
  portfolioInfoStateList: { itemList: [], isInitialized: false },

  init: () => {
    props.portfolioRepository.observePrimaries(items => {
      set({ portfolioInfoStateList: { itemList: items, isInitialized: true } })
    })
  }
}))

export const HomeViewModel = createZustandContext<HomeViewModelStore, HomeViewModelProps>(createHomeStore)