export const FirestorePath = {
  ESTIMATE: "estimate",
  OUTSOURCE: "outsource",
  NOTICE: "notice",
  NOTICE_CATEGORY: "noticeCategory",

  CREATE_AT: "createAt",
  UPDATE_AT: "updateAt",
  DELETE: "delete",

  Estimate: {
    IDENTIFIER: "identifier", // string
    EXPIRE_AT: "expireAt", // Timestamp
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
      LABEL: "label", // string
   }
  }
};