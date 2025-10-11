import type {Timestamp} from "firebase/firestore";
import type {WorkCostCategory} from "./WorkCostCategory.ts";

export type WorkCost = {
  id: string;
  createAt: Timestamp;
  updateAt: Timestamp;
  delete: boolean;
  categoryId: string;
  category: WorkCostCategory | undefined;
  title: string;
  content: string;
  unit: string;
  price: number;
}