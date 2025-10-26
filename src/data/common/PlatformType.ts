import type {TFunction} from "i18next";

export const platformType = {
  ANDROID: 0,
  IOS: 1,
  WEB: 2
} as const;
export type PlatformType = typeof platformType[keyof typeof platformType];

export function PlatformTypeToString(t: TFunction, value: PlatformType | undefined): string {
  switch (value) {
    case platformType.ANDROID: return t("strings:android");
    case platformType.IOS: return t("strings:ios");
    case platformType.WEB: return t("strings:web");
    default: return "";
  }
}