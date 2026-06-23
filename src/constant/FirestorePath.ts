export const FirestorePath = {
  USER: "user",
  ESTIMATE: "estimate",
  PRICE: "price",
  OUTSOURCE: "outsource",
  NOTICE: "notice",
  NOTICE_CATEGORY: "noticeCategory",
  PORTFOLIO: "portfolio",
  COMPANY: "company",
  OTP: "otp",
  ENV: "env",

  CREATE_AT: "createAt",
  UPDATE_AT: "updateAt",
  DELETED_AT: "deletedAt",

  Env: {
    DATA_LENGTH: "dataLength",
    AGREEMENT: "agreement",

    Agreement: {
      /** Timestamp | null */
      REQUIRED_UPDATE_AT: "requiredUpdateAt",
      /** Timestamp | null */
      OPTIONAL_UPDATE_AT: "optionalUpdateAt",

      /** Collection */
      REQUIRED: "required",
      /** Collection */
      OPTIONAL: "optional",

      Items: {
        /** Map<Locale, string> */
        CONTENT: "content"
      }
    },
    DataLength: {
      /** number */
      TOTAL: "total",
      /** number */
      TODAY: "today",

      /** number */
      PENDING: "pending",
      /** number */
      ACTIVE: "active",
      /** number */
      SUSPENDED: "suspended",
      /** number */
      ENDED: "ended",
      /** number */
      ADMITTED: "admitted",
      /** number */
      DRAFT: "draft",
      /** number */
      SENT: "sent",
      /** number */
      ACCEPTED: "accepted",
      /** number */
      REJECTED: "rejected",
      /** number */
      PAUSED: "paused",
      /** number */
      CANCELLED: "cancelled"
    }
  },

  User: {
    /** Timestamp */
    VISIT_AT: "visitAt",
    /** string */
    NAME: "name",
    /** string, url */
    PROFILE_URL: "profileUrl",
    /** DocumentReference */
    COMPANY: "company",
    /** DocumentReference */
    TEMP_COMPANY: "tempCompany",
    /** number */
    LEVEL: "level",
    /** number */
    STATE: "state",
    /** string */
    PHONE: "phone",
    /** string (조회용 사본, Firebase Auth가 SOURCE) */
    EMAIL: "email",
    /** Timestamp | null */
    AGREED_REQUIRED_AT: "agreedRequiredAt",
    /** Timestamp | null */
    AGREED_OPTIONAL_AT: "agreedOptionalAt"
  },

  Estimate: {
    /** Timestamp */
    EXPIRE_AT: "expireAt",
    /** Timestamp */
    ESTIMATE_AT: "estimateAt",
    /** string */
    TITLE: "title",
    /** string */
    MEMO: "memo",
    /** number */
    BUDGET: "budget",
    /** DocumentReference | null */
    COMPANY: "company",
    /** number[] */
    PLATFORMS: "platforms",
    /** number */
    STATE: "state",
    /** Map<{string, number}>[] */
    PLANS: "plans",
    /** Collection */
    ITEMS: "items",
    /** number */
    TOTAL_AMOUNT: "totalAmount",

    Item: {
      /** string */
      TITLE: "title",
      /** string */
      DESCRIPTION: "description",
      /** number */
      UNIT_PRICE: "unitPrice",
      /** number */
      AMOUNT: "amount",
      /** number */
      SORT_ORDER: "sortOrder",
      /** DocumentReference */
      PRICE_CONTENT: "priceContent"
    }
  },

  Price: {
    CATEGORY: "category",
    CONTENT: "content",

    /** Collection */
    ITEMS: "items",

    Category: {
      /** Record<Locale, string> */
      NAME: "name",
      /** number */
      SORT_ORDER: "sortOrder",
      /** boolean */
      IS_ACTIVE: "isActive"
    },

    Content: {
      /** DocumentReference | null */
      CATEGORY: "category",
      /** Record<Locale, string> */
      TITLE: "title",
      /** Record<Locale, string> */
      CONTENT: "content",
      /** number */
      UNIT_PRICE: "unitPrice",
      /** number */
      SORT_ORDER: "sortOrder",
      /** boolean */
      IS_ACTIVE: "isActive"
    }
  },

  Notice: {
    CATEGORY: "category", // string, id
    TITLE: "title", // string
    CONTENT: "content", // string
    IMAGE_URLS: "imageUrls", // string[]
    FIXED: "fixed", // boolean

    Category: {
      LABEL_KOR: "labelKor", // string
      LABEL_ENG: "labelEng", // String
    }
  },

  Portfolio: {
    /** boolean */
    IS_PRIMARY: "isPrimary",
    /** number */
    VISIBILITY: "visibility",
    /** Record<Locale, string> */
    TITLE: "title",
    /** Record<Locale, string> */
    SUMMARY: "summary",
    /** Record<Locale, string> */
    ROLE: "role",
    /** string */
    LOGO: "logo",
    /** Record<Locale, string> */
    THUMBNAIL: "thumbnail",
    /** number[] */
    CATEGORIES: "categories",
    /** number[] */
    PLATFORMS: "platforms",
    /** number */
    STATE: "state",
    /** Timestamp */
    START_AT: "startAt",
    /** Timestamp */
    END_AT: "endAt",
    /** Record<Locale, string> */
    DEVELOPER: "developer",
    /** string */
    GITHUB_LINK: "githubLink",
    /** string */
    WEB_LINK: "webLink",
    /** string */
    GOOGLE_PLAY_LINK: "googlePlayLink",
    /** string */
    APP_STORE_LINK: "appStoreLink",
    /** Record<Locale, string[]> */
    IMAGE_URLS: "imageUrls",
  },

  Company: {
    /** Record<Locale, string> */
    NAME: "name",
    /** number */
    STATE: "state",
    /** number */
    ESTIMATE: "estimate",
    /** number */
    OUTSOURCE: "outsource",
  },

  Outsource: {
    TARGET_COMPANY: "targetCompany",
    /** Record<Locale, string> */
    TITLE: "title",
    /** number */
    STATE: "state",
    /** number */
    PHASE: "phase",
    /** number[] */
    PLATFORMS: "platforms",
    /** DocumentReference */
    ESTIMATE: "estimate",
    /** Timestamp | null */
    QUOTED_AT: "quotedAt",
    /** Timestamp | null */
    CONTRACTED_AT: "contractedAt",
    /** Timestamp | null */
    STARTED_AT: "startedAt",
    /** Timestamp | null */
    DUE_AT: "dueAt",
    /** Timestamp | null */
    COMPLETED_AT: "completedAt",
    /** Timestamp | null */
    CANCELLED_AT: "cancelledAt",
    /** Timestamp | null */
    PAUSED_AT: "pausedAt",
    /** Timestamp | null */
    WAITING_CLIENT_AT: "waitingClientAt",

    /** Collection */
    REVISION_REQUESTS: "revisionRequests",
    RevisionRequest: {
      /** string */
      TITLE: "title",
      /** string */
      REASON: "reason",
      /** number */
      AMOUNT_DELTA: "amountDelta",
      /** number */
      DUE_DATE_DELTA_DAYS: "dueDateDeltaDays",
      /** number */
      STATE: "state",
      /** Timestamp | null */
      SENT_AT: "sentAt",
      /** Timestamp | null */
      APPROVED_AT: "approvedAt",
      /** Timestamp | null */
      REJECTED_AT: "rejectedAt",
      /** Timestamp | null */
      APPLIED_AT: "appliedAt",
      /** string[] */
      IMAGE_URLS: "imageUrls"
    },

    /** Collection */
    WORK_LOGS: "workLogs",
    WorkLog: {
      /** string */
      TITLE: "title",
      /** string */
      CONTENT: "content",
      /** number */
      STATE: "state",
      /** Timestamp */
      WORK_DATE: "workDate",
      /** number */
      DURATION_MINUTES: "durationMinutes",
      /** string[] */
      IMAGE_URLS: "imageUrls",
    },

    /** Collection */
    INFO_REQUESTS: "infoRequests",
    InfoRequest: {
      /** Timestamp */
      EXPIRE_AT: "expireAt",
      /** number */
      STATE: "state",
      /** Record<Locale, string> */
      TITLE: "title",
      /** Record<Locale, string> */
      REASON: "reason",
      /** number */
      TYPE: "type",
      /** Map[] */
      TEXT_ITEMS: "textItems",
      /** Map */
      MEDIA: "media",

      TextItem: {
        /** Record<Locale, string> */
        LABEL: "label",
        /** boolean */
        SECURE: "secure",
        /** number */
        MAX_LENGTH: "maxLength",
        /** string */
        VALUE: "value"
      },

      Media: {
        /** number */
        MAX_COUNT: "maxCount",
        /** number */
        ALLOWED_TYPE: "allowedType",
        /** number (MB) */
        MAX_FILE_SIZE: "maxFileSize",
        /** string | null (e.g. "1/1") */
        ASPECT_RATIO: "aspectRatio",
        /** string | null (e.g. "100x100") */
        SIZE_CONSTRAINT: "sizeConstraint",
        /** Map[] */
        FILES: "files",

        File: {
          /** string */
          PATH: "path",
          /** string */
          NAME: "name",
          /** string */
          CONTENT_TYPE: "contentType",
          /** number */
          SIZE: "size",
          /** string */
          DOWNLOAD_URL: "downloadUrl"
        }
      }
    },

    /** number - 부모 문서에 저장되는 count 필드 */
    WORK_LOG: "workLog",

    RevisionRequestCount: {
      /** string - revisionRequest.* 필드의 base path */
      BASE: "revisionRequest",
      /** number */
      TOTAL: "total",
      /** number */
      DRAFT: "draft",
      /** number */
      SENT: "sent",
      /** number */
      APPROVED: "approved",
      /** number */
      REJECTED: "rejected",
      /** number */
      APPLIED: "applied",
    },

    InfoRequestCount: {
      /** string - infoRequest.* 필드의 base path */
      BASE: "infoRequest",
      /** number */
      TOTAL: "total",
      /** number */
      DRAFT: "draft",
      /** number */
      SENT: "sent",
      /** number */
      RECEIVED: "received",
      /** number */
      REJECTED: "rejected",
    },
  },

  Otp: {
    /** String */
    CODE: "code",
    /** String */
    UID: "uid",
    /** number */
    ATTEMPT_COUNT: "attemptCount"
  },
}