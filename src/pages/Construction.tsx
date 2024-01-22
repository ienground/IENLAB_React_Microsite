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

function Construction() {
    return (
        <>
            {/*<Header/>*/}
            <PageWrapper style={{backgroundImage: imgPatternBg}}>
                <Title>
                    <ImgLogo src={imgLogoWhite}/>
                    <TextInfo>Under construction :)</TextInfo>
                </Title>
            </PageWrapper>
        </>
    )
}

const PageWrapper = styled.div`
    //display: flex;
    //flex-direction: row;
    background-color: #61dafb;
    width: 100%;
    height: 100vh;
    //aspect-ratio: 16/9;
    background-image: url(${props => props.style?.backgroundImage});
    background-size: cover;
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
`

const ImgPatternBg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    position: relative;
`

const Title = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ImgLogo = styled.img`
    width: 40vh;

`

const TextInfo = styled.div`
    color: white;
    font-size: 2rem;
`

export default Construction;
