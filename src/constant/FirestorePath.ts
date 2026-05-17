export const FirestorePath = {
  ESTIMATE: "estimate",
  OUTSOURCE: "outsource",
  NOTICE: "notice",
  NOTICE_CATEGORY: "noticeCategory",
  PORTFOLIO: "portfolio",

  CREATE_AT: "createAt",
  UPDATE_AT: "updateAt",
  DELETE: "delete",

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

  Outsource: {

  },

  Notice: {
    CATEGORY: "category", // string, id
    TITLE: "title", // string
    CONTENT: "content", // string
    IMAGE_URLS: "imageUrls", // string[\,
    FIXED: "fixed", // boolean

    Category: {
      LABEL_KOR: "labelKor", // string
      LABEL_ENG: "labelEng", // String
    }
  },

  Portfolio: {
    /** boolean */
    IS_PRIMARY: "isPrimary",
    /** Record<Locale, string> */
    TITLE: "title",
    /** Record<Locale, string> */
    SUMMARY: "summary",
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
  }
}