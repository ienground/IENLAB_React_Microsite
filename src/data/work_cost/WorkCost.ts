import type {DocumentReference, Timestamp} from "firebase/firestore";
import type {WorkCostCategory} from "./WorkCostCategory.ts";

export type WorkCost = {
  id: string;
  createAt: Timestamp;
  updateAt: Timestamp;
  delete: boolean;
  categoryRef: DocumentReference;
  category: WorkCostCategory | undefined;
  title: string;
  content: string;
  unit: string;
  price: number;
}