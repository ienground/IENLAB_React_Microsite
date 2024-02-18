import Header from "../components/Header";
import Slideshow from "../components/Main/Slideshow";
import Sidebar from "../components/Sidebar";
import Contact from "../components/Main/Contact";
import Noticeboard from "../components/Main/Noticeboard";
import Footer from "../components/Footer";
import "../style/main.css"
import styled from "styled-components";
import ButtonBottom from "../components/ButtonBottom";
import {Icon} from "@mui/material";
import React, {useState} from "react";
import {AppProps} from "../App";
import ButtonToTop from "../components/ButtonToTop";

function Main({darkMode, setDarkMode}: AppProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <MainWrapper>
            <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
            <Slideshow />
            <NoticeContactWrapper>
                <Noticeboard />
                <Contact />
            </NoticeContactWrapper>
            <Footer />
            <ButtonToTop />
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} darkMode={darkMode} setDarkMode={setDarkMode}/>
        </MainWrapper>
    )
}

const MainWrapper = styled.div`
    
`

const GroupButton = styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    display: flex;
`

const NoticeContactWrapper = styled.div`
    display: flex;
    flex-direction: row;
    
    @media ${({ theme }) => theme.device.mobile} {
        width: 100%;
        flex-direction: column;
    }
`

export default Main;
