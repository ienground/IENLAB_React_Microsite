import {ImgIcon, InnerBoxWrapper, TextContentContent, TextContentTitle} from "../Intro/CommonComponent/CommonComponent";
import {Spacer} from "../Component";
import Ripples from "react-ripples";
import {Icon} from "@mui/material";
import icPlayStore from "../../assets/icon/ic_google_play.svg";
import icIosStore from "../../assets/icon/ic_ios_store.svg";
import React from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

interface AppPreviewProps {
    app: {icon: string, title: string, content: string, background: string, showIntro: boolean, page: string, aosLink: string, iosLink: string}
}

function AppPreview({app}: AppPreviewProps) {
    const navigate = useNavigate();

    return (
        <HeaderWrapper onClick={() => navigate(app.page)}>
            <ImgHeader src={app.background} />
            <BoxButtonWrapper>
                <InnerBoxWrapper>
                    <ImgIcon src={app.icon} />
                    <Spacer orientation={"vertical"} size={"1rem"} />
                    <TextContentTitle className={"black background"}>{app.title}</TextContentTitle><br />
                    <TextContentContent fontWeight={"normal"} className={"black medium"}>{app.content}</TextContentContent>
                </InnerBoxWrapper>
                <ButtonLinkWrapper>
                    <Ripples placeholder={"web"}><ImgButton onClick={() => navigate(app.page)}><Icon baseClassName={"material-icons-round"}>language</Icon></ImgButton></Ripples>
                    {app.aosLink !== "" ? <Ripples placeholder={"store"}><ImgButton onClick={() => window.location.href=`https://play.google.com/store/apps/details?id=${app.aosLink}`} style={{backgroundImage: `url(${icPlayStore})`}} /></Ripples> : <></>}
                    {app.iosLink !== "" ? <Ripples placeholder={"store"}><ImgButton onClick={() => window.location.href=`https://apps.apple.com/kr/app/${app.iosLink}`} style={{backgroundImage: `url(${icIosStore})`}} /></Ripples> : <></>}
                </ButtonLinkWrapper>
            </BoxButtonWrapper>
        </HeaderWrapper>
    );
}

const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.colors.colorSurfaceVariant};
    border-radius: 1rem;
    overflow: hidden;
    transition: background-color 0.5s ease, transform 0.5s ease, box-shadow 0.5s ease;

    & > div > :first-child {
        background-color: transparent;
        border-radius: 0;
        flex: 1;

        &:hover {
            transform: none;
            box-shadow: none;
        }
    }

    &:hover {
        transform: translateY(-0.5rem);
        box-shadow: 0 0 40px -0.5rem black;
    }
`

const BoxButtonWrapper = styled.div`
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
        width: 1rem;
        height: 1rem;
        margin: 0.5rem;
        
        & > span {
            font-size: 1rem;
        }
    }
`

export default AppPreview;
