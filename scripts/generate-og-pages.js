import {readFileSync} from "node:fs"
import {resolve} from "node:path"
import {generateOGPages} from "@ienlab/react-library/og"

const title = "아이엔랩 ienlab"
const domain = "https://www.ien.zone"

const koPath = resolve("src/locales/ko/strings.json")
const ko = JSON.parse(readFileSync(koPath, "utf-8"))

generateOGPages("dist", {
  "/about": {
    title: `${ko.about.label2} - ${title}`,
    description: ko.og.description,
    image: `${domain}/og/og-default.png`,
  },
  "/brand": {
    title: `${ko.about.branding.label} - ${title}`,
    description: ko.about.branding.desc,
    image: `${domain}/og/og-default.png`,
  },
  "/notice": {
    title: `${ko.notice.label} - ${title}`,
    description: ko.notice.desc,
    image: `${domain}/og/og-default.png`,
  },
  "/project": {
    title: `${ko.home.project.header} - ${title}`,
    description: ko.about.project.desc,
    image: `${domain}/og/og-default.png`,
  },
  "/privacy": {
    title: `${ko.privacy_policy.label} - ${title}`,
    description: ko.privacy_policy.desc,
    image: `${domain}/og/og-policy.png`,
  },
})
