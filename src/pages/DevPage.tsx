import {AppProps} from "../App";
import React, {useState} from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import ButtonToTop from "../components/ButtonToTop";
import {ImgIcon, InnerBoxWrapper, TextContentContent, TextContentTitle} from "../components/Intro/CommonComponent/CommonComponent";
import {Spacer} from "../components/Component";
import Ripples from "react-ripples";
import {Icon} from "@mui/material";
import icPlayStore from "../assets/icon/ic_google_play.svg";
import icIosStore from "../assets/icon/ic_ios_store.svg";
import {useNavigate} from "react-router-dom";
import {appList} from "../data/CommonData";
import AppPreview from "../components/DevPage/AppPreview";

export default function DevPage({darkMode, setDarkMode}: AppProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <DevPageWrapper>
            <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} darkMode={darkMode} setDarkMode={setDarkMode}/>
            <ContentWrapper>
                {appList.map((category) => (
                    category.content.map((app) => (
                        <AppPreview app={app} />
                    ))
                ))}
            </ContentWrapper>
            <Footer />
            <ButtonToTop />
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
        </DevPageWrapper>
    );
}

const DevPageWrapper = styled.div`
    
`

const ContentWrapper = styled.div`
    display: grid;
    margin: 0 1rem;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    row-gap: 1rem;
    animation: Mount-animation 0.5s ease;

    @media ${({ theme }) => theme.device.mobile} {
        grid-template-columns: 1fr;
    }
`
