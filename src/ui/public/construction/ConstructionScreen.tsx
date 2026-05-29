import ImgUnderConstruction from "@/assets/image/img_under_construction.png"
import {RiArrowLeftLine} from "@remixicon/react"
import {Button} from "@/components/ui/button.tsx"
import {useNavigate} from "react-router"
import {useTranslation} from "react-i18next"
import {Separator} from "@/components/ui/separator.tsx"
import {SectionHeader} from "@/components/custom/SectionHeader.tsx"
import {CrossfadeImage} from "@ienlab/react-library"

export default function ConstructionScreen() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="w-full flex flex-col">
      <div className="px-8"><Separator className="bg-foreground"/></div>

      <div className="w-full grid grid-cols-12 gap-y-10 xl:gap-x-10 p-8">
        <aside className="col-span-12 xl:col-span-2">
          <SectionHeader index={0} label="" />
        </aside>
        <div className="col-span-12 xl:col-span-10">
          <div className="flex flex-col md:flex-row w-full justify-between">
            <div className="large-text-title">{t("strings:under_construction.label")}</div>
            <CrossfadeImage
              alt="Under Construction Character"
              className="max-w-full w-160 h-auto object-contain mix-blend-multiply opacity-90"
              src={ImgUnderConstruction}
            />
          </div>
          <p className="mt-32">{t("strings:under_construction.desc")}</p>

          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="mt-8"
          >
            <RiArrowLeftLine />
            {t("strings:back_to_home")}
          </Button>
        </div>

      </div>
    </div>
  )
}