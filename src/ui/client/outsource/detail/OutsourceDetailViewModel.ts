import type {OutsourceRepository} from "@/domain/repository/OutsourceRepository.ts"
import {createStore} from "zustand"
import {createZustandContext} from "@ienlab/react-library"
import type {Outsource} from "@/domain/model/Outsource.ts"
import type {EstimateInfoState} from "@/ui/client/estimate/detail/EstimateDetailViewModel.ts"
import type {EstimateRepository} from "@/domain/repository/EstimateRepository"
import {container} from "@/di/container.ts"
import {OutsourceRepositoryImpl} from "@/data/outsource/OutsourceRepositoryImpl.ts"
import {OutsourceLogRepositoryFactory} from "@/data/outsource/OutsourceLogRepositoryImpl.ts"
import {OutsourceRequestRepositoryFactory} from "@/data/outsource/OutsourceRequestRepositoryImpl.ts"
import {EstimateRepositoryImpl} from "@/data/estimate/EstimateRepositoryImpl.ts"
import {OutsourceRevisionRepositoryFactory} from "@/data/outsource/OutsourceRevisionRepositoryImpl.ts"

type Props = {
  id: string
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

const outsourceRepository: OutsourceRepository = container.get(OutsourceRepositoryImpl)
const logRepositoryFactory = container.get(OutsourceLogRepositoryFactory)
const requestRepositoryFactory = container.get(OutsourceRequestRepositoryFactory)
const revisionRepositoryFactory = container.get(OutsourceRevisionRepositoryFactory)
const estimateRepository: EstimateRepository = container.get(EstimateRepositoryImpl)

const createViewModel = (props: Props) => {
  const logRepository = logRepositoryFactory.create(props.id)
  const requestRepository = requestRepositoryFactory.create(props.id, false)
  const revisionRepository = revisionRepositoryFactory.create(props.id, false)

  return createStore<Store>((set, get) => ({
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

      const off = outsourceRepository.observe(props.id, async item => {
        get().unsubEstimate?.()

        if (item?.estimateRef?.id) {
          const offEstimate = estimateRepository.observe(item.estimateRef.id, async item => {
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

      logRepository.getLatestItems(3).then(items => {
        set({ workLogs: items, workLogsInitialized: true })
      })

      requestRepository.getLatestRequests(3).then(items => {
        set({ infoRequests: items, infoRequestsInitialized: true })
      })

      revisionRepository.getLatestItems(3).then(items => {
        set({ revisionRequests: items, revisionRequestsInitialized: true })
      })

      set({ unsubscribe: off })
    },

    onDisposed: () => {
      get().unsubscribe?.()
    }
  }))
}

export const OutsourceDetailViewModel = createZustandContext<Store, Props>(createViewModel)
