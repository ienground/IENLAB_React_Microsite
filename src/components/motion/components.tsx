import {motion} from "motion/react"
import {CrossfadeImage} from "@ienlab/react-library"
import {Button} from "@/components/ui/button.tsx"
import {type ComponentProps, type ReactNode, useRef} from "react"
import {useMagneticPull} from "motion-plus/react"
import {Link} from "react-router"
import {cn} from "@/lib/utils.ts"

export const MotionCrossfadeImage = motion.create(CrossfadeImage)
export const MotionButton = motion.create(Button)
export const MotionLink = motion.create(Link)

export function ButtonWipeContent({
                                    children,
                                    className,
                                  }: {
  children: ReactNode
  className?: string
}) {
  return (
    <span className={cn("inline-flex overflow-visible", className)}>
      <span className="inline-flex items-center justify-center gap-1.5 will-change-transform group-hover/button:animate-[button-wipe-up_800ms_cubic-bezier(0.22,1.35,0.36,1)]">
        {children}
      </span>
    </span>
  )
}

export function MagneticBaseButton({
                                       className,
                                       children,
                                       style,
                                       ...props
                                     }: ComponentProps<typeof motion.button>) {
  const ref = useRef<HTMLButtonElement>(null)
  const pull = useMagneticPull(ref, 0.1)

  return (
    <motion.button
      ref={ref}
      className={className}
      style={{
        ...style,
        ...pull,
      }}
      {...props}
    >
      {children}
    </motion.button>
  )
}


export function MagneticButton({
                                 className,
                                 children,
                                 style,
                                 ...props
                               }: ComponentProps<typeof MotionButton>) {
  const ref = useRef<HTMLButtonElement>(null)
  const pull = useMagneticPull(ref, 0.1)

  return (
    <MotionButton
      ref={ref}
      className={className}
      style={{
        ...style,
        ...pull,
      }}
      {...props}
    >
      {children}
    </MotionButton>
  )
}

export function MagneticLink({
                               className,
                               children,
                               style,
                               ...props
                             }: ComponentProps<typeof MotionLink>) {
  const ref = useRef<HTMLAnchorElement>(null)
  const pull = useMagneticPull(ref, 0.1)

  return (
    <MotionLink
      ref={ref}
      className={className}
      style={{
        ...style,
        ...pull,
      }}
      {...props}
    >
      {children}
    </MotionLink>
  )
}
