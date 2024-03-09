import Ripples from "react-ripples";
import {Icon} from "@mui/material";
import icPlayStore from "../../assets/icon/ic_google_play.svg";
import icIosStore from "../../assets/icon/ic_ios_store.svg";
import icGitHub from "../../assets/icon/ic_github.svg";
import icGitHubDark from "../../assets/icon/ic_github_dark.svg";
import React from "react";
import {useNavigate} from "react-router-dom";
import styled, {useTheme} from "styled-components";

interface AppPreviewProps {
    app: {icon: string, title: string, content: string, background: string, showIntro: boolean, page: string, aosLink: string, iosLink: string, gitLink: string}
}

export default function AppPreview({app}: AppPreviewProps) {
    const navigate = useNavigate();
    const theme = useTheme();
    const darkMode = (theme.name === "dark");

    return (
        <Wrapper onClick={() => navigate(app.page)} className={"link"}>
            <img src={app.background}/>
            <div>
                <div className={"info"}>
                    <img src={app.icon}/>
                    <div className="title">{app.title}</div>
                    <div className="content">{app.content}</div>
                </div>
                <div className={"buttons"}>
                    <Ripples placeholder={"web"}>
                        <button onClick={() => navigate(app.page)}>
                            <Icon baseClassName={"material-icons-round"}>language</Icon></button>
                    </Ripples>
                    {app.aosLink !== "" ? <Ripples placeholder={"store"}>
                        <button onClick={() => window.location.href = `https://play.google.com/store/apps/details?id=${app.aosLink}`} style={{backgroundImage: `url(${icPlayStore})`}}/>
                    </Ripples> : <></>}
                    {app.iosLink !== "" ? <Ripples placeholder={"store"}>
                        <button onClick={() => window.location.href = `https://apps.apple.com/kr/app/${app.iosLink}`} style={{backgroundImage: `url(${icIosStore})`}}/>
                    </Ripples> : <></>}
                    {app.gitLink !== "" ? <Ripples placeholder={"store"}>
                        <button onClick={() => window.location.href = `https://github.com/${app.gitLink}`} style={{backgroundImage: `url(${darkMode ? icGitHubDark : icGitHub})`}}/>
                    </Ripples> : <></>}
                </div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0;
    overflow: hidden;
    border-radius: 1rem;
    background-color: ${props => props.theme.colors.colorSurfaceVariant};
    transition: background-color 0.5s ease;

    & img {
        max-width: none;
        max-height: none;
    }

    & > img {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
    }

    & > div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 1rem;

        & > .info {

            & > img {
                width: 4rem;
            }

            & > .title {
                margin-top: 1rem;
                font-weight: 700;
                font-size: xx-large;
                color: ${props => props.theme.colors.colorOnSurface};
                transition: color 0.5s ease;
            }

            & > .content {
                margin-top: 0.5rem;
                font-size: medium;
                font-weight: 400;
                color: ${props => props.theme.colors.colorOnSurface};
                transition: color 0.5s ease;
            }
        }

        & > .buttons {
            height: fit-content;
            display: flex;
            flex-direction: row;
            margin-top: auto;

            & > div {
                border-radius: 5rem;
                transition: background-color 0.5s ease;

                @media (hover: hover) and (pointer: fine) {
                    &:hover {
                        background-color: rgba(0, 0, 0, 0.1);
                    }
                }
                
                & > button {
                    width: 2rem;
                    height: 2rem;
                    position: relative;
                    margin: 1rem;
                    background-color: transparent;
                    background-size: contain;
                    background-position: center;
                    background-repeat: no-repeat;

                    & > span {
                        position: absolute;
                        top: 0;
                        left: 0;
                        font-size: 2rem;
                        transition: color 0.5s ease;
                        color: ${props => props.theme.colors.colorOnSurface};
                    }

                    @media ${({ theme }) => theme.device.laptop} {
                        width: 1.5rem;
                        height: 1.5rem;
                        margin: 0.5rem;

                        & > span {
                            font-size: 1.5rem;
                        }
                    }
                }
            }
            
            @media ${({ theme }) => theme.device.laptop} {
                flex-direction: column;
                align-items: start;
                margin-top: 0;
            }
        }
    }
`
