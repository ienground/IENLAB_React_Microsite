import {AppProps} from "../../../App";
import {Link, useLocation} from "react-router-dom";

export default function CalarmGuide({darkMode, setDarkMode}: AppProps) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const language = queryParams.get("lang");
    const url = language === "ko" ? "f7e49f2643b54b0d8ffb7e369d862fb7" : "4bb43b1e2f8b4804819b6b9c9f6947ba"

    return (
        <div className="App">
            {window.location.href = `https://ienlab.notion.site/${url}`}
        </div>
    );
}
