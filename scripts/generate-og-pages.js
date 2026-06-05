import * as fs from "node:fs"
import * as path from "node:path"
import {fileURLToPath} from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, "..", "dist")

/* ------------------------------------------------------------------ */
/*  Route-specific OG data                                              */
/* ------------------------------------------------------------------ */
const OG_DATA = {
  "/about": {
    title: "아이엔랩 - 소개",
    description: "아이엔랩(ienlab) 소개 페이지입니다.",
    image: "https://www.ien.zone/og/og-default.png",
  },
  "/brand": {
    title: "아이엔랩 - 브랜드",
    description: "아이엔랩 브랜드 아카이브입니다.",
    image: "https://www.ien.zone/og/og-default.png",
  },
  "/notice": {
    title: "아이엔랩 - 공지사항",
    description: "아이엔랩 공지사항 목록입니다.",
    image: "https://www.ien.zone/og/og-default.png",
  },
  "/project": {
    title: "아이엔랩 - 프로젝트",
    description: "아이엔랩 프로젝트 포트폴리오입니다.",
    image: "https://www.ien.zone/og/og-default.png",
  },
  "/privacy": {
    title: "아이엔랩 - 개인정보처리방침",
    description: "아이엔랩 개인정보처리방침입니다.",
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
