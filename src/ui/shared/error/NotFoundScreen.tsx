import {useNavigate} from "react-router"
import {useTranslation} from "react-i18next"
import {Separator} from "@/components/ui/separator.tsx"
import {SectionHeader} from "@/components/custom/SectionHeader.tsx"
import {RiArrowLeftLine} from "@remixicon/react"
import {MagneticButton} from "@/components/motion/components.tsx"

export default function NotFoundScreen() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="w-full flex flex-col">
      <div className="px-8"><Separator className="bg-foreground"/></div>

      <div className="w-full grid grid-cols-12 gap-y-10 xl:gap-x-10 p-8">
        <aside className="col-span-12 xl:col-span-2">
          <SectionHeader index={404} label="" />
        </aside>
        <div className="col-span-12 xl:col-span-10">
          <div className="flex flex-col lg:flex-row w-full justify-between">
            <div className="large-text-title">{t("strings:error.not_found.label")}</div>
          </div>
          <p className="mt-32">{t("strings:error.not_found.desc")}</p>

          <MagneticButton
            onClick={() => navigate(-1)}
            variant="outline"
            className="mt-8"
          >
            <RiArrowLeftLine />
            {t("strings:go_back")}
          </MagneticButton>
        </div>

      </div>
    </div>
  )
}