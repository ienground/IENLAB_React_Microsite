import {motion} from "motion/react"
import {CrossfadeImage} from "@ienlab/react-library"
import {Button} from "@/components/ui/button.tsx"
import {type ComponentProps, useRef} from "react"
import {useMagneticPull} from "motion-plus/react"
import {Link} from "react-router"

export const MotionCrossfadeImage = motion.create(CrossfadeImage)
export const MotionButton = motion.create(Button)
export const MotionLink = motion.create(Link)

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