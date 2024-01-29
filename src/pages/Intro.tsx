import {AppProps} from "../App";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import RecentProject from "../components/Intro/RecentProject";
import AboutMe from "../components/Intro/AboutMe";
import TechStack from "../components/Intro/TechStack";
import DesignStack from "../components/Intro/DesignStack";
import Contact from "../components/Intro/Contact";

function Intro({darkMode, setDarkMode}: AppProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        // window.scrollTo(0, 0)
    }, [])

    return (
        <IntroWrapper>
            <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
            <AboutMe />
            <TechStack />
            <DesignStack />
            <RecentProject />
            <Contact />
            <Footer />
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} darkMode={darkMode} setDarkMode={setDarkMode}/>
        </IntroWrapper>
    )
}

const IntroWrapper = styled.div`
    
`

export default Intro;
