import * as fs from "node:fs"
import * as path from "node:path"
import {fileURLToPath} from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, "..", "dist")

/* ------------------------------------------------------------------ */
/*  Route-specific OG data                                              */
/* ------------------------------------------------------------------ */
const title = "아이엔랩 ienlab"

const OG_DATA = {
  "/about": {
    title: `소개 - ${title}`,
    description: "모바일 개발자, 그래픽 디자이너.",
    image: "https://www.ien.zone/og/og-default.png",
  },
  "/brand": {
    title: `브랜드 - ${title}`,
    description: "2016년부터의 브랜드 아이덴티티.",
    image: "https://www.ien.zone/og/og-default.png",
  },
  "/notice": {
    title: `공지사항 - ${title}`,
    description: "새로운 소식을 살펴보세요.",
    image: "https://www.ien.zone/og/og-default.png",
  },
  "/project": {
    title: `프로젝트 - ${title}`,
    description: "참여한 프로젝트를 살펴보세요.",
    image: "https://www.ien.zone/og/og-default.png",
  },
  "/privacy": {
    title: `개인정보처리방침 - ${title}`,
    description: "서비스 이용에 필요한 개인정보의 수집·이용·보관·파기 기준을 설명합니다.",
    image: "https://www.ien.zone/og/og-policy.png",
  },
}

/* ------------------------------------------------------------------ */
/*  Regex replacements for OG tags                                      */
/* ------------------------------------------------------------------ */
function replaceOG(html, {title, description, image}) {
  return html
    .replace(/(<title>)[^<]*(<\/title>)/, `$1${title}$2`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*(")/,
      `$1${description}$2`,
    )
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
      `$1${title}$2`,
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
      `$1${description}$2`,
    )
    .replace(
      /(<meta\s+property="og:image"\s+content=")[^"]*(")/,
      `$1${image}$2`,
    )
    .replace(
      /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,
      `$1${title}$2`,
    )
    .replace(
      /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,
      `$1${description}$2`,
    )
    .replace(
      /(<meta\s+name="twitter:image"\s+content=")[^"]*(")/,
      `$1${image}$2`,
    )
}

/* ------------------------------------------------------------------ */
/*  Main                                                                */
/* ------------------------------------------------------------------ */
function main() {
  const indexPath = path.join(distDir, "index.html")
  const html = fs.readFileSync(indexPath, "utf-8")

  let generated = 0

  for (const [route, og] of Object.entries(OG_DATA)) {
    const dir = path.join(distDir, route.replace(/^\//, ""))
    const outPath = path.join(dir, "index.html")

    fs.mkdirSync(dir, {recursive: true})
    fs.writeFileSync(outPath, replaceOG(html, og), "utf-8")

    console.log(`  ✓ ${route} → ${outPath}`)
    generated++
  }

  console.log(`\n✅ ${generated} OG pages generated`)
}

main()
