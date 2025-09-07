import type {Timestamp} from "firebase/firestore";
import type {Estimate} from "../estimate/Estimate.ts";

export type Outsource = {
  id: string;
  createAt: Timestamp;
  updateAt: Timestamp;
  estimateId: string;
  estimate: Estimate | undefined;

}