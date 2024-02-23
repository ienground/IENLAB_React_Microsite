import {AppProps} from "../App";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import RecentProject from "../components/Intro/RecentProject";
import AboutMe from "../components/Intro/AboutMe";
import TechStack from "../components/Intro/TechStack";
import Contact from "../components/Intro/Contact";
import {Spacer} from "../components/Component";
import ButtonToTop from "../components/ButtonToTop";
import LastEdit from "../components/LastEdit";
import {useLocation} from "react-router-dom";

export default function Intro({darkMode, setDarkMode}: AppProps) {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        // window.scrollTo(0, 0)
    }, [])

    const IntroSpacer = <Spacer orientation={"vertical"} size={"3rem"} />
    return (
        <IntroWrapper>
            <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} darkMode={darkMode} setDarkMode={setDarkMode}/>
            <AboutMe />
            {IntroSpacer}
            <TechStack />
            {IntroSpacer}
            <RecentProject />
            {IntroSpacer}
            <Contact />
            {IntroSpacer}
            <LastEdit link={location.pathname} />
            <Footer />
            <ButtonToTop />
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
        </IntroWrapper>
    )
}

const IntroWrapper = styled.div`
    
`
