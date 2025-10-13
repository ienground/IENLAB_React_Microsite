export const platformType = {
  ANDROID: 0,
  IOS: 1,
  WEB: 2
} as const;
export type PlatformType = typeof platformType[keyof typeof platformType];