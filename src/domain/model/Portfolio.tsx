import { FirestorePath } from "@/constant/FirestorePath";
import {type BadgeColor, type FirestoreItem, type Localized, snapshotToData} from "@ienlab/react-library";
import {DocumentReference, DocumentSnapshot, FieldValue, QueryDocumentSnapshot, serverTimestamp, Timestamp } from "firebase/firestore";
import type {TFunction} from "i18next";
import {RiAppleFill, RiComputerFill, RiPagesFill} from "@remixicon/react"
import IcAndroid from "@/assets/icon/android.svg?react"
import IcArduino from "@/assets/icon/arduino.svg?react"

export class Portfolio implements FirestoreItem {
  id: string = ""
  ref: DocumentReference | null = null
  createAt: Timestamp = Timestamp.now()
  updateAt: Timestamp = Timestamp.now()
  deletedAt: Timestamp | null = null
  isPrimary: boolean = Portfolio.IsPrimary.Default
  visibility: Portfolio.Visibility = Portfolio.Visibility.Default
  title: Localized<string> = { ko: "", en: "" }
  summary: Localized<string> = { ko: "", en: "" }
  role: Localized<string> = { ko: "", en: "" }
  logo: string = ""
  thumbnail: Localized<string> = { ko: "", en: "" }
  categories: Portfolio.Category[] = []
  platforms: Portfolio.Platform[] = []
  state: Portfolio.State = Portfolio.State.Default
  startAt: Timestamp = Timestamp.now()
  endAt: Timestamp | null = null
  developer: Localized<string> = { ko: "", en: "" }
  githubLink: string | null = null
  webLink: string | null = null
  googlePlayLink: string | null = null
  appStoreLink: string | null = null
  imageUrls: Localized<string[]> = { ko: [], en: [] }

  constructor(partial: Partial<Portfolio> = {}) {
    Object.assign(this, partial)
  }

  toHashMap(isUpdate: boolean = false) {
    const map = {
      [FirestorePath.UPDATE_AT]: serverTimestamp(),
      [FirestorePath.DELETED_AT]: this.deletedAt,
      [FirestorePath.Portfolio.IS_PRIMARY]: this.isPrimary,
      [FirestorePath.Portfolio.VISIBILITY]: this.visibility,
      [FirestorePath.Portfolio.TITLE]: this.title,
      [FirestorePath.Portfolio.SUMMARY]: this.summary,
      [FirestorePath.Portfolio.ROLE]: this.role,
      [FirestorePath.Portfolio.LOGO]: this.logo,
      [FirestorePath.Portfolio.THUMBNAIL]: this.thumbnail,
      [FirestorePath.Portfolio.CATEGORIES]: this.categories,
      [FirestorePath.Portfolio.PLATFORMS]: this.platforms,
      [FirestorePath.Portfolio.STATE]: this.state,
      [FirestorePath.Portfolio.START_AT]: this.startAt,
      [FirestorePath.Portfolio.END_AT]: this.endAt,
      [FirestorePath.Portfolio.DEVELOPER]: this.developer,
      [FirestorePath.Portfolio.GITHUB_LINK]: this.githubLink,
      [FirestorePath.Portfolio.WEB_LINK]: this.webLink,
      [FirestorePath.Portfolio.GOOGLE_PLAY_LINK]: this.googlePlayLink,
      [FirestorePath.Portfolio.APP_STORE_LINK]: this.appStoreLink,
      [FirestorePath.Portfolio.IMAGE_URLS]: this.imageUrls
    };

    if (!isUpdate) {
      map[FirestorePath.CREATE_AT] = serverTimestamp()
    }

    return map;
  }

  static fromSnapshot(snapshot: QueryDocumentSnapshot | DocumentSnapshot): Portfolio {
    const doc = snapshotToData(snapshot)
    return new Portfolio({
      id: doc.id,
      ref: snapshot.ref,
      createAt: doc[FirestorePath.CREATE_AT],
      updateAt: doc[FirestorePath.UPDATE_AT],
      deletedAt: doc[FirestorePath.DELETED_AT],
      isPrimary: doc[FirestorePath.Portfolio.IS_PRIMARY],
      visibility: doc[FirestorePath.Portfolio.VISIBILITY],
      title: doc[FirestorePath.Portfolio.TITLE],
      summary: doc[FirestorePath.Portfolio.SUMMARY],
      role: doc[FirestorePath.Portfolio.ROLE],
      logo: doc[FirestorePath.Portfolio.LOGO],
      thumbnail: doc[FirestorePath.Portfolio.THUMBNAIL],
      categories: doc[FirestorePath.Portfolio.CATEGORIES],
      platforms: doc[FirestorePath.Portfolio.PLATFORMS],
      state: doc[FirestorePath.Portfolio.STATE],
      startAt: doc[FirestorePath.Portfolio.START_AT],
      endAt: doc[FirestorePath.Portfolio.END_AT],
      developer: doc[FirestorePath.Portfolio.DEVELOPER],
      githubLink: doc[FirestorePath.Portfolio.GITHUB_LINK],
      webLink: doc[FirestorePath.Portfolio.WEB_LINK],
      googlePlayLink: doc[FirestorePath.Portfolio.GOOGLE_PLAY_LINK],
      appStoreLink: doc[FirestorePath.Portfolio.APP_STORE_LINK],
      imageUrls: doc[FirestorePath.Portfolio.IMAGE_URLS]
    })
  }
}

export namespace Portfolio {
  export namespace IsPrimary {
    export const Default = false
    export function getLabel(t: TFunction, value: boolean) {
      return value ? t("strings:type.portfolio.is_primary.true.title") : t("strings:type.portfolio.is_primary.false.title")
    }
    export function getDescription(t: TFunction, value: boolean) {
      return value ? t("strings:type.portfolio.is_primary.true.desc") : t("strings:type.portfolio.is_primary.false.desc")
    }
  }

  export enum Visibility {
    DRAFT = 0, PUBLISHED = 1, ARCHIVED = 2
  }

  export namespace Visibility {
    export const Default = Visibility.DRAFT
    export const values = [
      Visibility.DRAFT, Visibility.PUBLISHED, Visibility.ARCHIVED
    ]
    export function getLabel(t: TFunction, value: Visibility) {
      const map = {
        [Visibility.DRAFT]: t("strings:type.portfolio.visibility.draft.title"),
        [Visibility.PUBLISHED]: t("strings:type.portfolio.visibility.published.title"),
        [Visibility.ARCHIVED]: t("strings:type.portfolio.visibility.archived.title"),
      };

      return map[value]
    }
    export function getDescription(t: TFunction, value: Visibility) {
      const map = {
        [Visibility.DRAFT]: t("strings:type.portfolio.visibility.draft.desc"),
        [Visibility.PUBLISHED]: t("strings:type.portfolio.visibility.published.desc"),
        [Visibility.ARCHIVED]: t("strings:type.portfolio.visibility.archived.desc"),
      };

      return map[value]
    }
    export function getBadgeColor(value: Visibility): BadgeColor {
      const map = {
        [Visibility.DRAFT]: "outline",
        [Visibility.PUBLISHED]: "default",
        [Visibility.ARCHIVED]: "secondary"
      }

      return map[value] as BadgeColor
    }
  }

  export enum State {
    WORKING = 0, LAUNCHED = 1, DONE = 2
  }

  export namespace State {
    export const Default = State.LAUNCHED
    export const values = [
      State.WORKING, State.LAUNCHED, State.DONE
    ]
    export function getLabel(t: TFunction, value: State) {
      const map = {
        [State.WORKING]: t("strings:type.portfolio.state.working.title"),
        [State.LAUNCHED]: t("strings:type.portfolio.state.launched.title"),
        [State.DONE]: t("strings:type.portfolio.state.done.title")
      };

      return map[value]
    }
    export function getDescription(t: TFunction, value: State) {
      const map = {
        [State.WORKING]: t("strings:type.portfolio.state.working.desc"),
        [State.LAUNCHED]: t("strings:type.portfolio.state.launched.desc"),
        [State.DONE]: t("strings:type.portfolio.state.done.desc")
      }

      return map[value]
    }
    export function getBadgeColor(value: State): BadgeColor {
      const map = {
        [State.WORKING]: "outline",
        [State.LAUNCHED]: "default",
        [State.DONE]: "secondary"
      }

      return map[value] as BadgeColor
    }
  }

  export enum Category {
    UTILITY = 0, CREATIVE_COMPUTING = 1, GAME = 2, PHYSICAL_COMPUTING = 3, SOCIAL = 4
  }

  export namespace Category {
    export const values = [
      Category.UTILITY, Category.CREATIVE_COMPUTING, Category.GAME, Category.PHYSICAL_COMPUTING, Category.SOCIAL
    ]
    export function getLabel(t: TFunction, value: Category) {
      const map = {
        [Category.UTILITY]: t("strings:type.portfolio.category.utility.title"),
        [Category.CREATIVE_COMPUTING]: t("strings:type.portfolio.category.creative_computing.title"),
        [Category.GAME]: t("strings:type.portfolio.category.game.title"),
        [Category.PHYSICAL_COMPUTING]: t("strings:type.portfolio.category.physical_computing.title"),
        [Category.SOCIAL]: t("strings:type.portfolio.category.social.title")
      }

      return map[value]
    }
    export function getDescription(t: TFunction, value: Category) {
      const map = {
        [Category.UTILITY]: t("strings:type.portfolio.category.utility.desc"),
        [Category.CREATIVE_COMPUTING]: t("strings:type.portfolio.category.creative_computing.desc"),
        [Category.GAME]: t("strings:type.portfolio.category.game.desc"),
        [Category.PHYSICAL_COMPUTING]: t("strings:type.portfolio.category.physical_computing.desc"),
        [Category.SOCIAL]: t("strings:type.portfolio.category.social.desc")
      }

      return map[value]
    }
    export function getBadgeColor(value: Category) {
      const map = {
        [Category.UTILITY]:
          "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300",
        [Category.CREATIVE_COMPUTING]:
          "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
        [Category.GAME]:
          "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
        [Category.PHYSICAL_COMPUTING]:
          "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-300",
        [Category.SOCIAL]:
          "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300",
      }

      return map[value]
    }
  }

  export enum Platform {
    ANDROID = 0, IOS = 1, WEB = 2, PC = 3, ARDUINO = 4
  }

  export namespace Platform {
    export const values = [
      Platform.ANDROID, Platform.IOS, Platform.WEB, Platform.PC, Platform.ARDUINO
    ]
    export function getLabel(t: TFunction, value: Platform) {
      const map = {
        [Platform.ANDROID]: t("strings:type.portfolio.platform.android.title"),
        [Platform.IOS]: t("strings:type.portfolio.platform.ios.title"),
        [Platform.WEB]: t("strings:type.portfolio.platform.web.title"),
        [Platform.PC]: t("strings:type.portfolio.platform.pc.title"),
        [Platform.ARDUINO]: t("strings:type.portfolio.platform.arduino.title"),
      }

      return map[value]
    }
    export function getDescription(t: TFunction, value: Platform) {
      const map = {
        [Platform.ANDROID]: t("strings:type.portfolio.platform.android.desc"),
        [Platform.IOS]: t("strings:type.portfolio.platform.ios.desc"),
        [Platform.WEB]: t("strings:type.portfolio.platform.web.desc"),
        [Platform.PC]: t("strings:type.portfolio.platform.pc.desc"),
        [Platform.ARDUINO]: t("strings:type.portfolio.platform.arduino.desc"),
      }

      return map[value]
    }
    export function getIcon(value: Platform, size: number = 16) {
      const map = {
        [Platform.ANDROID]: <IcAndroid style={{ width: size, height: size }} />,
        [Platform.IOS]: <RiAppleFill size={size} />,
        [Platform.WEB]: <RiPagesFill size={size} />,
        [Platform.PC]: <RiComputerFill size={size} />,
        [Platform.ARDUINO]: <IcArduino style={{ width: size, height: size }} />,
      }

      return map[value]
    }
    export function getBadgeColor(value: Platform) {
      const map = {
        [Platform.ANDROID]:
          "bg-[#34a853]/15 text-[#34a853] dark:bg-[#34a853]/20 dark:text-[#34a853]",
        [Platform.IOS]:
          "bg-black/10 text-black dark:bg-white/12 dark:text-white",
        [Platform.WEB]:
          "bg-[#60dcfc]/18 text-[#0b7fa0] dark:bg-[#60dcfc]/20 dark:text-[#60dcfc]",
        [Platform.PC]:
          "bg-[#0078d4]/15 text-[#0078d4] dark:bg-[#0078d4]/20 dark:text-[#4fb3ff]",
        [Platform.ARDUINO]:
          "bg-[#03979c]/15 text-[#03979c] dark:bg-[#03979c]/20 dark:text-[#39c7cb]",
      } as const

      return map[value]
    }
  }
}