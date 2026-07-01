import ImgUnderConstruction from "@/assets/image/img_under_construction.png"
import {RiArrowLeftLine} from "@remixicon/react"
import {useNavigate} from "react-router"
import {useTranslation} from "react-i18next"
import {Separator} from "@/components/ui/separator.tsx"
import {SectionHeader} from "@/components/custom/shared/SectionHeader.tsx"
import {CrossfadeImage} from "@ienlab/react-library"
import {MagneticButton} from "@/components/motion/components.tsx"

export default function ConstructionScreen() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="w-full flex flex-col">
      <div className="px-4 sm:px-6 md:px-8"><Separator className="bg-foreground"/></div>

      <div className="site-section-tight site-grid">
        <aside className="col-span-12 xl:col-span-2">
          <SectionHeader index={0} label="" />
        </aside>
        <div className="col-span-12 xl:col-span-10">
          <div className="flex w-full flex-col justify-between gap-8 lg:flex-row">
            <h1 className="large-text-title">{t("strings:under_construction.label")}</h1>
            <CrossfadeImage
              alt="Under Construction Character"
              className="max-w-full w-160 h-auto object-contain opacity-90"
              src={ImgUnderConstruction}
            />
          </div>
          <p className="mt-16 md:mt-24 xl:mt-32">{t("strings:under_construction.desc")}</p>

          <MagneticButton
            onClick={() => navigate("/")}
            variant="outline"
            className="mt-8"
          >
            <RiArrowLeftLine />
            {t("strings:back_to_home")}
          </MagneticButton>
        </div>

      </div>
    </div>
  )
}
