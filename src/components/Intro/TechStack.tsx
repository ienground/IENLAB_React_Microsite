import styled from "styled-components";
import LoremIpsum from "react-lorem-ipsum";
import {ContentWrapper, ImgIcon, ImgTitleIcon, InnerBoxWrapper, InnerContentWrapper, InnerTitleWrapper, InnerWrapper, TextContentContent, TextContentTitle, TextTitle} from "./CommonComponent/CommonComponent";
import icAndroid from "../../assets/ic_android.svg";
import icWeb from "../../assets/ic_web.png";
import icFirebase from "../../assets/ic_firebase.svg";
import icKotlin from "../../assets/ic_kotlin.svg";
import icGoogleCloud from "../../assets/ic_google_cloud.svg";
import icReact from "../../assets/ic_react.svg";
import icHtml from "../../assets/ic_html.svg";
import icTypescript from "../../assets/ic_typescript.svg";
import icCss from "../../assets/ic_css.svg";
import {Spacer} from "../Component";

function TechStack() {
    return (
        <TechStackWrapper>
            <TextTitle>기술 스택</TextTitle>
            <ContentWrapper>
                <InnerWrapper>
                    <InnerTitleWrapper className={"mobile-horizontal"}>
                        <ImgTitleIcon src={icAndroid} />
                        <Spacer orientation={"vertical"} size={"1rem"} />
                        <TextContentTitle className={"black xxx-large"} fontWeight={"600"}>Android</TextContentTitle>
                    </InnerTitleWrapper>
                    <InnerContentWrapper>
                        <InnerBoxWrapper>
                            <ImgIcon src={icKotlin} />
                            <Spacer orientation={"vertical"} size={"1rem"} />
                            <TextContentTitle className={"black background"}>Kotlin</TextContentTitle><br />
                            <TextContentContent fontWeight={"normal"} className={"black medium"}>쓸 줄 아는 것들을 적어야 하나.</TextContentContent>
                        </InnerBoxWrapper>
                        <Spacer orientation={"vertical"} size={"2rem"} />
                        <InnerBoxWrapper>
                            <ImgIcon src={icFirebase} />
                            <Spacer orientation={"vertical"} size={"1rem"} />
                            <TextContentTitle className={"black background"}>Firebase</TextContentTitle><br />
                            <TextContentContent fontWeight={"normal"} className={"black medium"}>쓸 줄 아는 것들을 적어야 하나.</TextContentContent>
                        </InnerBoxWrapper>
                        <Spacer orientation={"vertical"} size={"2rem"} />
                        <InnerBoxWrapper>
                            <ImgIcon src={icGoogleCloud} />
                            <Spacer orientation={"vertical"} size={"1rem"} />
                            <TextContentTitle className={"black background"}>Google Cloud</TextContentTitle><br />
                            <TextContentContent fontWeight={"normal"} className={"black medium"}>쓸 줄 아는 것들을 적어야 하나.</TextContentContent>
                        </InnerBoxWrapper>
                    </InnerContentWrapper>
                </InnerWrapper>
                <InnerWrapper>
                    <InnerTitleWrapper className={"mobile-horizontal"}>
                        <ImgTitleIcon src={icWeb} />
                        <Spacer orientation={"vertical"} size={"1rem"} />
                        <TextContentTitle className={"black xxx-large"} fontWeight={"600"}>Web</TextContentTitle>
                    </InnerTitleWrapper>
                    <InnerContentWrapper>
                        <InnerBoxWrapper>
                            <ImgIcon src={icReact} />
                            <Spacer orientation={"vertical"} size={"1rem"} />
                            <TextContentTitle className={"black background"}>React</TextContentTitle><br />
                            <TextContentContent fontWeight={"normal"} className={"black medium"}>쓸 줄 아는 것들을 적어야 하나.</TextContentContent>
                        </InnerBoxWrapper>
                        <Spacer orientation={"vertical"} size={"2rem"} />
                        <InnerBoxWrapper>
                            <ImgIcon src={icHtml} style={{marginRight: "1rem"}} />
                            <ImgIcon src={icCss} />
                            <Spacer orientation={"vertical"} size={"1rem"} />
                            <TextContentTitle className={"black background"}>HTML·CSS</TextContentTitle><br />
                            <TextContentContent fontWeight={"normal"} className={"black medium"}>쓸 줄 아는 것들을 적어야 하나.</TextContentContent>
                        </InnerBoxWrapper>
                        <Spacer orientation={"vertical"} size={"2rem"} />
                        <InnerBoxWrapper>
                            <ImgIcon src={icTypescript} />
                            <Spacer orientation={"vertical"} size={"1rem"} />
                            <TextContentTitle className={"black background"}>Typescript</TextContentTitle><br />
                            <TextContentContent fontWeight={"normal"} className={"black medium"}>쓸 줄 아는 것들을 적어야 하나.</TextContentContent>
                        </InnerBoxWrapper>
                    </InnerContentWrapper>
                </InnerWrapper>
            </ContentWrapper>
        </TechStackWrapper>
    );
}

const TechStackWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1rem 2rem 0 2rem;
    animation: Mount-animation 0.5s;
    align-items: start;

    @media ${({ theme }) => theme.device.mobile} {
        flex-direction: column;
        margin: 1rem 1rem 0 1rem;
    }
`

export default TechStack;
