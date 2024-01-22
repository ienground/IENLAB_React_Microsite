import Header from "../components/Header";
import Slideshow from "../components/Main/Slideshow";
import Sidebar from "../components/Sidebar";
import Contact from "../components/Main/Contact";
import Noticeboard from "../components/Main/Noticeboard";
import mainIcon from "../assets/img_logo_typo.png";
import Footer from "../components/Footer";
import "../style/main.css"
import styled from "styled-components";

function Main() {
    return (
        <>
            <Header />
            <TitleWrapper>
                <Title>
                    <TextTitle>Hello Pretendard Title!</TextTitle>
                    <TextDate>IT's date!</TextDate>
                </Title>
                <ImgThumbnail src={mainIcon} />
            </TitleWrapper>
            <Footer />
        </>
    )
}

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 2rem 0 2rem;
    border-radius: 1rem;
    background-color: rebeccapurple;
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

export default Main;
