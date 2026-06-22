import type {OutsourceRepository} from "@/domain/repository/OutsourceRepository.ts"
import type {OutsourceLogRepository} from "@/domain/repository/OutsourceLogRepository.ts"
import type {OutsourceRequestRepository} from "@/domain/repository/OutsourceRequestRepository.ts"
import type {OutsourceRevisionRepository} from "@/domain/repository/OutsourceRevisionRepository.ts"
import {createStore} from "zustand"
import {createZustandContext} from "@ienlab/react-library"
import type {Outsource} from "@/domain/model/Outsource.ts"
import type {EstimateInfoState} from "@/ui/client/estimate/detail/EstimateDetailViewModel.ts"
import {Estimate} from "@/domain/model/Estimate.ts"
import type { EstimateRepository } from "@/domain/repository/EstimateRepository"

type Props = {
  id: string
  outsourceRepository: OutsourceRepository
  outsourceLogRepository: OutsourceLogRepository
  outsourceRequestRepository: OutsourceRequestRepository
  outsourceRevisionRepository: OutsourceRevisionRepository
  estimateRepository: EstimateRepository
}

interface Store {
  infoState: OutsourceInfoState
  estimateInfoState: EstimateInfoState
  workLogs: Outsource.WorkLog[]
  workLogsInitialized: boolean
  infoRequests: Outsource.InfoRequest[]
  infoRequestsInitialized: boolean
  revisionRequests: Outsource.RevisionRequest[]
  revisionRequestsInitialized: boolean

  init: () => void
  onDisposed: () => void
  unsubscribe?: () => void
  unsubEstimate?: () => void
}

export interface OutsourceInfoState {
  item: Outsource | null
  isInitialized: boolean
}

const createViewModel = (props: Props) => createStore<Store>((set, get) => ({
  infoState: { item: null, isInitialized: false },
  estimateInfoState: { item: null, isInitialized: false },
  workLogs: [],
  workLogsInitialized: false,
  infoRequests: [],
  infoRequestsInitialized: false,
  revisionRequests: [],
  revisionRequestsInitialized: false,

  init: () => {
    const { unsubscribe } = get()
    unsubscribe?.()

    const off = props.outsourceRepository.observe(props.id, async item => {
      get().unsubEstimate?.()

      if (item?.estimateRef?.id) {
        const offEstimate = props.estimateRepository.observe(item.estimateRef.id, async item => {
          set({ estimateInfoState: { item, isInitialized: true } })
        })

        set({ unsubEstimate: offEstimate })
      } else {
        set({
          estimateInfoState: { item: null, isInitialized: true },
        })
      }

      set({ infoState: { item, isInitialized: true } })
    })

    props.outsourceLogRepository.getLatestItems(3).then(items => {
      set({ workLogs: items, workLogsInitialized: true })
    })

    props.outsourceRequestRepository.getLatestRequests(3).then(items => {
      set({ infoRequests: items, infoRequestsInitialized: true })
    })

    props.outsourceRevisionRepository.getLatestItems(3).then(items => {
      set({ revisionRequests: items, revisionRequestsInitialized: true })
    })

    set({ unsubscribe: off })
  },

  onDisposed: () => {
    get().unsubscribe?.()
  }
}))

export const OutsourceDetailViewModel = createZustandContext<Store, Props>(createViewModel)
