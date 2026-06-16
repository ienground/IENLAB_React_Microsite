import type {InfScrollStateList} from "@ienlab/react-library";
import type {DocumentReference, Unsubscribe} from "firebase/firestore";
import type {Company} from "@/domain/model/Company.ts"
import type {CompanyEditDetails} from "@/domain/model/CompanyEditDetails.ts"

export interface CompanyRepository {
  readonly companyInfoStateList: InfScrollStateList<Company>

  get(id: string): Promise<Company | null>
  observe(id: string, callback: (item: Company | null) => void, cache?: boolean): Unsubscribe

  create(item: CompanyEditDetails): Promise<DocumentReference>
  update(id: string, item: CompanyEditDetails): Promise<void>
  delete(id: string): Promise<void>

  setSearchKeyword(keyword: string): void
  clearSearch(): void

  loadNextPage(): Promise<void>
  reset(): void
}
