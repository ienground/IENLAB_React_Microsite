import {Separator} from "@/components/ui/separator.tsx"
import {SectionHeader} from "@/components/custom/shared/SectionHeader.tsx"
import {CrossfadeImage, useDateTimeFormatters} from "@ienlab/react-library"
import ImgUnderConstruction from "@/assets/image/img_under_construction.png"
import {MagneticButton} from "@/components/motion/components.tsx"
import {RiArrowLeftLine} from "@remixicon/react"
import {useNavigate} from "react-router"
import {useTranslation} from "react-i18next"
import {Field, FieldContent, FieldSet, FieldTitle} from "@/components/ui/field.tsx"
import dayjs from "dayjs"

export default function VersionScreen() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { dateTimeFormat } = useDateTimeFormatters()

  return (
    <div className="w-full flex flex-col">
      <div className="px-8"><Separator className="bg-foreground"/></div>

      <div className="w-full grid grid-cols-12 gap-y-10 xl:gap-x-10 p-8">
        <aside className="col-span-12 xl:col-span-2">
          <SectionHeader
            index={0}
            label={t("strings:version_info.title")}
          />
        </aside>
        <div className="col-span-12 xl:col-span-10">
          <div className="flex flex-col lg:flex-row w-full justify-between">
            <h1 className="large-text-title">{t("strings:version_info.title")}</h1>
          </div>
          <FieldSet className="mt-32 grid grid-cols-1 md:grid-cols-2">
            <Field>
              <FieldTitle>{t("strings:version_info.app_version.title")}</FieldTitle>
              <FieldContent>{import.meta.env.VITE_APP_VERSION}</FieldContent>
            </Field>
            <Field>
              <FieldTitle>{t("strings:version_info.build_date.title")}</FieldTitle>
              <FieldContent>{dateTimeFormat(new Date(import.meta.env.VITE_APP_BUILD_DATE))}</FieldContent>
            </Field>
          </FieldSet>
          <MagneticButton
            onClick={() => navigate("/")}
            variant="outline"
            className="mt-8"
          >
            <RiArrowLeftLine/>
            {t("strings:back_to_home")}
          </MagneticButton>
        </div>

      </div>
    </div>
  )
}