import {createStore} from "zustand"
import {createZustandContext, type Localized} from "@ienlab/react-library"
import type {OutsourceRepository} from "@/domain/repository/OutsourceRepository.ts"
import type {UserRepository} from "@/domain/repository/UserRepository.ts"
import {container} from "@/di/container.ts"
import {OutsourceRepositoryImpl} from "@/data/outsource/OutsourceRepositoryImpl.ts"
import {UserRepositoryImpl} from "@/data/user/UserRepositoryImpl.ts"
import {OutsourceLogRepositoryFactory} from "@/data/outsource/OutsourceLogRepositoryImpl.ts"
import {Outsource} from "@/domain/model/Outsource.ts"
import type {UserInfoState} from "@/ui/client/user/ClientUserViewModel.ts"

interface OutsourceInfoStateList {
  itemList: Outsource[]
  isInitialized: boolean
}

interface WorkLogEntryInfoStateList {
  itemList: WorkLogEntry[]
  isInitialized: boolean
}

export interface WorkLogEntry {
  outsourceId: string
  outsourceTitle: Localized<string>
  workLog: Outsource.WorkLog | null
}

type Props = {}

interface Store {
  userInfoState: UserInfoState
  recentOutsourceInfoStateList: OutsourceInfoStateList
  workLogEntryInfoStateList: WorkLogEntryInfoStateList

  init: () => void
  onDisposed: () => void
}

const outsourceRepository: OutsourceRepository = container.get(OutsourceRepositoryImpl)
const userRepository: UserRepository = container.get(UserRepositoryImpl)
const logRepositoryFactory = container.get(OutsourceLogRepositoryFactory)

const createViewModel = (props: Props) => createStore<Store>((set, get) => ({
  userInfoState: { item: null, isInitialized: false },
  recentOutsourceInfoStateList: {itemList: [], isInitialized: false},
  workLogEntryInfoStateList: {itemList: [], isInitialized: false},

  init: async () => {
    const user = await userRepository.get()
    set({ userInfoState: { item: user, isInitialized: true }})

    if (user?.companyRef) {
      const items = await outsourceRepository.getRecentItems(user.companyRef, 3)
      set({ recentOutsourceInfoStateList: { itemList: items, isInitialized: true }})

      const entries = await Promise.all(items.map(async item => {
        const logRepo = logRepositoryFactory.create(item.id)
        const logs = await logRepo.getLatestItems(1)
        return {
          outsourceId: item.id,
          outsourceTitle: item.title,
          workLog: logs[0] ?? null,
        } satisfies WorkLogEntry
      }))
      set({ workLogEntryInfoStateList: { itemList: entries, isInitialized: true }})
    } else {
      set({
        recentOutsourceInfoStateList: { itemList: [], isInitialized: true },
        workLogEntryInfoStateList: { itemList: [], isInitialized: true }
      })
    }
  },

  onDisposed: () => {}
}))

export const ClientHomeViewModel = createZustandContext<Store, Props>(createViewModel)
