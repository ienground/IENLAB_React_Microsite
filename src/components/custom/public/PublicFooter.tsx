import {cn} from "@/lib/utils.ts"
import imgLogoFull from "@/assets/brand/img_logo_full.png"
import imgLogoFullWhite from "@/assets/brand/img_logo_full_white.png"
import imgLogoShort from "@/assets/brand/img_logo_short.png"
import imgLogoShortWhite from "@/assets/brand/img_logo_short_white.png"
import {CrossfadeImage, useTheme} from "@ienlab/react-library"
import {useTranslation} from "react-i18next"
import {Link} from "react-router"
import dayjs from "dayjs"
import {PrivacyDestination} from "@/ui/public/privacy/PrivacyDestination.ts"

export default function PublicFooter() {
  const { resolvedTheme } = useTheme()
  const { t, i18n } = useTranslation()
  const year = dayjs().year()
  return (
    <div
      className={cn(
        "mx-auto pointer-events-auto transition-all duration-300 ease-in-out",
        "glass-surface mb-3 h-16 w-[min(960px,calc(100%-24px))] rounded-[2rem]"
      )}
    >
      <div className="flex h-full items-center justify-between gap-x-4 px-4 sm:px-6">
        <div className="flex min-w-0 flex-col justify-center">
          <p className="truncate text-sm font-medium text-foreground/90">
            {t('strings:footer.copyright', { year: year })}
          </p>

          <div className="flex flex-wrap items-center gap-x-2 text-[12px]! text-muted-foreground">
            <Link
              to={PrivacyDestination.root}
              className="transition-colors hover:text-foreground"
            >{t("strings:privacy_policy.label")}</Link>
            <span className="text-muted-foreground/50">|</span>
            <button
              type="button"
              className="p-0 transition-colors hover:text-foreground"
              onClick={() => i18n.changeLanguage("ko")}
            >{t("strings:lang.korean.native_label")}</button>
            <button
              type="button"
              className="p-0 transition-colors hover:text-foreground"
              onClick={() => i18n.changeLanguage("en")}
            >{t("strings:lang.english.native_label")}</button>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <CrossfadeImage
            src={resolvedTheme === "dark" ? imgLogoShortWhite : imgLogoShort}
            alt="Logo"
            className={cn(
              "block object-contain transition-all duration-300 md:hidden h-12"
            )}
          />

          <CrossfadeImage
            src={resolvedTheme === "dark" ? imgLogoFullWhite : imgLogoFull}
            alt="Logo"
            className={cn(
              "hidden object-contain transition-all duration-300 md:block h-8",
            )}
          />
        </div>
      </div>
    </div>
  )
}
