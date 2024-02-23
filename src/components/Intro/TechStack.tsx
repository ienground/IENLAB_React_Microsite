import styled from "styled-components";
import LoremIpsum from "react-lorem-ipsum";
import {ContentWrapper, ImgIcon, ImgTitleIcon, InnerBoxWrapper, InnerContentWrapper, InnerTitleWrapper, InnerWrapper, TextContentContent, TextContentTitle, TextTitle} from "./CommonComponent/CommonComponent";
import icAndroid from "../../assets/icon/ic_android.svg";
import icWeb from "../../assets/icon/ic_web.png";
import icFirebase from "../../assets/icon/ic_firebase.svg";
import icKotlin from "../../assets/icon/ic_kotlin.svg";
import icGoogleCloud from "../../assets/icon/ic_google_cloud.svg";
import icReact from "../../assets/icon/ic_react.svg";
import icHtml from "../../assets/icon/ic_html.svg";
import icTypescript from "../../assets/icon/ic_typescript.svg";
import icCss from "../../assets/icon/ic_css.svg";
import {Spacer} from "../Component";
import Item from "./TechStack/Item";

export default function TechStack() {
    const techStackList = [
        {
            icon: icAndroid,
            title: "Android",
            content: [
                {
                    icons: [icKotlin],
                    title: "Kotlin",
                    content: "코틀린 설명"
                },
                {
                    icons: [icFirebase],
                    title: "Firebase",
                    content: "파베 설명"
                },
                {
                    icons: [icGoogleCloud],
                    title: "Google Cloud",
                    content: "구글 클라우드 설명"
                },
            ]
        },
        {
            icon: icWeb,
            title: "Web",
            content: [
                {
                    icons: [icReact],
                    title: "React",
                    content: "React 설명"
                },
                {
                    icons: [icHtml, icCss],
                    title: "HTML·CSS",
                    content: "HTML 설명"
                },
                {
                    icons: [icTypescript],
                    title: "Typescript",
                    content: "Typescript 설명"
                },
            ]
        },
    ];

    return (
        <TechStackWrapper>
            <TextTitle>기술 스택</TextTitle>
            <ContentWrapper>
                {techStackList.map((category) => (
                    <InnerWrapper>
                        <InnerTitleWrapper className={"mobile-horizontal"}>
                            <ImgTitleIcon src={category.icon} />
                            <Spacer orientation={"vertical"} size={"1rem"} />
                            <TextContentTitle className={"black xxx-large"} fontWeight={"600"}>{category.title}</TextContentTitle>
                        </InnerTitleWrapper>
                        <InnerContentWrapper>
                            {category.content.map((content) => (
                                <Item item={content} />
                            ))}
                        </InnerContentWrapper>
                    </InnerWrapper>
                ))}
            </ContentWrapper>
        </TechStackWrapper>
    );
}

const TechStackWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1rem 2rem 0 2rem;
    animation: Mount-animation 0.5s ease;
    align-items: start;

    @media ${({ theme }) => theme.device.mobile} {
        flex-direction: column;
        margin: 1rem 1rem 0 1rem;
    }
`
