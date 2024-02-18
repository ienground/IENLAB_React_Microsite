import {AppProps} from "../App";
import React, {useState} from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import ButtonToTop from "../components/ButtonToTop";
import backgroundCalarm from "../assets/background_calarm.png";
import {ImgIcon, InnerBoxWrapper, TextContentContent, TextContentTitle} from "../components/Intro/CommonComponent/CommonComponent";
import icAppCalarm from "../assets/icon/ic_app_calarm.png";
import {Spacer} from "../components/Component";
import Ripples from "react-ripples";
import {Icon} from "@mui/material";
import icPlayStore from "../assets/icon/ic_google_play.svg";
import icIosStore from "../assets/icon/ic_ios_store.svg";
import {useNavigate} from "react-router-dom";
import {appList} from "../data/CommonData";

function DevPage({darkMode, setDarkMode}: AppProps) {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <DevPageWrapper>
            <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
            <ContentWrapper>
                {appList.map((category) => (
                    category.content.map((app) => (
                        <HeaderWrapper>
                            <ImgHeader src={app.background} />
                            <BoxButtonWrapper>
                                <InnerBoxWrapper>
                                    <ImgIcon src={app.icon} />
                                    <Spacer orientation={"vertical"} size={"1rem"} />
                                    <TextContentTitle className={"black background"}>{app.title}</TextContentTitle><br />
                                    <TextContentContent fontWeight={"normal"} className={"black medium"}>{app.content}</TextContentContent>
                                </InnerBoxWrapper>
                                <ButtonLinkWrapper>
                                    <Ripples placeholder={"web"}><ImgButton onClick={() => navigate(app.page)}><Icon baseClassName={"material-icons-round"}>language</Icon></ImgButton></Ripples>
                                    {app.aosLink !== "" ? <Ripples placeholder={"store"}><ImgButton onClick={() => window.location.href=`https://play.google.com/store/apps/details?id=${app.aosLink}`} style={{backgroundImage: icPlayStore}} /></Ripples> : <></>}
                                    {app.iosLink !== "" ? <Ripples placeholder={"store"}><ImgButton onClick={() => window.location.href=`https://apps.apple.com/kr/app/${app.iosLink}`} style={{backgroundImage: icIosStore}} /></Ripples> : <></>}
                                </ButtonLinkWrapper>
                            </BoxButtonWrapper>
                        </HeaderWrapper>
                    ))
                ))}
            </ContentWrapper>
            <ButtonToTop />
            <Footer />
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} darkMode={darkMode} setDarkMode={setDarkMode}/>
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

const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.colors.colorSurfaceVariant};
    border-radius: 1rem;
    overflow: hidden;
    transition: scale 0.5s ease, background-color 0.5s ease;

    & > div > :first-child {
        background-color: transparent;
        border-radius: 0;
        flex: 1;

        &:hover {
            scale: 1;
        }
    }

    &:hover {
        scale: 1.01;
    }
`

const BoxButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
`

const ButtonLinkWrapper = styled.div`
    display: flex;
    flex-direction: row;
    padding: 1rem;
    margin-top: auto;

    & > div {
        border-radius: 5rem;
        transition: background-color 0.5s ease;
        &:hover {
            background-color: rgba(0, 0, 0, 0.1);
        }
    }

    @media ${({ theme }) => theme.device.tablet} {
        flex-direction: column;
        padding: 0.5rem;
    }
`

const ImgHeader = styled.img`
    width: 100%;
    border-radius: 0 0 1rem 1rem;
`

const ImgButton = styled.button`
    width: 2rem;
    height: 2rem;
    position: relative;
    background-color: transparent;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${props => props.style?.backgroundImage});
    margin: 1rem;

    & > span {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 2rem;
        transition: color 0.5s ease;
        color: ${props => props.theme.colors.colorOnSurface};
    }

    @media ${({ theme }) => theme.device.mobile} {
        width: 1rem;
        height: 1rem;
        margin: 0.5rem;
        
        & > span {
            font-size: 1rem;
        }
    }
`

export default DevPage;
