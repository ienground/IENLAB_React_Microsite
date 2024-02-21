import {AppProps} from "../../App";
import React, {useState} from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import ButtonToTop from "../../components/ButtonToTop";

function Branding2023({darkMode, setDarkMode}: AppProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <BrandingWrapper>
            <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
            <Footer />
            <ButtonToTop />
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} darkMode={darkMode} setDarkMode={setDarkMode}/>
        </BrandingWrapper>
    )
}

const BrandingWrapper = styled.div`
    
`


export default Branding2023;
