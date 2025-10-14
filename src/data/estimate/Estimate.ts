import {type DocumentSnapshot, type QueryDocumentSnapshot, Timestamp, serverTimestamp} from "firebase/firestore";
import {snapshotToData} from "../../ui/utils/utils.ts";
import {FirestorePath} from "../../constant/FirestorePath.ts";
import type {WorkPlan} from "./WorkPlan.ts";
import type {PlatformType} from "../common/PlatformType.ts";

export const estimateType = {
  COMMUNITY: "community",
  UTILITY: "utility",
  AI: "ai",
  SERVICE: "service",
  INCOMPANY: "incompany",
  BLUETOOTH: "bluetooth",
} as const;

export const estimateBudget = {
  LESS_100: "LESS_100",
  BET_100_300: "100_300",
  BET_300_500: "300_500",
  MORE_500: "MORE_500",
  ETC: "ETC"
} as const;
export const estimateState = {
  PENDING: 0,
  DRAFT: 1,
  SENT: 2,
  ADMIT: 3,
  WORKING: 4,
  DONE: 5,
  CANCEL: 6,
  REJECT: 7,
} as const;

export type EstimateType = typeof estimateType[keyof typeof estimateType];
export type EstimateBudget = typeof estimateBudget[keyof typeof estimateBudget];
export type EstimateState = typeof estimateState[keyof typeof estimateState];

export type Estimate = {
  id: string;
  createAt: Timestamp;
  updateAt: Timestamp;
  delete: boolean;
  identifier: string;
  expireAt: Timestamp;
  name: string;
  company: string | null;
  email: string;
  type: EstimateType,
  platform: PlatformType[],
  budget: EstimateBudget,
  description: string;
  state: EstimateState;
  summary: string;
  sigNote: string;
  plans: WorkPlan[];
  conditions: string[];
};

export function DocToEstimate(snapshot: QueryDocumentSnapshot | DocumentSnapshot): Estimate {
  const doc = snapshotToData(snapshot);

  return {
    id: doc.id,
    createAt: doc[FirestorePath.CREATE_AT],
    updateAt: doc[FirestorePath.UPDATE_AT],
    delete: doc[FirestorePath.DELETE],
    identifier: doc[FirestorePath.Estimate.IDENTIFIER],
    expireAt: doc[FirestorePath.Estimate.EXPIRE_AT],
    name: doc[FirestorePath.Estimate.NAME],
    company: doc[FirestorePath.Estimate.COMPANY],
    email: doc[FirestorePath.Estimate.EMAIL],
    type: doc[FirestorePath.Estimate.TYPE],
    platform: doc[FirestorePath.Estimate.PLATFORM],
    budget: doc[FirestorePath.Estimate.BUDGET],
    description: doc[FirestorePath.Estimate.DESCRIPTION],
    state: doc[FirestorePath.Estimate.STATE],
    summary: doc[FirestorePath.Estimate.SUMMARY],
    sigNote: doc[FirestorePath.Estimate.SIG_NOTE],
    plans: doc[FirestorePath.Estimate.PLANS],
    conditions: doc[FirestorePath.Estimate.CONDITIONS]
  };
}

export function EstimateToHashmap(item: Estimate, isUpdate: boolean = false) {
  const map = {
    [FirestorePath.UPDATE_AT]: serverTimestamp(),
    [FirestorePath.DELETE]: item.delete,
    [FirestorePath.Estimate.IDENTIFIER]: item.identifier,
    [FirestorePath.Estimate.EXPIRE_AT]: item.expireAt,
    [FirestorePath.Estimate.NAME]: item.name,
    [FirestorePath.Estimate.COMPANY]: item.company,
    [FirestorePath.Estimate.EMAIL]: item.email,
    [FirestorePath.Estimate.TYPE]: item.type,
    [FirestorePath.Estimate.PLATFORM]: item.platform,
    [FirestorePath.Estimate.BUDGET]: item.budget,
    [FirestorePath.Estimate.DESCRIPTION]: item.description,
    [FirestorePath.Estimate.STATE]: item.state,
    [FirestorePath.Estimate.SUMMARY]: item.summary,
    [FirestorePath.Estimate.SIG_NOTE]: item.sigNote,
    [FirestorePath.Estimate.PLANS]: item.plans,
    [FirestorePath.Estimate.CONDITIONS]: item.conditions,
  };

  if (!isUpdate) {
    map[FirestorePath.CREATE_AT] = serverTimestamp();
  }

  return map;
}