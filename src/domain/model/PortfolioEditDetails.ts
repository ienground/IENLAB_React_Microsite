import {Portfolio} from "@/domain/model/Portfolio.ts"
import dayjs, {type Dayjs} from "dayjs"
import {Timestamp} from "firebase/firestore"
import {FileUploadItem, type Localized} from "@ienlab/react-library"

export class PortfolioEditDetails {
  id: string = ""
  deletedAt: Dayjs | null = null
  isPrimary: boolean = Portfolio.IsPrimary.Default
  visibility: Portfolio.Visibility = Portfolio.Visibility.Default
  title: Localized<string> = { ko: "", en: "" }
  summary: Localized<string> = { ko: "", en: "" }
  role: Localized<string> = { ko: "", en: "" }
  logo: FileUploadItem = new FileUploadItem()
  thumbnail: Localized<FileUploadItem> = { ko: new FileUploadItem(), en: new FileUploadItem() }
  categories: Portfolio.Category[] = []
  platforms: Portfolio.Platform[] = []
  state: Portfolio.State = Portfolio.State.Default
  startAt: Dayjs | null = null
  endAt: Dayjs | null = null
  developer: Localized<string> = { ko: "", en: "" }
  githubLink: string | null = null
  webLink: string | null = null
  googlePlayLink: string | null = null
  appStoreLink: string | null = null
  imageUrls: Localized<FileUploadItem[]> = { ko: [], en: [] }

  isDirty: boolean = false

  constructor(partial: Partial<PortfolioEditDetails> = {}) {
    Object.assign(this, partial)
  }

  toItem(): Portfolio {
    return new Portfolio({
      id: this.id,
      deletedAt: this.deletedAt ? Timestamp.fromDate(this.deletedAt.toDate()) : null,
      isPrimary: this.isPrimary,
      visibility: this.visibility,
      title: this.title,
      summary: this.summary,
      role: this.role,
      logo: this.logo.url ?? "",
      thumbnail: { ko: this.thumbnail.ko.url ?? "", en: this.thumbnail.en.url ?? "" },
      categories: this.categories,
      platforms: this.platforms,
      state: this.state,
      startAt: this.startAt ? Timestamp.fromDate(this.startAt.toDate()) : Timestamp.now(),
      endAt: this.endAt ? Timestamp.fromDate(this.endAt.toDate()) : null,
      developer: this.developer,
      githubLink: this.githubLink ? this.githubLink : null,
      webLink: this.webLink ? this.webLink : null,
      googlePlayLink: this.googlePlayLink ? this.googlePlayLink : null,
      appStoreLink: this.appStoreLink ? this.appStoreLink : null,
      imageUrls: { ko: this.imageUrls.ko.map(item => item.url ?? ""), en: this.imageUrls.en.map(item => item.url ?? "") },
    })
  }

  static fromItem(item: Portfolio): PortfolioEditDetails {
    return new PortfolioEditDetails({
      id: item.id,
      deletedAt: item.deletedAt ? dayjs(item.deletedAt.toDate()) : null,
      isPrimary: item.isPrimary,
      visibility: item.visibility,
      title: item.title,
      summary: item.summary,
      role: item.role,
      logo: new FileUploadItem({ file: null, url: item.logo }),
      thumbnail: { ko: new FileUploadItem({ file: null, url: item.thumbnail.ko }), en: new FileUploadItem({ file: null, url: item.thumbnail.en }) },
      categories: item.categories,
      platforms: item.platforms,
      state: item.state,
      startAt: dayjs(item.startAt.toDate()),
      endAt: item.endAt ? dayjs(item.endAt.toDate()) : null,
      developer: item.developer,
      githubLink: item.githubLink,
      webLink: item.webLink,
      googlePlayLink: item.googlePlayLink,
      appStoreLink: item.appStoreLink,
      imageUrls: {
        ko: item.imageUrls.ko.map(item => { return new FileUploadItem({ file: null, url: item }) }),
        en: item.imageUrls.en.map(item => { return new FileUploadItem({ file: null, url: item }) }),
      },
    })
  }
}
