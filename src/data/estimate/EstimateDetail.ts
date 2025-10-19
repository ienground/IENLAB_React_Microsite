import type {DocumentReference, Timestamp} from "firebase/firestore";

export type EstimateDetail = {
  id: string;
  createAt: Timestamp;
  updateAt: Timestamp;
  delete: boolean;
  parentRef: DocumentReference;
  categoryRef: DocumentReference;
  title: string;
  costId: string;
  price: number;
  amount: number;
};