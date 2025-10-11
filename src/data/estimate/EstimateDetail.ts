import type {Timestamp} from "firebase/firestore";

export type EstimateDetail = {
  id: string;
  createAt: Timestamp;
  updateAt: Timestamp;
  delete: boolean;
  parentId: string;
  categoryId: string;
  title: string;
  costId: string;
  price: number;
  amount: number;
};