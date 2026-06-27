import {Spinner} from "@/components/ui/spinner.tsx"
import {AnimatedContent as Base, type AnimatedContentStatus} from "@ienlab/react-library"
import type {ReactNode} from "react"
import {useTranslation} from "react-i18next"

type AnimatedContentProps = {
  status: AnimatedContentStatus
  className?: string
  children: ReactNode
}

export function AnimatedContent({status, className, children}: AnimatedContentProps) {
  const { t } = useTranslation()
  return (
    <Base
      status={status}
      className={className}
      loadingFallback={<Spinner className="size-9" />}
      emptyFallback={t("strings:no_data")}
    >{children}</Base>
  )
}
