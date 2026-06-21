export const FnSchema = {
  NaverCustomAuth: {
    name: "naverCustomAuth",
    params: {
      token: "string",
    },
    result: {
      firebase_token: "string"
    }
  },
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
  UpdateUserEmail: {
    name: "updateUserEmail",
    params: {
      uid: "string",
      email: "string",
    },
    result: {
      success: "boolean",
    },
  },

  CreateEstimatePDF: {
    name: "createEstimatePDF",
    params: {
      itemId: "string"
    },
    result: {
      pdf: "string",
      name: "string"
    }
  },

  UpdateAgreement: {
    name: "updateAgreement",
    params: {
      agreedRequired: "boolean",
      agreedOptional: "boolean"
    },
    result: {
      code: "number"
    }
  }

} as const