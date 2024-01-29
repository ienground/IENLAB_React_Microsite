import styled from "styled-components";
import imgProfile from "../../assets/img_ienground_profile.jpg"
import LoremIpsum from "react-lorem-ipsum";
import {ContentWrapper, TextContentTitle, TextTitle} from "./CommonComponent/CommonComponent";

function AboutMe() {
    return (
        <AboutMeWrapper>
            <TextTitle>소개</TextTitle>
            <ContentWrapper>
                <ImgProfile src={imgProfile} />
                <ContentTextWrapper>
                    <TextContentTitle>안녕하세요👋<br /><span className={"black underline"}>아이엔 IENGROUND</span>입니다.</TextContentTitle>
                    <div style={{marginTop: "1rem"}}>
                        <LoremIpsum p={10} />
                    </div>
                </ContentTextWrapper>
            </ContentWrapper>
        </AboutMeWrapper>
    );
}

const AboutMeWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin: 2rem 2rem 0 2rem;
    animation: Mount-animation 0.5s; 
    align-items: start;
`

const ImgProfile = styled.img`
    width: 30%;
    border-radius: 1rem;
    display: block;
    position: sticky;
    top: 6.5rem;
    object-fit: contain;
`

const ContentTextWrapper = styled.div`
    margin-left: 4rem;
`



export default AboutMe;
