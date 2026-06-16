import {createCallableFactory} from "@ienlab/react-library"

export const FnSchema = {
  KakaoCustomAuth: {
    name: "kakaoCustomAuth",
    params: {
      token: "string",
    },
    result: {
      firebase_token: "string"
    }
  },
  DeleteAuthUser: {
    name: "deleteAuthUser",
    params: {
      uid: "string",
    },
    result: {
      code: "number"
    }
  },
  SendPhoneVerify: {
    name: "sendPhoneVerificationCode",
    params: {
      phoneNumber: "string",
      uid: "string",
    },
    result: {
      code: "number",
    },
  },

  VerifyCode: {
    name: "verifyCode",
    params: {
      phoneNumber: "string",
      uid: "string",
      code: "string",
    },
    result: {
      code: "number",
    },
  },
} as const

export const createCallable = createCallableFactory(FnSchema)