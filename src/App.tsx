import './App.css'
import {type NavigateOptions, useHref, useNavigate} from "react-router";
import RootRouter from "./ui/router/RootRouter.tsx";
import {HeroUIProvider} from "@heroui/system";
import { ThemeProvider } from 'styled-components';
import {theme} from "./theme";
import { ToastProvider } from "@heroui/react";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

function App() {
  const navigate = useNavigate();

  return (
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
  );

  // return (
  //   <BrowserRouter>
  //     {/*<AppWrapper>*/}
  //     {/*  <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} isLogin={isLogin}/>*/}
  //     {/*  <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} isLogin={isLogin} />*/}
  //     {/*  <ContentWrapper id="content">*/}
  //         <RootRouter />
  //     {/*    <Footer />*/}
  //     {/*    /!*<ButtonToTop />*!/*/}
  //     {/*  </ContentWrapper>*/}
  //     {/*</AppWrapper>*/}
  //   </BrowserRouter>
  // )
}

export default App
