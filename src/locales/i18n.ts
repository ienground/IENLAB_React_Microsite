import i18n from 'i18next'
import {initReactI18next} from "react-i18next"
import IntervalPlural from 'i18next-intervalplural-postprocessor'

import en from "./en/strings.json"
import ko from "./ko/strings.json"
import {initIenlabI18n, Localized, setLocalizedLocaleResolver} from "@ienlab/react-library"

i18n
  .use(initReactI18next)
  .use(IntervalPlural)
  .init({
  resources: {
    en: { strings: en },
    ko: { strings: ko }
  },
  lng: 'ko',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
})
initIenlabI18n(i18n)
setLocalizedLocaleResolver(() => i18n.language)

export default i18n