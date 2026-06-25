import {Env} from "@/domain/model/Env.ts"
import type {DocumentReference, Unsubscribe} from "firebase/firestore"
import type {AgreementItemEditDetails} from "@/domain/model/AgreementItemEditDetails.ts"

export interface EnvRepository {

  getDataLength(): Promise<Env.DataLength | null>
  observeDataLength(callback: (item: Env.DataLength | null) => void, cache?: boolean): Unsubscribe

  observeAgreementItems(callback: (items: Env.Agreement.Item[]) => void, cache?: boolean): Unsubscribe
  observeAllAgreementItems(callback: (items: Env.Agreement.Item[]) => void, cache?: boolean): Unsubscribe
  createAgreementItem(details: AgreementItemEditDetails): Promise<DocumentReference>
  updateAgreementItem(id: string, details: AgreementItemEditDetails): Promise<void>
  deleteAgreementItem(id: string): Promise<void>
}