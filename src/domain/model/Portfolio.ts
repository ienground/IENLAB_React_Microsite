import { FirestorePath } from "@/constant/FirestorePath";
import {type FirestoreItem, type Localized, snapshotToData} from "@ienlab/react-library";
import {DocumentReference, DocumentSnapshot, FieldValue, QueryDocumentSnapshot, serverTimestamp, Timestamp } from "firebase/firestore";

export class Portfolio implements FirestoreItem {
  id: string = ""
  ref: DocumentReference | null = null
  createAt: Timestamp = Timestamp.now()
  updateAt: Timestamp = Timestamp.now()
  delete: boolean = false
  isPrimary: boolean = false
  title: Localized<string> = { ko: "", en: "" }
  summary: Localized<string> = { ko: "", en: "" }
  logo: string = ""
  thumbnail: Localized<string> = { ko: "", en: "" }
  categories: Portfolio.Category[] = []
  platforms: Portfolio.Platform[] = []
  state: Portfolio.State = Portfolio.State.Default
  startAt: Timestamp = Timestamp.now()
  endAt: Timestamp = Timestamp.now()
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
      [FirestorePath.DELETE]: this.delete,
      [FirestorePath.Portfolio.IS_PRIMARY]: this.isPrimary,
      [FirestorePath.Portfolio.TITLE]: this.title,
      [FirestorePath.Portfolio.SUMMARY]: this.summary,
      [FirestorePath.Portfolio.LOGO]: this.logo,
      [FirestorePath.Portfolio.THUMBNAIL]: this.thumbnail,
      [FirestorePath.Portfolio.CATEGORIES]: this.categories,
      [FirestorePath.Portfolio.PLATFORMS]: this.platforms,
      [FirestorePath.Portfolio.STATE]: this.state,
      [FirestorePath.Portfolio.START_AT]: this.startAt,
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
      delete: doc[FirestorePath.DELETE],
      isPrimary: doc[FirestorePath.Portfolio.IS_PRIMARY],
      title: doc[FirestorePath.Portfolio.TITLE],
      summary: doc[FirestorePath.Portfolio.SUMMARY],
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
  export enum State {
    WORKING, DONE
  }

  export namespace State {
    export const Default = State.DONE
  }

  export enum Category {
    UTILITY, CREATIVE_COMPUTING, GAME, PHYSICAL_COMPUTING, SOCIAL
  }

  export namespace Category {

  }

  export enum Platform {
    ANDROID, IOS, WEB, PC, ARDUINO
  }

  export enum Platform {

  }
}