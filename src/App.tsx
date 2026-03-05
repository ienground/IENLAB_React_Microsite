import './App.css'

import 'dayjs/locale/ko'; // 한국어 가져오기
import 'dayjs/locale/en'; // 영어 가져오기
import dayjs from "dayjs";
import isLeapYear from 'dayjs/plugin/isLeapYear'; //윤년을 판단하는 플러그인
import relativeTime from 'dayjs/plugin/relativeTime';
import {useTranslation} from "react-i18next";
import {useEffect} from "react";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {RouterProvider} from "react-router";
import {router} from "@/ui/router/RootRouter.tsx";

export default function App() {
  const { i18n } = useTranslation();

  dayjs.extend(isLeapYear, relativeTime); // 플러그인 등록

  useEffect(() => {
    dayjs.locale(i18n.language);
  }, [i18n, i18n.language]);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
