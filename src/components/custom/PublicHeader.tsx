import {motion, useMotionValueEvent, useScroll } from "motion/react"
import {useState} from "react"

export default function PublicHeader() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)

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
      className="fixed w-full bg-pink-400 z-999"
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
        </nav>
      </div>
    </motion.header>
  )
}