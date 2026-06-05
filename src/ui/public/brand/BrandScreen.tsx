import ConstructionScreen from "@/ui/public/construction/ConstructionScreen.tsx"
import { Seo } from "@ienlab/react-library"
import {useTranslation} from "react-i18next"

export default function BrandScreen() {
  const { t } = useTranslation()
  return (
    <>
      <Seo
        title={`${t("strings:about.branding.label")} - ${t("strings:ienlab")}`}
        description={t("strings:about.branding.desc")}
      />
      <ConstructionScreen />
    </>

  )
}