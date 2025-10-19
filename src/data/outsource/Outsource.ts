import type {DocumentReference, Timestamp} from "firebase/firestore";
import type {Estimate} from "../estimate/Estimate.ts";

export type Outsource = {
  id: string;
  createAt: Timestamp;
  updateAt: Timestamp;
  delete: boolean;
  estimateRef: DocumentReference
  estimate: Estimate | undefined;
}