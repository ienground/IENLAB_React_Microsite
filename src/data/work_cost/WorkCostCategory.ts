import type {Timestamp} from "firebase/firestore";

export type WorkCostCategory = {
  id: string;
  createAt: Timestamp;
  updateAt: Timestamp;
  label: string;
}