import {type ReactNode, useEffect, useState} from "react"
import {motion, useMotionTemplate, useMotionValue, useMotionValueEvent, useSpring, useTransform} from "motion/react"
import {animate, type Transition} from "motion"

type LoadingLineRevealProps = {
  children: ReactNode
}

export default function LoadingLineReveal({
                                            children,
                                          }: LoadingLineRevealProps) {
  const progress = useMockLoading()
  const [isLoaded, setIsLoaded] = useState(false)

  const leftEdge = useMotionValue("calc(50% - 2px)")
  const rightEdge = useMotionValue("calc(50% + 2px)")
  const topEdge = useTransform(progress, [0, 1], ["50%", "0%"])
  const bottomEdge = useTransform(progress, [0, 1], ["50%", "100%"])

  const clipPath = useMotionTemplate`polygon(
    0% 0%, ${leftEdge} 0%, ${leftEdge} ${topEdge}, ${leftEdge} ${bottomEdge}, ${rightEdge} ${bottomEdge}, ${rightEdge} ${topEdge},
    ${leftEdge} ${topEdge}, ${leftEdge} 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%
  )`

  useMotionValueEvent(progress, "change", (latest) => {
    if (latest >= 1 && !isLoaded) {
      setIsLoaded(true)
    }
  })

  useEffect(() => {
    if (!isLoaded) return

    const transition: Transition = {
      type: "spring",
      visualDuration: 0.5,
      bounce: 0,
    }

    animate(leftEdge, "calc(0% - 0px)", transition)
    animate(rightEdge, "calc(100% + 0px)", transition)
  }, [isLoaded, leftEdge, rightEdge])

  return (
    <div className="w-full relative">
      {children}

      <motion.div
        className="absolute inset-0 bg-background pointer-events-none z-20000"
        animate={{ opacity: isLoaded ? 0 : 1 }}
      />

      <motion.div
        className="absolute inset-0 bg-primary pointer-events-none z-20000"
        style={{ clipPath }}
      />
    </div>
  )
}

function useMockLoading() {
  const progress = useSpring(0, { stiffness: 500, damping: 40 })

  useEffect(() => {
    const interval = setInterval(() => {
      const newProgress = progress.get() + Math.random() * 0.3

      if (newProgress >= 1) {
        progress.set(1)
        clearInterval(interval)
      } else {
        progress.set(newProgress)
      }
    }, 300)

    return () => clearInterval(interval)
  }, [progress])

  return progress
}