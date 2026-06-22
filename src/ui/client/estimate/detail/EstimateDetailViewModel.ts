import {Estimate} from "@/domain/model/Estimate.ts"

export interface EstimateInfoState {
  item: Estimate | null
  isInitialized: boolean
}
