import styled from "styled-components";
import imgProfile from "../../assets/img_ienground_profile.jpg";
import LoremIpsum from "react-lorem-ipsum";
import {Ahref, ContentWrapper, ImgIcon, InnerBoxWrapper, InnerContentWrapper, InnerTitleWrapper, InnerWrapper, TextContentContent, TextContentTitle, TextTitle} from "./CommonComponent/CommonComponent";
import {BrCondition, Spacer} from "../Component";
import icAndroid from "../../assets/ic_android.svg";
import icIllustrator from "../../assets/ic_illustrator.svg";
import icPhotoshop from "../../assets/ic_photoshop.svg";
import icSogang from "../../assets/ic_sogang_univ.svg";
import icFigma from "../../assets/ic_figma.svg";
import icGssh from "../../assets/ic_gssh.webp";

function AboutMe() {
    return (
        <AboutMeWrapper>
            <TextTitle>소개</TextTitle>
            <ContentWrapper>
                <InnerWrapper>
                    <InnerTitleWrapper>
                        <ImgProfile src={imgProfile} />
                        <Spacer orientation={"vertical"} size={"2rem"}/>
                        <TextContentTitle className={"black"} fontWeight={"900"} letterSpacing={"-0.05em"}>이현우</TextContentTitle><br />
                        <Spacer orientation={"vertical"} size={"1rem"} />
                        <Ahref href={"tel:010-4815-7296"}><TextContentContent className={"black x-large"} fontWeight={"600"} letterSpacing={"-0.05em"}>010-4815-7296</TextContentContent></Ahref>
                        <Ahref href={"mailto:my@ien.zone"}><TextContentContent className={"black x-large"} fontWeight={"600"}>my@ien.zone</TextContentContent></Ahref><br />
                    </InnerTitleWrapper>
                    <InnerContentWrapper>
                        <TextContentTitle>안녕하세요👋<br /><span className={"black background"}>아이엔 IENGROUND</span>입니다.</TextContentTitle><br />
                        <Spacer orientation={"vertical"} size={"4rem"} />
                        <TextContentContent fontWeight={"normal"} className={"xx-large"}><span className={"black bold"}>저</span>와 <span className={"black bold"}>다른 사람</span>이 <span className={"black bold"}>필요한 것</span>에 관심을 가지고 <span className={"red bold underline"}>만드는 것</span>을 좋아합니다.<br />
                            <span className={"red bold underline"}>간단한 것이 최고</span>라는 마음 아래, 생활 속 불편함을 해결하기 위한 다양한 시도를 하고 있습니다.
                        </TextContentContent>
                        <Spacer orientation={"vertical"} size={"1rem"} />
                        <TextContentContent>INTJ / 성격 좀 적당히 써보자.</TextContentContent>
                        <Spacer orientation={"vertical"} size={"2rem"} />
                        <InnerBoxWrapper>
                            <ImgIcon src={icAndroid} />
                            <Spacer orientation={"vertical"} size={"1rem"} />
                            <TextContentTitle className={"black background"}>Android 개발</TextContentTitle><br />
                            <TextContentContent fontWeight={"normal"} className={"black medium"}>2017년부터</TextContentContent>
                        </InnerBoxWrapper>
                        <Spacer orientation={"vertical"} size={"2rem"} />
                        <InnerBoxWrapper>
                            <ImgIcon src={icPhotoshop} style={{marginRight: "1rem"}}/>
                            <ImgIcon src={icIllustrator} style={{marginRight: "1rem"}}/>
                            <ImgIcon src={icFigma} />
                            <Spacer orientation={"vertical"} size={"1rem"} />
                            <TextContentTitle className={"black background"}>그래픽, UI·UX 디자인</TextContentTitle><br />
                            <TextContentContent fontWeight={"normal"} className={"black medium"}>2016년부터</TextContentContent>
                        </InnerBoxWrapper>
                        <Spacer orientation={"vertical"} size={"2rem"} />
                        <InnerBoxWrapper>
                            <ImgIcon src={icSogang} />
                            <Spacer orientation={"vertical"} size={"1rem"} />
                            <TextContentTitle className={"black background"}>서강대학교 </TextContentTitle><TextContentContent fontWeight={"bolder"} className={"black xx-large"}>아트&테크놀로지학과</TextContentContent><br />
                            <TextContentContent fontWeight={"normal"} className={"black medium"}>2020년 입학 / 컴퓨터공학과 복수전공</TextContentContent>
                        </InnerBoxWrapper>
                    </InnerContentWrapper>
                </InnerWrapper>
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

    @media ${({ theme }) => theme.device.mobile} {
        flex-direction: column;
        margin: 1rem 1rem 0 1rem;
    }
`

const ImgProfile = styled.img`
    width: 100%;
    border-radius: 1rem;
    object-fit: contain;
`

export default AboutMe;
