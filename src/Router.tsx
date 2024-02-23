import {Navigate, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import Post from "./pages/Post";
import {SidebarProps} from "./components/Sidebar";
import {AppProps} from "./App";
import Intro from "./pages/Intro";
import Branding from "./pages/Branding";
import ScrollToTop from "./utils/ScrollToTop";
import Calarm from "./pages/dev/Calarm";
import DevPage from "./pages/DevPage";
import Branding2023 from "./pages/design/Branding2023";
import Privacy from "./pages/Privacy";
import Noticeboard from "./pages/Noticeboard";
import NoticeDetail from "./pages/noticeboard/NoticeDetail";
import Error404 from "./pages/Error404";

export default function Router({darkMode, setDarkMode}: AppProps) {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path={"/"} element={<Main darkMode={darkMode} setDarkMode={setDarkMode} />} />
                {/*<Route path={"/"} element={<Construction darkMode={darkMode} setDarkMode={setDarkMode} />} />*/}
                <Route path={"/intro"} element={<Intro darkMode={darkMode} setDarkMode={setDarkMode} />} />
                <Route path={"/privacy"} element={<Privacy darkMode={darkMode} setDarkMode={setDarkMode} />} />

                <Route path={"/post"} element={<Post darkMode={darkMode} setDarkMode={setDarkMode} />} />

                {/*Notice*/}
                <Route path={"/notice"} element={<Noticeboard darkMode={darkMode} setDarkMode={setDarkMode} />} />
                <Route path={"/notice/detail"} element={<NoticeDetail darkMode={darkMode} setDarkMode={setDarkMode} />} />

                {/*Dev*/}
                <Route path={"/dev"} element={<DevPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
                <Route path={"/calarm"} element={<Calarm darkMode={darkMode} setDarkMode={setDarkMode} />} />

                {/*Brand*/}
                <Route path={"/brand"} element={<Branding darkMode={darkMode} setDarkMode={setDarkMode} />} />
                <Route path={"/brand/2023"} element={<Branding2023 darkMode={darkMode} setDarkMode={setDarkMode} />} />

                {/*Error*/}
                <Route path={"/404"} element={<Error404 darkMode={darkMode} setDarkMode={setDarkMode} />} />

                <Route path={"/*"} element={<Navigate to={"/404"} />} />
            </Routes>
        </>
    );
}
