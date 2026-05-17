import {Portfolio} from "@/domain/model/Portfolio.ts";
import {portfolioRepository} from "@/di/container.ts";
import type { PortfolioRepository } from "@/domain/repository/PortfolioRepository";
import {createStore} from "zustand";
import {createZustandContext} from "@ienlab/react-library";

export interface PortfolioInfoStateList {
  itemList: Portfolio[]
  isInitialized: boolean
}

export type HomeViewModelProps = {
  portfolioRepository: PortfolioRepository
}

interface HomeViewModelStore {
  portfolioInfoStateList: PortfolioInfoStateList

  init: () => void
}

const createHomeStore = ({ portfolioRepository }: HomeViewModelProps) => createStore<HomeViewModelStore>((set, get) => ({
  portfolioInfoStateList: { itemList: [], isInitialized: false },

  init: () => {
    portfolioRepository.getPrimaries(items => {
      console.log(items.map(item => JSON.stringify(item)))
      set({ portfolioInfoStateList: { itemList: items, isInitialized: true } })
    })
  }
}))

export const HomeViewModel = createZustandContext<HomeViewModelStore, HomeViewModelProps>(createHomeStore)