import {AppProps} from "../App";
import React, {useState} from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import DesignHeader from "../components/Branding/DesignHeader";
import imgLogoFull from "../assets/brand/img_logo_full.png";
import imgLogoShort from "../assets/brand/img_logo_short.png";
import {ImgTitle} from "../components/Branding/CommonComponent";
import logoColor from "../assets/branding/2024/logo_color_transparent.png";
import BrandSystem from "../components/Branding/BrandSystem";
import ApplicationUsages from "../components/Branding/ApplicationUsages";
import ButtonToTop from "../components/ButtonToTop";
import LastEdit from "../components/LastEdit";
import {useLocation} from "react-router-dom";

function Branding({darkMode, setDarkMode}: AppProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    return (
        <BrandingWrapper>
            <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
            <ImgTitle>
                <img src={logoColor} />
            </ImgTitle>
            <DesignHeader icon={imgLogoFull} shortIcon={imgLogoShort} title={"Brand Identity"} />
            <BrandSystem />
            <ApplicationUsages />
            <LastEdit link={location.pathname} />
            <Footer />
            <ButtonToTop />
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} darkMode={darkMode} setDarkMode={setDarkMode}/>
        </BrandingWrapper>
    )
}

const BrandingWrapper = styled.div`
    
`


export default Branding;
