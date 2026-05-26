import {motion, useMotionValueEvent, useScroll } from "motion/react"
import {useState} from "react"
import {useTheme} from "@ienlab/react-library"
import {useTranslation} from "react-i18next"

export default function PublicHeader() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const { i18n } = useTranslation()

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0
    if (current > previous && current > 250) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  return (
    <motion.header
      className="fixed w-full h-24 z-999 bg-pink-200"
      animate={{
        y: hidden ? -140 : 0,
        opacity: hidden ? 0 : 1,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="header-content">
        <div className="logo">Logo</div>
        <nav>
          <a href="#">Docs</a>
          <a href="#">Examples</a>
          <a href="#">Blog</a>
          <button
            onClick={() => setTheme(resolvedTheme === "light" ? "dark": "light")}
          >{resolvedTheme}</button>
          <button
            onClick={() => i18n.changeLanguage(i18n.language === "ko" ? "en" : "ko")}
          >{i18n.language}</button>
        </nav>
      </div>
    </motion.header>
  )
}