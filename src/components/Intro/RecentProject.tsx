import styled from "styled-components";
import {ContentWrapper, ImgIcon, ImgTitleIcon, InnerBoxWrapper, InnerContentWrapper, InnerTitleWrapper, InnerWrapper, TextContentContent, TextContentTitle, TextTitle} from "./CommonComponent/CommonComponent";
import icAndroid from "../../assets/ic_android.svg";
import {Spacer} from "../Component";
import backgroundCalarm from "../../assets/background_calarm.png";
import icReact from "../../assets/ic_react.svg";
import icAppCalarm from "../../assets/ic_app_calarm.png";
import icWeb from "../../assets/ic_web.png";
import icPlayStore from "../../assets/ic_google_play.svg";
import {useNavigate} from "react-router-dom";
import Ripples from "react-ripples";
import {Icon} from "@mui/material";
import React from "react";

function RecentProject() {
    let navigate = useNavigate();

    return (
        <RecentProjectWrapper>
            <TextTitle>프로젝트</TextTitle>
            <ContentWrapper>
                <InnerWrapper>
                    <InnerTitleWrapper className={"mobile-horizontal"}>
                        <ImgTitleIcon src={icAndroid} />
                        <Spacer orientation={"vertical"} size={"1rem"} />
                        <TextContentTitle className={"black xxx-large"} fontWeight={"600"}>Android</TextContentTitle>
                    </InnerTitleWrapper>
                    <InnerContentWrapper>
                        <InnerHeaderWrapper>
                            <ImgHeader src={backgroundCalarm} />
                            <InnerBoxButtonWrapper>
                                <InnerBoxWrapper>
                                    <ImgIcon src={icAppCalarm} />
                                    <Spacer orientation={"vertical"} size={"1rem"} />
                                    <TextContentTitle className={"black background"}>캘람</TextContentTitle><br />
                                    <TextContentContent fontWeight={"normal"} className={"black medium"}>내 일정을 아는 똑똑한 알람</TextContentContent>
                                </InnerBoxWrapper>
                                <ButtonLinkWrapper>
                                    <Ripples placeholder={"web"}><ImgButton onClick={() => navigate("/calarm")}><Icon baseClassName={"material-icons-round"}>language</Icon></ImgButton></Ripples>
                                    <Ripples placeholder={"store"}><ImgButton onClick={() => window.location.href='https://play.google.com/store/apps/details?id=zone.ien.calarm'} style={{backgroundImage: icPlayStore}} /></Ripples>
                                </ButtonLinkWrapper>
                            </InnerBoxButtonWrapper>
                        </InnerHeaderWrapper>
                    </InnerContentWrapper>
                </InnerWrapper>
            </ContentWrapper>
        </RecentProjectWrapper>
    );
}

const RecentProjectWrapper = styled.div`
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

const TechStackWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1rem 2rem 0 2rem;
    animation: Mount-animation 0.5s;
    align-items: start;
`

const InnerHeaderWrapper = styled.div`
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

const InnerBoxButtonWrapper = styled.div`
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
        width: 1.5rem;
        height: 1.5rem;
        margin: 0.5rem;
        
        & > span {
            font-size: 1.5rem;
        }
    }
`

export default RecentProject;
