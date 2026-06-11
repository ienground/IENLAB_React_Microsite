import './App.css'

import 'dayjs/locale/ko' // 한국어 가져오기
import 'dayjs/locale/en' // 영어 가져오기
import dayjs from "dayjs"
import isLeapYear from 'dayjs/plugin/isLeapYear' //윤년을 판단하는 플러그인
import relativeTime from 'dayjs/plugin/relativeTime'
import {useTranslation} from "react-i18next"
import {type CSSProperties, useEffect} from "react"
import Router from "@/ui/router/Router.tsx"
import {ThemeProvider, useTheme} from "@ienlab/react-library"
import { Toaster } from "@/components/ui/sonner.tsx"
import {TooltipProvider} from "@/components/ui/tooltip.tsx"
import {HelmetProvider} from "react-helmet-async"
import LoadingLineReveal from "@/components/custom/shared/LoadingLineReveal.tsx"
import {Cursor, useCursorState} from "motion-plus/react"

export default function App() {
  const { i18n } = useTranslation()
  const THEME_EXPIRY_HOURS = 3

  dayjs.extend(isLeapYear, relativeTime) // 플러그인 등록

  useEffect(() => {
    dayjs.locale(i18n.language)
  }, [i18n, i18n.language])

  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme" themeExpiryHours={THEME_EXPIRY_HOURS}>
        <LoadingLineReveal>
          <TooltipProvider>
            <ScreenBody />
          </TooltipProvider>
        </LoadingLineReveal>
      </ThemeProvider>
    </HelmetProvider>
  )
}

function ScreenBody() {
  const { theme } = useTheme()
  const { zone } = useCursorState()

  return (
    <>
      <Router />
      <Toaster theme={theme} position="bottom-center" richColors/>
      <Cursor
        magnetic
        className="cursor"
        variants={{
          default: {
            backgroundColor:
              zone === "overlay"
                ? "var(--cursor-default-overlay)"
                : "var(--cursor-default)",
          },
          pointer: {
            backgroundColor:
              zone === "overlay"
                ? "var(--cursor-pointer-overlay)"
                : "var(--cursor-pointer)",
          },
          text: {
            backgroundColor:
              zone === "overlay"
                ? "var(--cursor-text-overlay)"
                : "var(--cursor-text)",
            color:
              zone === "overlay"
                ? "var(--cursor-text-foreground-overlay)"
                : "var(--cursor-text-foreground)",
          },
        }}
        style={{
          borderRadius: 32,
          mixBlendMode:
            (zone === "overlay" ? "difference" : "var(--cursor-blend)") as CSSProperties["mixBlendMode"],
        }}
      />
    </>
  )
}