import {AppProps} from "../App";
import React, {useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ButtonToTop from "../components/ButtonToTop";
import Sidebar from "../components/Sidebar";

function Error404({darkMode, setDarkMode}: AppProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
            404 Error
            <Footer />
            <ButtonToTop />
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} darkMode={darkMode} setDarkMode={setDarkMode}/>
        </>
    )
}

export default Error404;
