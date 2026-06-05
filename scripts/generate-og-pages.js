import {generateOGPages} from "@ienlab/react-library/og"

const title = "아이엔랩 ienlab"
const domain = "https://www.ien.zone"

generateOGPages("dist", {
  "/about": {
    title: `소개 - ${title}`,
    description: "모바일 개발자, 그래픽 디자이너.",
    image: `${domain}/og/og-default.png`,
  },
  "/brand": {
    title: `브랜딩 - ${title}`,
    description: "아이엔랩 브랜드 아이덴티티",
    image: `${domain}/og/og-default.png`,
  },
  "/notice": {
    title: `공지사항 - ${title}`,
    description: "새로운 소식을 살펴보세요.",
    image: `${domain}/og/og-default.png`,
  },
  "/project": {
    title: `프로젝트 - ${title}`,
    description: "참여한 프로젝트를 살펴보세요.",
    image: `${domain}/og/og-default.png`,
  },
  "/privacy": {
    title: `개인정보처리방침 - ${title}`,
    description: "서비스 이용에 필요한 개인정보의 수집·이용·보관·파기 기준을 설명합니다.",
    image: `${domain}/og/og-policy.png`,
  },
})
