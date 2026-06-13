import {useParams} from "react-router"
import ConstructionScreen from "@/ui/public/construction/ConstructionScreen.tsx"
import {useTranslation} from "react-i18next"
import { Seo } from "@ienlab/react-library"

export default function ProjectListScreen() {
  const { t } = useTranslation()
  return (
    <>
      <Seo
        title={`${t("strings:home.project.header")} - ${t("strings:app_name")}`}
        description={t("strings:about.project.desc")}
      />
      <ConstructionScreen />
    </>
  )
}