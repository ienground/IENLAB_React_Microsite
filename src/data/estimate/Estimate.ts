import {type DocumentSnapshot, type QueryDocumentSnapshot, Timestamp, serverTimestamp} from "firebase/firestore";
import {snapshotToData} from "../../ui/utils/utils.ts";
import {FirestorePath} from "../../constant/FirestorePath.ts";
import type {WorkPlan} from "./WorkPlan.ts";

export const estimateType = {
  COMMUNITY: "community",
  UTILITY: "utility",
  AI: "ai",
  SERVICE: "service",
  INCOMPANY: "incompany",
  BLUETOOTH: "bluetooth",
} as const;
export const estimatePlatform = {
  ANDROID: 0,
  IOS: 1,
  WEB: 2
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
export type EstimatePlatform = typeof estimatePlatform[keyof typeof estimatePlatform];
export type EstimateBudget = typeof estimateBudget[keyof typeof estimateBudget];
export type EstimateState = typeof estimateState[keyof typeof estimateState];

export type Estimate = {
  id: string;
  createAt: Timestamp;
  updateAt: Timestamp;
  delete: boolean;
  expireAt: Timestamp;
  name: string;
  company: string | null;
  email: string;
  type: EstimateType,
  platform: EstimatePlatform[],
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

  const createAt: Timestamp = doc[FirestorePath.CREATE_AT];
  const updateAt: Timestamp = doc[FirestorePath.UPDATE_AT];
  const isDeleted: boolean = doc[FirestorePath.DELETE];
  const expireAt: Timestamp = doc[FirestorePath.Estimate.EXPIRE_AT];
  const name: string = doc[FirestorePath.Estimate.NAME];
  const company: string | null = doc[FirestorePath.Estimate.COMPANY];
  const email: string = doc[FirestorePath.Estimate.EMAIL];
  const type: EstimateType = doc[FirestorePath.Estimate.TYPE];
  const platform: EstimatePlatform[] = doc[FirestorePath.Estimate.PLATFORM];
  const budget: EstimateBudget = doc[FirestorePath.Estimate.BUDGET];
  const description: string = doc[FirestorePath.Estimate.DESCRIPTION];
  const state: EstimateState = doc[FirestorePath.Estimate.STATE];
  const summary: string = doc[FirestorePath.Estimate.SUMMARY];
  const sigNote: string = doc[FirestorePath.Estimate.SIG_NOTE];
  const plans: WorkPlan[] = doc[FirestorePath.Estimate.PLANS];
  const conditions: string[] = doc[FirestorePath.Estimate.CONDITIONS];

  return {
    id: doc.id,
    createAt: createAt,
    updateAt: updateAt,
    delete: isDeleted,
    expireAt: expireAt,
    name: name,
    company: company,
    email: email,
    type: type,
    platform: platform,
    budget: budget,
    description: description,
    state: state,
    summary: summary,
    sigNote: sigNote,
    plans: plans,
    conditions: conditions
  };
}

export function EstimateToHashmap(item: Estimate, isUpdate: boolean = false) {
  const map = {
    [FirestorePath.UPDATE_AT]: serverTimestamp(),
    [FirestorePath.DELETE]: item.delete,
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