export const FirestorePath = {
  USER: "user",
  ESTIMATE: "estimate",
  OUTSOURCE: "outsource",
  NOTICE: "notice",
  NOTICE_CATEGORY: "noticeCategory",
  PORTFOLIO: "portfolio",
  COMPANY: "company",

  CREATE_AT: "createAt",
  UPDATE_AT: "updateAt",
  DELETED_AT: "deletedAt",

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
    /** string */
    EMAIL: "email",
  },

  Estimate: {
    IDENTIFIER: "identifier", // string
    EXPIRE_AT: "expireAt", // Timestamp
    ESTIMATE_AT: "estimateAt", // Timestamp
    TITLE: "title", // string
    NAME: "name", // string
    COMPANY: "company", // string
    EMAIL: "email", // string
    TYPE: "type", // number
    PLATFORM: "platform", // number[]
    BUDGET: "budget", // number
    DESCRIPTION: "description", // string
    STATE: "state", // number
    SUMMARY: "summary", // string
    SIG_NOTE: "sigNote", // string
    PLANS: "plans", // { string, number }[]
    CONDITIONS: "conditions", // string[]
    TECH_STACKS: "techStacks", // string[]
    RANGE: "range", // string[],
    COSTS: "costs", // { string, string, number }[]
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
    STATE: "state"
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
        MAX_LENGTH: "maxLength"
      },

      Media: {
        /** Record<Locale, string> */
        LABEL: "label",
        /** Record<Locale, string> */
        DESCRIPTION: "description",
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
    }

  }
}