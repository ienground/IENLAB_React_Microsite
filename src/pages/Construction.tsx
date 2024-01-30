import Header from "../components/Header";
import Slideshow from "../components/Main/Slideshow";
import Sidebar from "../components/Sidebar";
import Contact from "../components/Main/Contact";
import Noticeboard from "../components/Main/Noticeboard";
import Footer from "../components/Footer";
import "../style/main.css"
import styled from "styled-components";
import imgPatternBg from "../assets/dev_page_nologo.png"
import imgLogoWhite from "../assets/img_logo_full_white.png"
import MD3Button from "@mui/material-next/Button"
import {AppProps} from "../App";
import React, {useState} from "react";
import {ButtonGo} from "../components/Main/TitleComponent";

function Construction({darkMode, setDarkMode}: AppProps) {
    return (
        <PageWrapper>
            <Header isOpen={darkMode} setIsOpen={setDarkMode} className={"construction"}/>
            <Gallery style={{backgroundImage: imgPatternBg}}>
                <BlurBackground darkMode={darkMode}>
                    <TextTitle>Under Construction 🚧</TextTitle>
                    <ButtonGo onClick={() => {
                        window.location.href = "https://blog.ien.zone"
                    }} style={{marginBottom: "auto", width: "auto", fontSize: "1rem", padding: "1rem", fontWeight: "bolder", transition: "none"}}>블로그로 이동</ButtonGo>
                </BlurBackground>
            </Gallery>
            <Footer />
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    width: 100%;
`

const Gallery = styled.div`
    display: flex;
    width: calc(100% - 2rem);
    aspect-ratio: 21 / 9;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    margin: 0 1rem;
    background-image: url("${props => props.style?.backgroundImage}");
    overflow: hidden;
    animation: Mount-animation 0.5s;
    
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: ${props => props.style?.backgroundImage};

    @media ${({ theme }) => theme.device.mobile} {
        aspect-ratio: 9 / 16;
    }
`

const BlurBackground = styled.div<{ darkMode: boolean }>`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(20px);
    animation: Blur-animation 2s infinite;
    animation-direction: alternate;
    align-items: center;
    transition: background-color 0.5s ease;
    background-color: ${(props) => props.darkMode ? "rgba(0, 0, 0, 0.3)" : "transparent" };
`

const TextTitle = styled.div`
    width: 80%;
    text-align: center;
    margin: auto auto 2rem auto;
    transition: color 0.5s ease;
    font-weight: bolder;
    font-size: 3vmax;
`

export default Construction;
