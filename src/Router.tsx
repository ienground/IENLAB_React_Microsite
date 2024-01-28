import {Navigate, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import Post from "./pages/Post";
import Construction from "./pages/Construction";
import {SidebarProps} from "./components/Sidebar";
import {AppProps} from "./App";

function Router({darkMode, setDarkMode}: AppProps) {
    return (
        <>
            <Routes>
                <Route path={"/"} element={<Main darkMode={darkMode} setDarkMode={setDarkMode} />} />
                <Route path={"/dev"} element={<Construction />} />
                <Route path={"/post"} element={<Post darkMode={darkMode} setDarkMode={setDarkMode} />} />
                <Route path={"/*"} element={<Navigate to={"/"} />} />
            </Routes>
        </>
    );
}

export default Router;
