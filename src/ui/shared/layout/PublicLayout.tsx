import {Outlet, ScrollRestoration, useOutlet} from "react-router"
import {AnimatePresence, motion} from "motion/react"
import PublicHeader from "@/components/custom/public/PublicHeader.tsx"
import PublicFooter from "@/components/custom/public/PublicFooter.tsx"

export default function PublicLayout() {
  const outlet = useOutlet()

  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader/>
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="pt-16 md:pt-24 grow"
        >
          {outlet}
        </motion.main>
      </AnimatePresence>
      <PublicFooter/>
      <ScrollRestoration/>
    </div>
  )
}