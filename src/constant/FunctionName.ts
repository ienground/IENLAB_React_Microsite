export const FunctionName = {
  KAKAO_CUSTOM_AUTH: "kakaoCustomAuth",
  DELETE_AUTH_USER: "deleteAuthUser",
  SEND_PHONE_VERIFY: "sendPhoneVerificationCode",
  VERIFY_CODE: "verifyCode",

  CustomAuth: {
    Params: {
      /** string */
      TOKEN: "token"
    },

    Result: {
      /** string */
      FIREBASE_TOKEN: "firebase_token"
    }
  },

  DeleteAuthUser: {
    Params: {
      /** string */
      UID: "uid"
    }
  },

  SendPhoneVerify: {
    Params: {
      /** string */
      PHONE_NUMBER: "phoneNumber",
      /** string */
      UID: "uid",
    },
    Result: {
      /** number */
      CODE: "code",
    },
  },

  VerifyCode: {
    Params: {
      /** string */
      CODE: "code",
      /** string */
      PHONE_NUMBER: "phoneNumber",
      /** string */
      UID: "uid",
    },
    Result: {
      /** number */
      CODE: "code",
    },
  }
} as const