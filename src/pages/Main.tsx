import Header from "../components/Header";
import Slideshow from "../components/Main/Slideshow";
import Sidebar from "../components/Sidebar";
import Contact from "../components/Main/Contact";
import Noticeboard from "../components/Main/Noticeboard";
import Footer from "../components/Footer";
import "../style/main.css"
import styled from "styled-components";

function Main() {
    return (
        <>
            <Header />
            <Slideshow />
            <NoticeContactWrapper>
                <Noticeboard />
                <Contact />
            </NoticeContactWrapper>
            <Sidebar />
            <Footer />
        </>
    )
}

const NoticeContactWrapper = styled.div`
    display: flex;
`

export default Main;
