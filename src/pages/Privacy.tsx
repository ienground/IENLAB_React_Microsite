import {AppProps} from "../App";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ButtonToTop from "../components/ButtonToTop";
import Sidebar from "../components/Sidebar";
import LastEdit from "../components/LastEdit";
import styled from "styled-components";

function Privacy({darkMode, setDarkMode}: AppProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
            <ContentWrapper>

            </ContentWrapper>
            <LastEdit link={location.pathname} />
            <Footer />
            <ButtonToTop />
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} darkMode={darkMode} setDarkMode={setDarkMode}/>
        </>
    );
}

const ContentWrapper = styled.div`
    
`

export default Privacy;
