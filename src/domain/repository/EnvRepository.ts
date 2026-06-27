import {Env} from "@/domain/model/Env.ts"
import type {DocumentReference, Unsubscribe} from "firebase/firestore"
import type {AgreementItemEditDetails} from "@/domain/model/AgreementItemEditDetails.ts"
import type {InfScrollStateList} from "@ienlab/react-library"

export interface EnvRepository {
  readonly agmtHistoryInfoStateList: InfScrollStateList<Env.Agreement.Item>

  getDataLength(): Promise<Env.DataLength | null>
  observeDataLength(callback: (item: Env.DataLength | null) => void, cache?: boolean): Unsubscribe

  observeAgreement(id: string, callback: (item: Env.Agreement.Item | null) => void, cache?: boolean): Unsubscribe
  observeAgreementItems(callback: (items: Env.Agreement.Item[]) => void, cache?: boolean): Unsubscribe
  createAgreementItem(details: AgreementItemEditDetails): Promise<DocumentReference>
  updateAgreementItem(id: string, details: AgreementItemEditDetails): Promise<void>
  deleteAgreementItem(id: string): Promise<void>

  loadNextAgmtHistoryPage(): Promise<void>
  resetAgmtHistory(): void
}