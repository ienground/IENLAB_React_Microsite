export const CustomClient = {
  NAVER_ACCOUNT: "@naver.ienlab.iam.gserviceaccount.com" as const,
  KAKAO_ACCOUNT: "@kakao.ienlab.iam.gserviceaccount.com" as const
}

export function isCustomClient(email: string) {
  const clients = [CustomClient.NAVER_ACCOUNT, CustomClient.KAKAO_ACCOUNT]
  return clients.some(client => email.endsWith(client))
}