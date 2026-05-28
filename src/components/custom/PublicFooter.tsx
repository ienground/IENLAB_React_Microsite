import {cn} from "@/lib/utils.ts"
import imgLogoFull from "@/assets/brand/img_logo_full.png"
import imgLogoFullWhite from "@/assets/brand/img_logo_full_white.png"
import imgLogoShort from "@/assets/brand/img_logo_short.png"
import imgLogoShortWhite from "@/assets/brand/img_logo_short_white.png"
import {CrossfadeImage, useTheme} from "@ienlab/react-library"
import {useTranslation} from "react-i18next"
import {Link} from "react-router"
import {Button} from "@/components/ui/button.tsx"
import dayjs from "dayjs"
import {Separator} from "@/components/ui/separator.tsx"

export default function PublicFooter() {
  const { resolvedTheme } = useTheme()
  const { t, i18n } = useTranslation()
  const year = dayjs().year()
  return (
    <div
      className={cn(
        "mx-auto pointer-events-auto transition-all duration-300 ease-in-out",
        "mb-3 h-16 w-[min(960px,calc(100%-24px))] rounded-[2rem] border border-white/15 bg-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-[20px] [-webkit-backdrop-filter:blur(20px)] dark:border-white/10 dark:bg-white/5"
      )}
    >
      <div className="flex h-full items-center justify-between px-6 gap-x-4">
        <div className="flex min-w-0 flex-col justify-center">
          <p className="truncate text-sm font-medium text-foreground/90">
            {t('strings:footer.copyright', { year: year })}
          </p>

          <div className="flex flex-wrap items-center gap-x-2 text-[12px]! text-muted-foreground">
            <Link
              to="/privacy"
              className="transition-colors hover:text-foreground"
            >{t("strings:privacy_policy")}</Link>
            <span className="text-muted-foreground/50">|</span>
            <Button
              type="button"
              className="p-0"
              variant="ghost"
              size="xs"
              onClick={() => i18n.changeLanguage("ko")}
            >{t("strings:lang.korean.native_label")}</Button>
            <Button
              type="button"
              className="p-0"
              variant="ghost"
              size="xs"
              onClick={() => i18n.changeLanguage("en")}
            >{t("strings:lang.english.native_label")}</Button>
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