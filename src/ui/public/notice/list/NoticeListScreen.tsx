import ConstructionScreen from "@/ui/public/construction/ConstructionScreen.tsx"
import {useTranslation} from "react-i18next"
import {Seo} from "@/components/custom/Seo.tsx"

export default function NoticeListScreen() {
  const { t } = useTranslation()
  return (
    <>
      <Seo
        title={`${t("strings:notice.label")} - ${t("strings:ienlab")}`}
        description={t("strings:notice.desc")}
      />
      <ConstructionScreen />
    </>
  )
}