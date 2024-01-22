import {Navigate, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import Post from "./pages/Post";
import Construction from "./pages/Construction";

function Router() {
    return (
        <>
            <Routes>
                <Route path={"/main"} element={<Construction />} />
                <Route path={"/post"} element={<Post />} />
                <Route path={"/*"} element={<Navigate to={"/main"} />} />
            </Routes>
        </>
    );
}

export default Router;
