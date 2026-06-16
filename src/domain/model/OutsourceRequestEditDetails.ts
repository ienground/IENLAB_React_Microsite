import {Outsource} from "@/domain/model/Outsource.ts"
import dayjs, {type Dayjs} from "dayjs"
import {Timestamp} from "firebase/firestore"
import {FileUploadItem, type Localized} from "@ienlab/react-library"

export class OutsourceRequestEditDetails {
  deletedAt: Dayjs | null = null
  expireAt: Dayjs = dayjs().add(7, 'day')
  title: Localized<string> = { ko: "", en: "" }
  reason: Localized<string> = { ko: "", en: "" }
  type: Outsource.InfoRequest.Type = Outsource.InfoRequest.Type.Default
  state: Outsource.InfoRequest.State = Outsource.InfoRequest.State.Default
  textItems: Outsource.InfoRequest.TextItem[] = []
  media: OutsourceRequestEditDetails.Media = new OutsourceRequestEditDetails.Media({})

  isDirty: boolean = false

  constructor(partial: Partial<OutsourceRequestEditDetails> = {}) {
    Object.assign(this, partial)
  }

  toItem(): Outsource.InfoRequest {
    return new Outsource.InfoRequest({
      deletedAt: this.deletedAt ? Timestamp.fromDate(this.deletedAt.toDate()) : null,
      expireAt: Timestamp.fromDate(this.expireAt.toDate()),
      title: this.title,
      reason: this.reason,
      type: this.type,
      state: this.state,
      textItems: this.type === Outsource.InfoRequest.Type.TEXT ? this.textItems : [],
      media: this.type === Outsource.InfoRequest.Type.MEDIA ? this.media.toItem() : null
    })
  }

  static fromItem(item: Outsource.InfoRequest): OutsourceRequestEditDetails {
    return new OutsourceRequestEditDetails({
      deletedAt: item.deletedAt ? dayjs(item.deletedAt.toDate()) : null,
      expireAt: dayjs(item.expireAt.toDate()),
      title: item.title,
      reason: item.reason,
      type: item.type,
      state: item.state,
      textItems: item.textItems,
      media: item.media ?
        OutsourceRequestEditDetails.Media.fromItem(item.media) : new OutsourceRequestEditDetails.Media({})
    })
  }
}

export namespace OutsourceRequestEditDetails {
  export class Media {
    label: Localized<string> = { ko: "", en: "" }
    description: Localized<string> = { ko: "", en: ""  }
    maxCount: number = 10
    maxFileSize: number = 50
    aspectRatio: string | null = null
    sizeConstraint: string | null = null
    allowedType: Outsource.InfoRequest.Media.Type = Outsource.InfoRequest.Media.Type.Default
    files: Media.UploadedFile[] = []

    constructor(partial: Partial<Media>) {
      Object.assign(this, partial)
    }

    toItem(): Outsource.InfoRequest.Media {
      return new Outsource.InfoRequest.Media({
        label: this.label,
        description: this.description,
        maxCount: this.maxCount,
        maxFileSize: this.maxFileSize,
        aspectRatio: this.aspectRatio,
        sizeConstraint: this.sizeConstraint,
        allowedType: this.allowedType,
        files: this.files.map(item => item.toItem())
      })
    }

    static fromItem(item: Outsource.InfoRequest.Media) {
      return new Media({
        label: item.label,
        description: item.description,
        maxCount: item.maxCount,
        maxFileSize: item.maxFileSize,
        aspectRatio: item.aspectRatio,
        sizeConstraint: item.sizeConstraint,
        allowedType: item.allowedType,
        files: item.files.map(item => Media.UploadedFile.fromItem(item))
      })
    }
  }

  export namespace Media {
    export class UploadedFile {
      path: string = ""
      name: string = ""
      contentType: string = ""
      size: number = 0
      image: FileUploadItem = new FileUploadItem()

      constructor(partial: Partial<UploadedFile>) {
        Object.assign(this, partial)
      }

      toItem(): Outsource.InfoRequest.Media.UploadedFile {
        return new Outsource.InfoRequest.Media.UploadedFile({
          path: this.path,
          name: this.name,
          contentType: this.contentType,
          size: this.size,
          downloadUrl: this.image.url
        })
      }

      static fromItem(item: Outsource.InfoRequest.Media.UploadedFile) {
        return new UploadedFile({
          path: item.path,
          name: item.name,
          contentType: item.contentType,
          size: item.size,
          image: new FileUploadItem({ url: item.downloadUrl })
        })
      }
    }
  }
}
