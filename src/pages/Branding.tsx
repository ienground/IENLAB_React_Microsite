import {AppProps} from "../App";
import React, {useState} from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import DesignHeader from "../components/Branding/DesignHeader";
import imgLogoFull from "../assets/img_logo_full.png";

function Branding({darkMode, setDarkMode}: AppProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <BrandingWrapper>
            <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
            <DesignHeader icon={imgLogoFull} title={"ienlab"} />
            <Footer />
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} darkMode={darkMode} setDarkMode={setDarkMode}/>
        </BrandingWrapper>
    )
}

const BrandingWrapper = styled.div`
    
`


export default Branding;
