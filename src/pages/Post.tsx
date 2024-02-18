import Header from "../components/Header";
import Slideshow from "../components/Main/Slideshow";
import Sidebar from "../components/Sidebar";
import Contact from "../components/Main/Contact";
import Noticeboard from "../components/Main/Noticeboard";
import mainIcon from "../assets/brand/img_logo_typo.png";
import Footer from "../components/Footer";
import "../style/main.css"
import styled from "styled-components";
import icTistory from "../assets/icon/ic_tistory.svg";
import React, {useState} from "react";
import {AppProps} from "../App";
import ButtonToTop from "../components/ButtonToTop";

function Post({darkMode, setDarkMode}: AppProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
            <TitleWrapper>
                <Title>
                    <TextTitle>Hello Pretendard Title!</TextTitle>
                    <TextDate>IT's date!</TextDate>
                </Title>
                {/*<embed src={icTistory} style={{color: "#FFFFFF", fill: "#F0F048", stroke: "#FF0000"}}/>*/}
                <ImgThumbnail src={mainIcon}/>
            </TitleWrapper>
            <Footer/>
            <ButtonToTop />
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} darkMode={darkMode} setDarkMode={setDarkMode}/>
        </>
    )
}

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 1rem 0 1rem;
    border-radius: 1rem;
    background-color: rebeccapurple;
    animation: Mount-animation 0.5s ease;
`

const Title = styled.div`
    display: flex;
    flex-direction: row;
`

const TextTitle = styled.div`
    width: 50%;
    height: fit-content;
    padding: 2rem;
    font-size: 1.5rem;
`

const TextDate = styled.div`
    width: 50%;
    height: fit-content;
    padding: 2rem;
    font-size: 1.5rem;
`

const ImgThumbnail = styled.img`
    aspect-ratio: 16 / 9;
    object-fit: contain;
`

export default Post;
