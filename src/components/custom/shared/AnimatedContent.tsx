import {AnimatePresence, motion} from "motion/react"
import {Spinner} from "@/components/ui/spinner.tsx"
import {slideFadeProps} from "@ienlab/react-library"
import type {ReactNode} from "react"

type AnimatedContentProps = {
  initialized: boolean
  className?: string
  children: ReactNode
}

export function AnimatedContent({initialized, className, children}: AnimatedContentProps) {
  return (
    <AnimatePresence mode="wait">
      {initialized ? (
        <motion.div key="content" className={className} {...slideFadeProps}>
          {children}
        </motion.div>
      ) : (
        <motion.div
          key="placeholder"
          className="w-full h-full flex flex-col justify-center items-center"
          {...slideFadeProps}
        >
          <Spinner className="size-9" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
