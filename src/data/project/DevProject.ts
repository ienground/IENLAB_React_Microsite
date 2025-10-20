import {type DocumentSnapshot, type QueryDocumentSnapshot, serverTimestamp, type Timestamp} from "firebase/firestore";
import type {PlatformType} from "../common/PlatformType.ts";
import {snapshotToData} from "../../ui/utils/utils.ts";
import {FirestorePath} from "../../constant/FirestorePath.ts";
import type {TFunction} from "i18next";

export const devProjectState = {
  WORKING: 0,
  DONE: 1
} as const;
export const devProjectCategory = {
  MOBILE: 0,
  WEB: 1,
  CREATIVE_COMPUTING: 2,
}

export type DevProjectState = typeof devProjectState[keyof typeof devProjectState];
export type DevProjectCategory = typeof devProjectCategory[keyof typeof devProjectCategory];

export type DevProject = {
  id: string;
  createAt: Timestamp;
  updateAt: Timestamp;
  delete: boolean;
  categories: DevProjectCategory[];
  isPrimary: boolean;
  thumbnail: string;
  logo: string;
  title: string;
  summary: string;
  state: DevProjectState;
  startAt: Timestamp;
  endAt: Timestamp;
  developer: string;
  github: string | null;
  link: string | null;
  googlePlay: string | null;
  appStore: string | null;
  imageUrls: string[];
  functions: string[];
  techs: string[];
  platform: PlatformType[];
}

export function DevProjectCategoryToString(t: TFunction, value: DevProjectCategory | undefined): string {
  switch (value) {
    case devProjectCategory.MOBILE: return t("strings:mobile");
    case devProjectCategory.WEB: return t("strings:web");
    case devProjectCategory.CREATIVE_COMPUTING: return t("strings:creative_computing");
    default: return "";
  }
}

export function DevProjectStateToString(t: TFunction, value: DevProjectState | undefined): string {
  switch (value) {
    case devProjectState.WORKING: return t("strings:state_working");
    case devProjectState.DONE: return t("strings:state_done");
    default: return "";
  }
}

export function DevProjectStateToHeroColor(value: DevProjectState | undefined):
  "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined {
  switch (value) {
    case devProjectState.WORKING: return "primary";
    case devProjectState.DONE: return "success";
    default: return "danger";
  }
}

export function DevProjectStateToColor(value: DevProjectState | undefined): string{
  switch (value) {
    case devProjectState.WORKING: return "hsl(var(--heroui-primary) / 1)";
    case devProjectState.DONE: return "hsl(var(--heroui-success) / 1)";
    default: return "danger";
  }
}

export function DocToDevProject(snapshot: QueryDocumentSnapshot | DocumentSnapshot): DevProject {
  const doc = snapshotToData(snapshot);
  return {
    id: doc.id,
    createAt: doc[FirestorePath.CREATE_AT],
    updateAt: doc[FirestorePath.UPDATE_AT],
    delete: doc[FirestorePath.DELETE],
    categories: doc[FirestorePath.DevProject.CATEGORIES],
    isPrimary: doc[FirestorePath.DevProject.IS_PRIMARY],
    thumbnail: doc[FirestorePath.DevProject.THUMBNAIL],
    logo: doc[FirestorePath.DevProject.LOGO],
    title: doc[FirestorePath.DevProject.TITLE],
    summary: doc[FirestorePath.DevProject.SUMMARY],
    state: doc[FirestorePath.DevProject.STATE],
    startAt: doc[FirestorePath.DevProject.START_AT],
    endAt: doc[FirestorePath.DevProject.END_AT],
    developer: doc[FirestorePath.DevProject.DEVELOPER],
    github: doc[FirestorePath.DevProject.GITHUB],
    link: doc[FirestorePath.DevProject.LINK],
    googlePlay: doc[FirestorePath.DevProject.GOOGLE_PLAY],
    appStore: doc[FirestorePath.DevProject.APP_STORE],
    imageUrls: doc[FirestorePath.DevProject.IMAGE_URLS],
    functions: doc[FirestorePath.DevProject.FUNCTIONS],
    techs: doc[FirestorePath.DevProject.TECHS],
    platform: doc[FirestorePath.DevProject.PLATFORM]
  }
}

export function DevProjectToHashMap(item: DevProject, isUpdate: boolean = false) {
  const map = {
    [FirestorePath.UPDATE_AT]: serverTimestamp(),
    [FirestorePath.DELETE]: item.delete,
    [FirestorePath.DevProject.CATEGORIES]: item.categories,
    [FirestorePath.DevProject.IS_PRIMARY]: item.isPrimary,
    [FirestorePath.DevProject.THUMBNAIL]: item.thumbnail,
    [FirestorePath.DevProject.LOGO]: item.logo,
    [FirestorePath.DevProject.TITLE]: item.title,
    [FirestorePath.DevProject.SUMMARY]: item.summary,
    [FirestorePath.DevProject.STATE]: item.state,
    [FirestorePath.DevProject.START_AT]: item.startAt,
    [FirestorePath.DevProject.END_AT]: item.endAt,
    [FirestorePath.DevProject.DEVELOPER]: item.developer,
    [FirestorePath.DevProject.GITHUB]: item.github,
    [FirestorePath.DevProject.LINK]: item.link,
    [FirestorePath.DevProject.GOOGLE_PLAY]: item.googlePlay,
    [FirestorePath.DevProject.APP_STORE]: item.appStore,
    [FirestorePath.DevProject.IMAGE_URLS]: item.imageUrls,
    [FirestorePath.DevProject.FUNCTIONS]: item.functions,
    [FirestorePath.DevProject.TECHS]: item.techs,
    [FirestorePath.DevProject.PLATFORM]: item.platform,
  };

  if (!isUpdate) {
    map[FirestorePath.CREATE_AT] = serverTimestamp();
  }

  return map;
}