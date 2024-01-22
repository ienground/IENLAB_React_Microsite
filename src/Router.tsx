import {Navigate, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import Post from "./pages/Post";

function Router() {
    return (
        <>
            <Routes>
                <Route path={"/main"} element={<Main />} />
                <Route path={"/post"} element={<Post />} />
                <Route path={"/*"} element={<Navigate to={"/main"} />} />
            </Routes>
        </>
    );
}

export default Router;
