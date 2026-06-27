import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from "@/components/ui/empty.tsx"
import {RiArrowGoBackFill, RiErrorWarningFill} from "@remixicon/react"
import {Button} from "@/components/ui/button.tsx"
import {useTranslation} from "react-i18next"

export default function ClientRouteErrorScreen() {
  const {t} = useTranslation()
  return (
    <Empty className="h-full bg-muted/30">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <RiErrorWarningFill />
        </EmptyMedia>
        <EmptyTitle>{t("strings:error.not_found.label")}</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">{t("strings:error.not_found.desc")}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">
          <RiArrowGoBackFill />
          {t("strings:go_back")}
        </Button>
      </EmptyContent>
    </Empty>
  )
}