import './App.css'
import {type NavigateOptions, useHref, useNavigate} from "react-router";
import RootRouter from "./ui/router/RootRouter.tsx";
import {HeroUIProvider} from "@heroui/system";
import { ThemeProvider } from 'styled-components';
import {theme} from "./theme";
import { ToastProvider } from "@heroui/react";

import 'dayjs/locale/ko'; // 한국어 가져오기
import 'dayjs/locale/en'; // 영어 가져오기
import dayjs from "dayjs";
import isLeapYear from 'dayjs/plugin/isLeapYear'; //윤년을 판단하는 플러그인
import relativeTime from 'dayjs/plugin/relativeTime';
import {useScrollToTop} from "./ui/utils/utils/ScrollToTop.ts";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

function App() {
  const navigate = useNavigate();

  dayjs.extend(isLeapYear, relativeTime); // 플러그인 등록
  dayjs.locale('ko'); // 언어 등록
  // dayjs.locale('en'); // 언어 등록

  useScrollToTop();

  return (
    <>
      <HeroUIProvider navigate={navigate} useHref={useHref}>
        <ThemeProvider theme={theme}>
          <RootRouter />
          <ToastProvider
            regionProps={{
              className: "z-999"
            }}
          />
        </ThemeProvider>
      </HeroUIProvider>
    </>
  );
}

export default App
