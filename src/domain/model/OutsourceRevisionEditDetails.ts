import {Outsource} from "@/domain/model/Outsource.ts"
import {FileUploadItem} from "@ienlab/react-library"

export class OutsourceRevisionEditDetails {
  title: string = ""
  reason: string = ""
  amountDelta: number = 0
  dueDateDeltaDays: number = 0
  state: Outsource.RevisionRequest.State = Outsource.RevisionRequest.State.Default
  imageUrls: FileUploadItem[] = []

  isDirty: boolean = false

  constructor(partial: Partial<OutsourceRevisionEditDetails> = {}) {
    Object.assign(this, partial)
  }

  toItem(): Outsource.RevisionRequest {
    return new Outsource.RevisionRequest({
      title: this.title,
      reason: this.reason,
      amountDelta: this.amountDelta,
      dueDateDeltaDays: this.dueDateDeltaDays,
      state: this.state,
      imageUrls: this.imageUrls.map(item => item.url)
    })
  }

  static fromItem(item: Outsource.RevisionRequest): OutsourceRevisionEditDetails {
    return new OutsourceRevisionEditDetails({
      title: item.title,
      reason: item.reason,
      amountDelta: item.amountDelta,
      dueDateDeltaDays: item.dueDateDeltaDays,
      state: item.state,
      imageUrls: item.imageUrls.map(item => new FileUploadItem({ url: item }))
    })
  }
}