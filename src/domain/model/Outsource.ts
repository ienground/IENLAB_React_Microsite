import {FirestorePath} from "@/constant/FirestorePath.ts"
import {
  type BadgeColor,
  type FirestoreItem,
  type Localized,
  snapshotToData,
  type StatusColor
} from "@ienlab/react-library"
import {
  type DocumentReference,
  type DocumentSnapshot,
  type QueryDocumentSnapshot,
  serverTimestamp,
  Timestamp
} from "firebase/firestore"
import {Estimate} from "@/domain/model/Estimate.ts"
import {Portfolio} from "./Portfolio.ts"
import type {TFunction} from "i18next"
import {Company} from "@/domain/model/Company.ts"
import {Env} from "@/domain/model/Env.ts"

export class Outsource implements FirestoreItem {
  id: string = ""
  ref: DocumentReference | null = null
  createAt: Timestamp = Timestamp.now()
  updateAt: Timestamp = Timestamp.now()
  deletedAt: Timestamp | null = null
  targetCompany: Company | null = null
  targetCompanyRef: DocumentReference | null = null
  title: Localized<string> = { ko: "", en: "" }
  state: Outsource.State = Outsource.State.Default
  phase: Outsource.Phase = Outsource.Phase.Default
  platforms: Portfolio.Platform[] = []
  estimate: Estimate | null = null
  estimateRef: DocumentReference | null = null

  quotedAt: Timestamp | null = null
  contractedAt: Timestamp | null = null
  startedAt: Timestamp | null = null
  dueAt: Timestamp | null = null
  completedAt: Timestamp | null = null
  waitingClientAt: Timestamp | null = null
  cancelledAt: Timestamp | null = null
  pausedAt: Timestamp | null = null

  workLog: number = 0
  revisionRequest: Env.DataLength.CollectionCount = {total: 0, today: 0, draft: 0, sent: 0, approved: 0, rejected: 0, applied: 0}
  infoRequest: Env.DataLength.CollectionCount = {total: 0, today: 0, draft: 0, sent: 0, received: 0, rejected: 0}

  constructor(partial: Partial<Outsource> = {}) {
    Object.assign(this, partial)
  }

  toHashMap(isUpdate: boolean = false) {
    const map = {
      [FirestorePath.UPDATE_AT]: serverTimestamp(),
      [FirestorePath.DELETED_AT]: this.deletedAt,
      [FirestorePath.Outsource.TARGET_COMPANY]: this.targetCompanyRef,
      [FirestorePath.Outsource.TITLE]: this.title,
      [FirestorePath.Outsource.STATE]: this.state,
      [FirestorePath.Outsource.PHASE]: this.phase,
      [FirestorePath.Outsource.PLATFORMS]: this.platforms,
      [FirestorePath.Outsource.ESTIMATE]: this.estimateRef,
      [FirestorePath.Outsource.QUOTED_AT]: this.quotedAt,
      [FirestorePath.Outsource.CONTRACTED_AT]: this.contractedAt,
      [FirestorePath.Outsource.STARTED_AT]: this.startedAt,
      [FirestorePath.Outsource.DUE_AT]: this.dueAt,
      [FirestorePath.Outsource.COMPLETED_AT]: this.completedAt,
      [FirestorePath.Outsource.CANCELLED_AT]: this.cancelledAt,
      [FirestorePath.Outsource.PAUSED_AT]: this.pausedAt,
      [FirestorePath.Outsource.WAITING_CLIENT_AT]: this.waitingClientAt
    }

    if (!isUpdate) {
      map[FirestorePath.CREATE_AT] = serverTimestamp()
    }

    return map
  }

  static fromSnapshot(snapshot: QueryDocumentSnapshot | DocumentSnapshot): Outsource {
    const doc = snapshotToData(snapshot)
    const group = (base: string) => doc?.[base] ?? {}
    const get = (base: string, field: string) => group(base)?.[field] ?? 0

    return new Outsource({
      id: doc.id,
      ref: snapshot.ref,
      createAt: doc[FirestorePath.CREATE_AT],
      updateAt: doc[FirestorePath.UPDATE_AT],
      deletedAt: doc[FirestorePath.DELETED_AT],
      targetCompanyRef: doc[FirestorePath.Outsource.TARGET_COMPANY],
      title: doc[FirestorePath.Outsource.TITLE],
      state: doc[FirestorePath.Outsource.STATE],
      phase: doc[FirestorePath.Outsource.PHASE],
      platforms: doc[FirestorePath.Outsource.PLATFORMS],
      estimateRef: doc[FirestorePath.Outsource.ESTIMATE],
      quotedAt: doc[FirestorePath.Outsource.QUOTED_AT],
      contractedAt: doc[FirestorePath.Outsource.CONTRACTED_AT],
      startedAt: doc[FirestorePath.Outsource.STARTED_AT],
      dueAt: doc[FirestorePath.Outsource.DUE_AT],
      completedAt: doc[FirestorePath.Outsource.COMPLETED_AT],
      cancelledAt: doc[FirestorePath.Outsource.CANCELLED_AT],
      pausedAt: doc[FirestorePath.Outsource.PAUSED_AT],
      waitingClientAt: doc[FirestorePath.Outsource.WAITING_CLIENT_AT],
      workLog: doc[FirestorePath.Outsource.WORK_LOG] ?? 0,
      revisionRequest: {
        total: get(
          FirestorePath.Outsource.RevisionRequestCount.BASE,
          FirestorePath.Outsource.RevisionRequestCount.TOTAL,
        ),
        today: 0,
        draft: get(
          FirestorePath.Outsource.RevisionRequestCount.BASE,
          FirestorePath.Outsource.RevisionRequestCount.DRAFT,
        ),
        sent: get(
          FirestorePath.Outsource.RevisionRequestCount.BASE,
          FirestorePath.Outsource.RevisionRequestCount.SENT,
        ),
        approved: get(
          FirestorePath.Outsource.RevisionRequestCount.BASE,
          FirestorePath.Outsource.RevisionRequestCount.APPROVED,
        ),
        rejected: get(
          FirestorePath.Outsource.RevisionRequestCount.BASE,
          FirestorePath.Outsource.RevisionRequestCount.REJECTED,
        ),
      },
      infoRequest: {
        total: get(
          FirestorePath.Outsource.InfoRequestCount.BASE,
          FirestorePath.Outsource.InfoRequestCount.TOTAL,
        ),
        today: 0,
        draft: get(
          FirestorePath.Outsource.InfoRequestCount.BASE,
          FirestorePath.Outsource.InfoRequestCount.DRAFT,
        ),
        sent: get(
          FirestorePath.Outsource.InfoRequestCount.BASE,
          FirestorePath.Outsource.InfoRequestCount.SENT,
        ),
        received: get(
          FirestorePath.Outsource.InfoRequestCount.BASE,
          FirestorePath.Outsource.InfoRequestCount.RECEIVED,
        ),
        rejected: get(
          FirestorePath.Outsource.InfoRequestCount.BASE,
          FirestorePath.Outsource.InfoRequestCount.REJECTED,
        ),
      },
    })
  }
}

export namespace Outsource {
  export enum Phase {
    QUOTING = 0,
    CONTRACT_PENDING = 1,
    IN_PROGRESS = 2,
    WAITING_CLIENT = 3,
    COMPLETED = 4,
  }

  export namespace Phase {
    export const Default = Phase.QUOTING
    export const values = [Phase.QUOTING, Phase.CONTRACT_PENDING, Phase.IN_PROGRESS, Phase.WAITING_CLIENT, Phase.COMPLETED]
    export function getLabel(t: TFunction, value: Phase) {
      const map = {
        [Phase.QUOTING]: t("types:outsource.phase.quoting.label"),
        [Phase.CONTRACT_PENDING]: t("types:outsource.phase.contract_pending.label"),
        [Phase.IN_PROGRESS]: t("types:outsource.phase.in_progress.label"),
        [Phase.WAITING_CLIENT]: t("types:outsource.phase.waiting_client.label"),
        [Phase.COMPLETED]: t("types:outsource.phase.completed.label"),
      }

      return map[value]
    }
    export function getBadgeColor(value: Phase) {
      const map = {
        [Outsource.Phase.QUOTING]:
          "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300",
        [Outsource.Phase.CONTRACT_PENDING]:
          "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
        [Outsource.Phase.IN_PROGRESS]:
          "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
        [Outsource.Phase.WAITING_CLIENT]:
          "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-300",
        [Outsource.Phase.COMPLETED]:
          "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300",
      }

      return map[value]
    }
  }

  export enum State {
    ACTIVE = 0,
    PAUSED = 4,
    CANCELLED = 6
  }

  export namespace State {
    export const Default = State.ACTIVE
    export const values = [State.ACTIVE, State.PAUSED, State.CANCELLED]
    export function getLabel(t: TFunction, value: State) {
      const map = {
        [State.ACTIVE]: t("types:outsource.state.active.label"),
        [State.PAUSED]: t("types:outsource.state.paused.label"),
        [State.CANCELLED]: t("types:outsource.state.cancelled.label"),
      }

      return map[value]
    }
    export function getDescription(t: TFunction, value: State) {
      const map = {
        [State.ACTIVE]: t("types:outsource.state.active.desc"),
        [State.PAUSED]: t("types:outsource.state.paused.desc"),
        [State.CANCELLED]: t("types:outsource.state.cancelled.desc"),
      }

      return map[value]
    }
    export function getBadgeColor(value: State) {
      const map = {
        [State.ACTIVE]: "default",
        [State.PAUSED]: "outline",
        [State.CANCELLED]: "destructive"
      }

      return map[value] as BadgeColor
    }
  }

  export class RevisionRequest implements FirestoreItem {
    id: string = ""
    ref: DocumentReference | null = null
    createAt: Timestamp = Timestamp.now()
    updateAt: Timestamp = Timestamp.now()
    deletedAt: Timestamp | null = null
    title: string = ""
    reason: string = ""
    imageUrls: string[] = []
    amountDelta: number = 0
    dueDateDeltaDays: number = 0
    state: RevisionRequest.State = RevisionRequest.State.Default

    sentAt: Timestamp | null = null
    approvedAt: Timestamp | null = null
    rejectedAt: Timestamp | null = null
    appliedAt: Timestamp | null = null

    constructor(partial: Partial<RevisionRequest> = {}) {
      Object.assign(this, partial)
    }

    toHashMap(isUpdate: boolean = false) {
      const map: Record<string, unknown> = {
        [FirestorePath.UPDATE_AT]: serverTimestamp(),
        [FirestorePath.DELETED_AT]: this.deletedAt,
        [FirestorePath.Outsource.RevisionRequest.TITLE]: this.title,
        [FirestorePath.Outsource.RevisionRequest.REASON]: this.reason,
        [FirestorePath.Outsource.RevisionRequest.AMOUNT_DELTA]: this.amountDelta,
        [FirestorePath.Outsource.RevisionRequest.DUE_DATE_DELTA_DAYS]: this.dueDateDeltaDays,
        [FirestorePath.Outsource.RevisionRequest.IMAGE_URLS]: this.imageUrls,
      }
      if (!isUpdate) {
        map[FirestorePath.Outsource.RevisionRequest.STATE] = this.state
        map[FirestorePath.CREATE_AT] = serverTimestamp()
      }

      return map
    }

    toClientHashMap(isUpdate: boolean = false) {
      const map: Record<string, unknown> = {
        [FirestorePath.UPDATE_AT]: serverTimestamp(),
        [FirestorePath.DELETED_AT]: this.deletedAt,
        [FirestorePath.Outsource.RevisionRequest.TITLE]: this.title,
        [FirestorePath.Outsource.RevisionRequest.REASON]: this.reason,
        [FirestorePath.Outsource.RevisionRequest.IMAGE_URLS]: this.imageUrls,
      }
      if (!isUpdate) {
        map[FirestorePath.Outsource.RevisionRequest.STATE] = this.state
        map[FirestorePath.CREATE_AT] = serverTimestamp()
        map[FirestorePath.Outsource.RevisionRequest.AMOUNT_DELTA] = 0
        map[FirestorePath.Outsource.RevisionRequest.DUE_DATE_DELTA_DAYS] = 0
      }

      return map
    }

    static fromSnapshot(snapshot: QueryDocumentSnapshot | DocumentSnapshot): RevisionRequest {
      const doc = snapshotToData(snapshot)
      return new RevisionRequest({
        id: doc.id,
        ref: snapshot.ref,
        createAt: doc[FirestorePath.CREATE_AT],
        updateAt: doc[FirestorePath.UPDATE_AT],
        deletedAt: doc[FirestorePath.DELETED_AT],
        title: doc[FirestorePath.Outsource.RevisionRequest.TITLE],
        reason: doc[FirestorePath.Outsource.RevisionRequest.REASON],
        amountDelta: doc[FirestorePath.Outsource.RevisionRequest.AMOUNT_DELTA],
        dueDateDeltaDays: doc[FirestorePath.Outsource.RevisionRequest.DUE_DATE_DELTA_DAYS],
        state: doc[FirestorePath.Outsource.RevisionRequest.STATE],
        imageUrls: doc[FirestorePath.Outsource.RevisionRequest.IMAGE_URLS] ?? [],
        sentAt: doc[FirestorePath.Outsource.RevisionRequest.SENT_AT],
        approvedAt: doc[FirestorePath.Outsource.RevisionRequest.APPROVED_AT],
        rejectedAt: doc[FirestorePath.Outsource.RevisionRequest.REJECTED_AT],
        appliedAt: doc[FirestorePath.Outsource.RevisionRequest.APPLIED_AT]
      })
    }
  }

  export namespace RevisionRequest {
    export enum State {
      DRAFT = 0, SENT = 1, APPROVED = 2, REJECTED = 3, APPLIED = 4
    }

    export namespace State {
      export const Default = State.DRAFT
      export const values = [State.DRAFT, State.SENT, State.APPROVED, State.REJECTED, State.APPLIED]
      export const valuesNoDraft = [State.SENT, State.APPROVED, State.REJECTED, State.APPLIED]
      export const valuesAfterSent = [State.APPROVED, State.REJECTED, State.APPLIED]
      export function getAdminLabel(t: TFunction, value: State) {
        const map = {
          [State.DRAFT]: t("types:outsource.revision.state.draft.label"),
          [State.SENT]: t("types:outsource.revision.state.sent.admin.label"),
          [State.APPROVED]: t("types:outsource.revision.state.approved.admin.label"),
          [State.REJECTED]: t("types:outsource.revision.state.rejected.admin.label"),
          [State.APPLIED]: t("types:outsource.revision.state.applied.label"),
        }

        return map[value]
      }
      export function getClientLabel(t: TFunction, value: State) {
        const map = {
          [State.DRAFT]: t("types:outsource.revision.state.draft.label"),
          [State.SENT]: t("types:outsource.revision.state.sent.client.label"),
          [State.APPROVED]: t("types:outsource.revision.state.approved.client.label"),
          [State.REJECTED]: t("types:outsource.revision.state.rejected.client.label"),
          [State.APPLIED]: t("types:outsource.revision.state.applied.label"),
        }

        return map[value]
      }
      export function getStatusColor(value: State) {
        const map = {
          [State.DRAFT]: "default",
          [State.SENT]: "info",
          [State.APPROVED]: "success",
          [State.REJECTED]: "error",
          [State.APPLIED]: "warning"
        }

        return map[value] as StatusColor
      }
      export function getChangeAt(value: State) {
        const map = {
          [State.DRAFT]: null,
          [State.SENT]: FirestorePath.Outsource.RevisionRequest.SENT_AT,
          [State.APPROVED]: FirestorePath.Outsource.RevisionRequest.APPROVED_AT,
          [State.REJECTED]: FirestorePath.Outsource.RevisionRequest.REJECTED_AT,
          [State.APPLIED]: FirestorePath.Outsource.RevisionRequest.APPLIED_AT
        }

        return map[value]
      }
    }
  }

  export class InfoRequest implements FirestoreItem {
    id: string = ""
    ref: DocumentReference | null = null
    createAt: Timestamp = Timestamp.now()
    updateAt: Timestamp = Timestamp.now()
    deletedAt: Timestamp | null = null
    expireAt: Timestamp = Timestamp.now()
    title: Localized<string> = { ko: "", en: "" }
    reason: Localized<string> = { ko: "", en: "" }
    type: InfoRequest.Type = InfoRequest.Type.Default
    state: InfoRequest.State = InfoRequest.State.Default
    textItems: InfoRequest.TextItem[] = []
    media: InfoRequest.Media | null = null

    constructor(partial: Partial<InfoRequest> = {}) {
      Object.assign(this, partial)
    }

    toHashMap(isUpdate: boolean = false) {
      const map: Record<string, unknown> = {
        [FirestorePath.UPDATE_AT]: serverTimestamp(),
        [FirestorePath.DELETED_AT]: this.deletedAt,
        [FirestorePath.Outsource.InfoRequest.EXPIRE_AT]: this.expireAt,
        [FirestorePath.Outsource.InfoRequest.TITLE]: this.title,
        [FirestorePath.Outsource.InfoRequest.REASON]: this.reason,
        [FirestorePath.Outsource.InfoRequest.TYPE]: this.type,
        [FirestorePath.Outsource.InfoRequest.STATE]: this.state,
        [FirestorePath.Outsource.InfoRequest.TEXT_ITEMS]: this.textItems.map(item => item.toHashMap()),
        [FirestorePath.Outsource.InfoRequest.MEDIA]: this.media?.toHashMap() ?? null,
      }

      if (!isUpdate) {
        map[FirestorePath.CREATE_AT] = serverTimestamp()
      }

      return map
    }

    toClientHashMap() {
      return {
        [FirestorePath.UPDATE_AT]: serverTimestamp(),
        [FirestorePath.Outsource.InfoRequest.TEXT_ITEMS]: this.textItems.map(item => item.toHashMap()),
        [FirestorePath.Outsource.InfoRequest.MEDIA]: this.media?.toHashMap() ?? null,
      }
    }

    static fromSnapshot(snapshot: QueryDocumentSnapshot | DocumentSnapshot): InfoRequest {
      const doc = snapshotToData(snapshot)

      return new InfoRequest({
        id: doc.id,
        ref: snapshot.ref,
        createAt: doc[FirestorePath.CREATE_AT],
        updateAt: doc[FirestorePath.UPDATE_AT],
        deletedAt: doc[FirestorePath.DELETED_AT],
        expireAt: doc[FirestorePath.Outsource.InfoRequest.EXPIRE_AT],
        title: doc[FirestorePath.Outsource.InfoRequest.TITLE],
        reason: doc[FirestorePath.Outsource.InfoRequest.REASON],
        type: doc[FirestorePath.Outsource.InfoRequest.TYPE],
        state: doc[FirestorePath.Outsource.InfoRequest.STATE],
        textItems: Array.isArray(doc[FirestorePath.Outsource.InfoRequest.TEXT_ITEMS])
          ? doc[FirestorePath.Outsource.InfoRequest.TEXT_ITEMS]
            .map((item: Record<string, any>) => InfoRequest.TextItem.fromMap(item))
            .filter((item: any): item is InfoRequest.TextItem => item !== null)
          : [],
        media: InfoRequest.Media.fromMap(doc[FirestorePath.Outsource.InfoRequest.MEDIA] ?? null),
      })
    }
  }

  export namespace InfoRequest {
    export enum State {
      DRAFT = 0, SENT = 1, RECEIVED = 2, REJECTED = 3
    }

    export namespace State {
      export const Default = State.DRAFT
      export const values = [State.DRAFT, State.SENT, State.RECEIVED, State.REJECTED]
      export function getAdminLabel(t: TFunction, value: State) {
        const map = {
          [State.DRAFT]: t("types:outsource.info_request.state.draft.label"),
          [State.SENT]: t("types:outsource.info_request.state.sent.admin.label"),
          [State.RECEIVED]: t("types:outsource.info_request.state.received.admin.label"),
          [State.REJECTED]: t("types:outsource.info_request.state.rejected.label"),
        }

        return map[value]
      }
      export function getClientLabel(t: TFunction, value: State) {
        const map = {
          [State.DRAFT]: t("types:outsource.info_request.state.draft.label"),
          [State.SENT]: t("types:outsource.info_request.state.sent.client.label"),
          [State.RECEIVED]: t("types:outsource.info_request.state.received.client.label"),
          [State.REJECTED]: t("types:outsource.info_request.state.rejected.label"),
        }

        return map[value]
      }
      export function getBadgeColor(value: State) {
        const map = {
          [State.DRAFT]: "outline",
          [State.SENT]: "secondary",
          [State.RECEIVED]: "default",
          [State.REJECTED]: "destructive",
        }

        return map[value] as BadgeColor
      }
    }

    export enum Type {
      TEXT = 0, MEDIA = 1
    }

    export namespace Type {
      export const Default = Type.TEXT
      export const values = [Type.TEXT, Type.MEDIA]
      export function getLabel(t: TFunction, value: Type) {
        const map = {
          [Type.TEXT]: t("types:outsource.info_request.type.text.label"),
          [Type.MEDIA]: t("types:outsource.info_request.type.media.label"),
        }

        return map[value]
      }
      export function getDescription(t: TFunction, value: Type) {
        const map = {
          [Type.TEXT]: t("types:outsource.info_request.type.text.desc"),
          [Type.MEDIA]: t("types:outsource.info_request.type.media.desc"),
        }

        return map[value]
      }
      export function getBadgeColor(value: Type) {
        const map = {
          [Type.TEXT]: "secondary",
          [Type.MEDIA]: "default"
        }

        return map[value] as BadgeColor
      }
    }

    export class TextItem {
      label: Localized<string> = { ko: "", en: "" }
      secure: boolean = false
      maxLength: number | null = TextItem.DefaultMaxLength
      value: string = ""

      constructor(partial: Partial<TextItem> = {}) {
        Object.assign(this, partial)
      }

      toHashMap() {
        return {
          [FirestorePath.Outsource.InfoRequest.TextItem.LABEL]: this.label,
          [FirestorePath.Outsource.InfoRequest.TextItem.SECURE]: this.secure,
          [FirestorePath.Outsource.InfoRequest.TextItem.MAX_LENGTH]: this.maxLength,
          [FirestorePath.Outsource.InfoRequest.TextItem.VALUE]: this.value,
        }
      }

      static fromMap(data?: Record<string, any> | null): TextItem | null {
        if (!data) return null

        return new TextItem({
          label: data[FirestorePath.Outsource.InfoRequest.TextItem.LABEL],
          secure: data[FirestorePath.Outsource.InfoRequest.TextItem.SECURE] ?? false,
          maxLength: data[FirestorePath.Outsource.InfoRequest.TextItem.MAX_LENGTH],
          value: data[FirestorePath.Outsource.InfoRequest.TextItem.VALUE] ?? "",
        })
      }
    }

    export namespace TextItem {
      export const DefaultMaxLength = 100
    }

    export class Media {
      maxCount: number = 10
      maxFileSize: number = 50
      aspectRatio: string | null = null
      sizeConstraint: string | null = null
      allowedType: Media.Type = Media.Type.Default
      files: Media.UploadedFile[] = []

      constructor(partial: Partial<Media>) {
        Object.assign(this, partial)
      }

      toHashMap() {
        return {
          [FirestorePath.Outsource.InfoRequest.Media.MAX_COUNT]: this.maxCount,
          [FirestorePath.Outsource.InfoRequest.Media.MAX_FILE_SIZE]: this.maxFileSize,
          [FirestorePath.Outsource.InfoRequest.Media.ASPECT_RATIO]: this.aspectRatio,
          [FirestorePath.Outsource.InfoRequest.Media.SIZE_CONSTRAINT]: this.sizeConstraint,
          [FirestorePath.Outsource.InfoRequest.Media.ALLOWED_TYPE]: this.allowedType,
          [FirestorePath.Outsource.InfoRequest.Media.FILES]: this.files.map(file => file.toHashMap()),
        }
      }

      static fromMap(data?: Record<string, any> | null): Media | null {
        if (!data) return null

        return new Media({
          maxCount: data[FirestorePath.Outsource.InfoRequest.Media.MAX_COUNT],
          maxFileSize: data[FirestorePath.Outsource.InfoRequest.Media.MAX_FILE_SIZE] ?? 50,
          aspectRatio: data[FirestorePath.Outsource.InfoRequest.Media.ASPECT_RATIO] ?? null,
          sizeConstraint: data[FirestorePath.Outsource.InfoRequest.Media.SIZE_CONSTRAINT] ?? null,
          allowedType: data[FirestorePath.Outsource.InfoRequest.Media.ALLOWED_TYPE],
          files: Array.isArray(data[FirestorePath.Outsource.InfoRequest.Media.FILES])
            ? data[FirestorePath.Outsource.InfoRequest.Media.FILES]
              .map((item: Record<string, any>) => Media.UploadedFile.fromMap(item))
              .filter((item: any): item is Media.UploadedFile => item !== null)
            : [],
        })
      }
    }

    export namespace Media {
      export enum Type {
        IMAGE = 0, DOC = 1
      }

      export namespace Type {
        export const Default = Type.IMAGE
        export const values = [Type.IMAGE, Type.DOC]
        export function getLabel(t: TFunction, value: Type) {
          const map = {
            [Type.IMAGE]: t("types:outsource.info_request.media.type.image.label"),
            [Type.DOC]: t("types:outsource.info_request.media.type.doc.label"),
          }

          return map[value]
        }
        export function getDescription(t: TFunction, value: Type) {
          const map = {
            [Type.IMAGE]: t("types:outsource.info_request.media.type.image.desc"),
            [Type.DOC]: t("types:outsource.info_request.media.type.doc.desc"),
          }

          return map[value]
        }
      }

      export class UploadedFile {
        path: string = ""
        name: string = ""
        contentType: string = ""
        size: number = 0
        downloadUrl: string = ""

        constructor(partial: Partial<UploadedFile>) {
          Object.assign(this, partial)
        }

        toHashMap() {
          return {
            [FirestorePath.Outsource.InfoRequest.Media.File.PATH]: this.path,
            [FirestorePath.Outsource.InfoRequest.Media.File.NAME]: this.name,
            [FirestorePath.Outsource.InfoRequest.Media.File.CONTENT_TYPE]: this.contentType,
            [FirestorePath.Outsource.InfoRequest.Media.File.SIZE]: this.size,
            [FirestorePath.Outsource.InfoRequest.Media.File.DOWNLOAD_URL]: this.downloadUrl,
          }
        }

        static fromMap(data?: Record<string, any> | null): UploadedFile | null {
          if (!data) return null

          return new UploadedFile({
            path: data[FirestorePath.Outsource.InfoRequest.Media.File.PATH] ?? "",
            name: data[FirestorePath.Outsource.InfoRequest.Media.File.NAME] ?? "",
            contentType: data[FirestorePath.Outsource.InfoRequest.Media.File.CONTENT_TYPE] ?? "",
            size: data[FirestorePath.Outsource.InfoRequest.Media.File.SIZE] ?? 0,
            downloadUrl: data[FirestorePath.Outsource.InfoRequest.Media.File.DOWNLOAD_URL] ?? "",
          })
        }
      }
    }
  }

  export class WorkLog implements FirestoreItem {
    id: string = ""
    ref: DocumentReference | null = null
    createAt: Timestamp = Timestamp.now()
    updateAt: Timestamp = Timestamp.now()
    deletedAt: Timestamp | null = null
    title: string = ""
    content: string = ""
    state: WorkLog.State = WorkLog.State.Default
    workDate: Timestamp = Timestamp.now()
    durationMinutes: number = 0
    imageUrls: string[] = []

    constructor(partial: Partial<WorkLog> = {}) {
      Object.assign(this, partial)
    }

    toHashMap(isUpdate: boolean = false) {
      const map: Record<string, unknown> = {
        [FirestorePath.UPDATE_AT]: serverTimestamp(),
        [FirestorePath.DELETED_AT]: this.deletedAt,
        [FirestorePath.Outsource.WorkLog.TITLE]: this.title,
        [FirestorePath.Outsource.WorkLog.CONTENT]: this.content,
        [FirestorePath.Outsource.WorkLog.STATE]: this.state,
        [FirestorePath.Outsource.WorkLog.WORK_DATE]: this.workDate,
        [FirestorePath.Outsource.WorkLog.DURATION_MINUTES]: this.durationMinutes,
        [FirestorePath.Outsource.WorkLog.IMAGE_URLS]: this.imageUrls,
      }

      if (!isUpdate) {
        map[FirestorePath.CREATE_AT] = serverTimestamp()
      }

      return map
    }

    static fromSnapshot(snapshot: QueryDocumentSnapshot | DocumentSnapshot): WorkLog {
      const doc = snapshotToData(snapshot)
      return new WorkLog({
        id: doc.id,
        ref: snapshot.ref,
        createAt: doc[FirestorePath.CREATE_AT],
        updateAt: doc[FirestorePath.UPDATE_AT],
        deletedAt: doc[FirestorePath.DELETED_AT],
        title: doc[FirestorePath.Outsource.WorkLog.TITLE],
        content: doc[FirestorePath.Outsource.WorkLog.CONTENT],
        state: doc[FirestorePath.Outsource.WorkLog.STATE],
        workDate: doc[FirestorePath.Outsource.WorkLog.WORK_DATE],
        durationMinutes: doc[FirestorePath.Outsource.WorkLog.DURATION_MINUTES] ?? 0,
        imageUrls: doc[FirestorePath.Outsource.WorkLog.IMAGE_URLS] ?? [],
      })
    }
  }

  export namespace WorkLog {
    export enum State {
      PLANNED = 0, IN_PROGRESS = 1, DONE = 2
    }

    export namespace State {
      export const Default = State.PLANNED
      export const values = [State.PLANNED, State.IN_PROGRESS, State.DONE]
      export function getLabel(t: TFunction, value: State) {
        const map = {
          [State.PLANNED]: t("types:outsource.work_log.state.planned.label"),
          [State.IN_PROGRESS]: t("types:outsource.work_log.state.in_progress.label"),
          [State.DONE]: t("types:outsource.work_log.state.done.label"),
        }

        return map[value]
      }
      export function getStatusColor(value: State) {
        const map = {
          [State.PLANNED]: "default",
          [State.IN_PROGRESS]: "info",
          [State.DONE]: "success"
        }

        return map[value] as StatusColor
      }
    }
  }
}