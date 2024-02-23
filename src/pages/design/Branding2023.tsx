import {AppProps} from "../../App";
import React, {useState} from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import ButtonToTop from "../../components/ButtonToTop";

export default function Branding2023({darkMode, setDarkMode}: AppProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <BrandingWrapper>
            <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} darkMode={darkMode} setDarkMode={setDarkMode}/>
            <Footer />
            <ButtonToTop />
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
        </BrandingWrapper>
    )
}

const BrandingWrapper = styled.div`
    
`
