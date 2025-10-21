export const FirestorePath = {
  ESTIMATE: "estimate",
  OUTSOURCE: "outsource",
  NOTICE: "notice",
  NOTICE_CATEGORY: "noticeCategory",
  DEV_PROJECT: "devProject",

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

  DevProject: {
    CATEGORIES: "categories",
    IS_PRIMARY: "isPrimary",
    THUMBNAIL: "thumbnail",
    LOGO: "logo",
    TITLE: "title",
    SUMMARY: "summary",
    STATE: "state",
    START_AT: "startAt",
    END_AT: "endAt",
    DEVELOPER: "developer",
    GITHUB: "github",
    LINK: "link",
    GOOGLE_PLAY: "googlePlay",
    APP_STORE: "appStore",
    IMAGE_URLS: "imageUrls",
    FUNCTIONS: "functions",
    TECHS: "techs",
    PLATFORM: "platform",
  }
};