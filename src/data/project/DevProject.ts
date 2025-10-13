import type {Timestamp} from "firebase/firestore";
import type {PlatformType} from "../common/PlatformType.ts";
import {useTranslation} from "react-i18next";

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

export function DevProjectCategoryToString(value: DevProjectCategory): string {
  const { t } = useTranslation();
  switch (value) {
    case devProjectCategory.MOBILE: return t("strings:dev_category.mobile");
    case devProjectCategory.WEB: return t("strings:dev_category.web");
    case devProjectCategory.CREATIVE_COMPUTING: return t("strings:dev_category.creative_computing");
    default: return "";
  }
}