import {Navigate, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";

function Router() {
    return (
        <>
            <Routes>
                <Route path={"/main"} element={<Main />} />
                <Route path={"/*"} element={<Navigate to={"/main"} />} />
            </Routes>
        </>
    );
}

export default Router;
