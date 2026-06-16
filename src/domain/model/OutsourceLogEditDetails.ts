import {Outsource} from "@/domain/model/Outsource.ts"
import dayjs, {type Dayjs} from "dayjs"
import {type DocumentReference, Timestamp} from "firebase/firestore"
import {FileUploadItem} from "@ienlab/react-library"

export class OutsourceLogEditDetails {
  deletedAt: Dayjs | null = null
  title: string = ""
  content: string = ""
  state: Outsource.WorkLog.State = Outsource.WorkLog.State.Default
  workDate: Dayjs = dayjs()
  durationMinutes: number = 0
  imageUrls: FileUploadItem[] = []

  isDirty: boolean = false

  constructor(partial: Partial<OutsourceLogEditDetails> = {}) {
    Object.assign(this, partial)
  }

  toItem(): Outsource.WorkLog {
    return new Outsource.WorkLog({
      deletedAt: this.deletedAt ? Timestamp.fromDate(this.deletedAt.toDate()) : null,
      title: this.title,
      content: this.content,
      state: this.state,
      workDate: Timestamp.fromDate(this.workDate.toDate()),
      durationMinutes: this.durationMinutes,
      imageUrls: this.imageUrls.map(item => item.url)
    })
  }

  static fromItem(item: Outsource.WorkLog): OutsourceLogEditDetails {
    return new OutsourceLogEditDetails({
      deletedAt: item.deletedAt ? dayjs(item.deletedAt.toDate()) : null,
      title: item.title,
      content: item.content,
      state: item.state,
      workDate: dayjs(item.workDate.toDate()),
      durationMinutes: item.durationMinutes,
      imageUrls: item.imageUrls.map(item => { return new FileUploadItem({ file: null, url: item }) }),
    })
  }
}
