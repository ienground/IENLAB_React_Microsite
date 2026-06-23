import ConstructionScreen from "@/ui/public/construction/ConstructionScreen.tsx"
import { Seo } from "@ienlab/react-library"
import {useTranslation} from "react-i18next"

export default function NoticeListScreen() {
  const { t } = useTranslation()
  return (
    <>
      <Seo
        title={`${t("strings:notice.label")} - ${t("strings:app_name")}`}
        description={t("strings:notice.desc")}
      />
      <ConstructionScreen />
    </>
  )
}