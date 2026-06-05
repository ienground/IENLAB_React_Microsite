import ConstructionScreen from "@/ui/public/construction/ConstructionScreen.tsx"
import { Seo } from "@ienlab/react-library"
import {useTranslation} from "react-i18next"

export default function AboutScreen() {
  const { t } = useTranslation()
  return (
    <>
      <Seo
        title={`${t("strings:about.label2")} - ${t("strings:ienlab")}`}
        description={t("strings:og.description")}
      />
      <ConstructionScreen />
    </>

  )
}