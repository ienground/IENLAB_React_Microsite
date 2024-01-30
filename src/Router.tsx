import {Navigate, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import Post from "./pages/Post";
import Construction from "./pages/Construction";
import {SidebarProps} from "./components/Sidebar";
import {AppProps} from "./App";
import Intro from "./pages/Intro";
import Branding from "./pages/Branding";
import ScrollToTop from "./utils/ScrollToTop";
import Calarm from "./pages/dev/Calarm";
import DevPage from "./pages/DevPage";
import Branding2023 from "./pages/design/Branding2023";

function Router({darkMode, setDarkMode}: AppProps) {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path={"/"} element={<Main darkMode={darkMode} setDarkMode={setDarkMode} />} />
                {/*<Route path={"/"} element={<Construction darkMode={darkMode} setDarkMode={setDarkMode} />} />*/}
                <Route path={"/under"} element={<Construction darkMode={darkMode} setDarkMode={setDarkMode} />} />
                <Route path={"/intro"} element={<Intro darkMode={darkMode} setDarkMode={setDarkMode} />} />
                <Route path={"/brand"} element={<Branding darkMode={darkMode} setDarkMode={setDarkMode} />} />
                <Route path={"/post"} element={<Post darkMode={darkMode} setDarkMode={setDarkMode} />} />
                <Route path={"/dev"} element={<DevPage />} />

                {/*Dev*/}
                <Route path={"/calarm"} element={<Calarm />} />

                {/*Branding*/}
                <Route path={"/brand/2023"} element={<Branding2023 darkMode={darkMode} setDarkMode={setDarkMode} />} />

                <Route path={"/*"} element={<Navigate to={"/"} />} />
            </Routes>
        </>
    );
}

export default Router;
