import './App.css'
import {type NavigateOptions, useHref, useNavigate} from "react-router";
import RootRouter from "./ui/router/RootRouter.tsx";
import {HeroUIProvider} from "@heroui/system";
import { ThemeProvider } from 'styled-components';
import {theme} from "./theme";

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
