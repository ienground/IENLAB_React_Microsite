import './App.css'
import {type NavigateOptions, useHref, useNavigate} from "react-router";
import RootRouter from "./ui/router/RootRouter.tsx";
import {HeroUIProvider} from "@heroui/system";
import styled, { ThemeProvider } from 'styled-components';
import {screen} from "./theme";
import { ToastProvider } from "@heroui/react";

import 'dayjs/locale/ko'; // 한국어 가져오기
import 'dayjs/locale/en'; // 영어 가져오기
import dayjs from "dayjs";
import isLeapYear from 'dayjs/plugin/isLeapYear'; //윤년을 판단하는 플러그인
import relativeTime from 'dayjs/plugin/relativeTime';
import {useScrollToTop} from "./ui/utils/utils/ScrollToTop.ts";
import {useTranslation} from "react-i18next";
import {useEffect} from "react";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

function App() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  dayjs.extend(isLeapYear, relativeTime); // 플러그인 등록

  useScrollToTop();

  useEffect(() => {
    dayjs.locale(i18n.language);
  }, [i18n, i18n.language]);

  return (
    <Wrapper>
      <HeroUIProvider navigate={navigate} useHref={useHref}>
        <ThemeProvider theme={screen}>
          <RootRouter />
          <ToastProvider
            regionProps={{
              className: "z-999"
            }}
          />
        </ThemeProvider>
      </HeroUIProvider>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  // .after\\:text-danger {
  //   &::after {
  //     color: ${'hsl(var(--heroui-danger-500))'};
  //   }
  // }
  //
  // .\\text-danger {
  //   color: ${'hsl(var(--heroui-danger-500) / 1)'};
  // }
  
  .google-play-button {
    background: conic-gradient(
            from 270deg at center,
            #4285F4 0deg,
            #4285F4 30deg,
            #34A853 60deg,
            #34A853 120deg,
            #FBBC04 150deg,
            #FBBC04 210deg,
            #EA4335 240deg,
            #EA4335 300deg,
            #4285F4 330deg
    );
    color: white;
  }
  
  .app-store-button {
    background: linear-gradient(#38b2ff, #0d62d4);
    color: white;
  }
  
  .github-button {
    background-color: ${`hsl(var(--heroui-foreground))`};
    color: ${`hsl(var(--heroui-background))`};
  }
  
`;

export default App;
