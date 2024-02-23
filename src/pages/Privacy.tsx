import {AppProps} from "../App";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';
import Header from "../components/Header";
import Footer from "../components/Footer";
import ButtonToTop from "../components/ButtonToTop";
import Sidebar from "../components/Sidebar";
import LastEdit from "../components/LastEdit";
import styled from "styled-components";
import icCalarm from "../assets/icon/ic_calarm.png";
import icBlogPlanner from "../assets/icon/ic_blogplanner.png";
import icAlbatrossReminder from "../assets/icon/ic_albatross_reminder.png";
import backgroundPrivacy from "../assets/background_ienlab.png"
import PrivacyContent from "../components/Privacy/PrivacyContent";
import {TitleBox} from "../components/Component";

export default function Privacy({darkMode, setDarkMode}: AppProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const appList = [
        { icon: icCalarm, title: "캘람" },
        { icon: icBlogPlanner, title: "블로그 플래너" },
        { icon: icAlbatrossReminder, title: "알바트로스 리마인더" },
    ];

    // return (
    //     <>
    //         <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} darkMode={darkMode} setDarkMode={setDarkMode}/>
    //         <Title>
    //             <div className={"wrapper"}>
    //                 <h3 className={"description"}><span>운영 어플리케이션을 위한 공통 버전</span></h3>
    //                 <h1 className={"title"}><span>개인정보 처리방침</span></h1>
    //             </div>
    //         </Title>
    //         <ContentWrapper>
    //             <div className={"wrapper"}>
    //                 <div className={"title"}>적용되는 서비스 범위</div>
    //                 <div className={"content list"}>
    //                     {appList.map((app) => (
    //                         <ServiceApp>
    //                             <img src={app.icon}/>
    //                             <div>{app.title}</div>
    //                         </ServiceApp>
    //                     ))}
    //                 </div>
    //             </div>
    //             <PrivacyContent />
    //         </ContentWrapper>
    //         <LastEdit link={location.pathname}/>
    //         <Footer/>
    //         <ButtonToTop/>
    //         <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
    //     </>
    // );

    return (
        <Wrapper>
            <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} darkMode={darkMode} setDarkMode={setDarkMode}/>
            <div id="wrap">
                <TitleBox className="title-wrapper">
                    <div>
                        <h3 className={"description"}><span>운영 어플리케이션을 위한 공통 버전</span></h3>
                        <h1 className={"title"}><span>개인정보 처리방침</span></h1>
                    </div>
                </TitleBox>
                <div className="content-wrapper">
                    <div className="title">적용되는 서비스 범위</div>
                    <div className="list">
                        {appList.map((app) => (
                            <div>
                                <img src={app.icon} />
                                <div>{app.title}</div>
                            </div>
                        ))}
                    </div>
                    <PrivacyContent />
                </div>
            </div>
            <LastEdit link={location.pathname}/>
            <Footer/>
            <ButtonToTop/>
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    & > #wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        & > .title-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-image: url(${backgroundPrivacy});
            transition: background-image 0.5s ease;
            
            & > div {
                max-width: 1440px;
                width: 100%;
                height: calc(100% - 2rem);
                display: flex;
                flex-direction: column;
                padding: 1rem 0;
                
                & > :first-child {
                    margin-top: auto;
                }
                
                & > h1.title {
                        margin-bottom: -0.5rem;
                        font-weight: 800;
                        font-size: xxx-large;
                        word-break: break-all;
                        color: ${props => props.theme.colors.colorSurface};
                        transition: color 0.5s ease;
                        
                        & > span {
                            padding: 0.5rem;
                            box-decoration-break: clone;
                            -webkit-box-decoration-break: clone;
                            line-height: 2;
                            background-color: ${props => props.theme.colors.colorOnSurface};
                            
                            transition: background-color 0.5s ease;
                        }

                        @media ${({ theme }) => theme.device.tablet} {
                            font-size: xx-large;
                        }
                    }
                    
                    & > h3.description {
                        font-weight: 500;
                        font-size: medium;
                        word-break: break-all;
                        color: ${props => props.theme.colors.colorSurface};
                        transition: color 0.5s ease;

                        & > span {
                            padding: 0.5rem;
                            box-decoration-break: clone;
                            -webkit-box-decoration-break: clone;
                            line-height: 2;
                            background-color: ${props => props.theme.colors.colorOnSurface};
                        }
                    }

                @media ${({ theme }) => theme.device.pc} {
                    width: calc(100% - 2rem);
                    padding: 1rem;
                }
            }
        }
        
        & > .content-wrapper {
            max-width: 1440px;
            width: 100%;
            margin-top: 1rem;
            animation: Mount-animation 0.5s ease;
            
            & > .title {
                font-size: xxx-large;
                font-weight: 800;
                word-break: keep-all;
                transition: color 0.5s ease;

                @media ${({ theme }) => theme.device.tablet} {
                    font-size: xx-large;
                }
            }
            
            & > .list {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                grid-auto-rows: 1fr;
                column-gap: 1rem;
                row-gap: 1rem;
                margin-top: 1rem;
                
                & > div {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                    border-radius: 1rem;
                    background-color: ${props => props.theme.colors.colorSurfaceVariant};
                    transition: background-color 0.5s ease;
                    
                    & > img {
                        width: 4rem;
                        height: min-content;
                    }
                    
                    & > div {
                        margin-top: 1rem;
                        font-weight: 700;
                        font-size: xx-large;
                        text-align: center;
                        word-break: keep-all;
                        transition: color 0.5s ease;
                    }
                }

                @media ${({ theme }) => theme.device.laptop} {
                    grid-template-columns: repeat(4, 1fr);
                }

                @media ${({ theme }) => theme.device.tablet} {
                    grid-template-columns: repeat(3, 1fr);
                    & > div {
                        & > img {
                            width: 2rem;
                        }
                        & > div {
                            font-size: x-large;
                        }
                    }
                }

                @media ${({ theme }) => theme.device.mobile} {
                    grid-template-columns: repeat(2, 1fr);
                }
            }

            @media ${({ theme }) => theme.device.pc} {
                width: calc(100% - 2rem);
                padding: 0 1rem;
            }
        }
    }
`

const Title = styled.div`
    width: calc(100% - 2rem);
    margin: 0 1rem;
    aspect-ratio: 32 / 9;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${backgroundPrivacy});
    animation: Mount-animation 0.5s ease;

    .wrapper {
        width: 60%;
        margin-top: auto;
        margin-bottom: 0.5rem;
        display: flex;
        flex-direction: column;
        vertical-align: bottom;
        
        & > h1.title {
            width: 60%;
            font-weight: bolder;
            font-size: 3vmax;
            word-break: break-all;
            transition: color 0.5s ease;
    
            span {
                background-color: ${props => props.theme.colors.colorOnSurface};
                color: ${props => props.theme.colors.colorSurface};
                padding: 0.5rem;
                box-decoration-break: clone;
                -webkit-box-decoration-break: clone;
                line-height: 2;
                transition: background-color 0.5s ease, color 0.5s ease;
            }
    
            @media ${({theme}) => theme.device.tablet} {
                width: 100%;
                font-size: xx-large;
    
                span {
                    padding: 0.25rem;
                }
            }
        }
    
        & > h3.description {
            width: 60%;
            margin-top: auto;
    
            span {
                background-color: ${props => props.theme.colors.colorOnSurface};
                color: ${props => props.theme.colors.colorSurface};
                padding: 0.5rem;
                box-decoration-break: clone;
                -webkit-box-decoration-break: clone;
                line-height: 2;
                transition: background-color 0.5s ease, color 0.5s ease;
            }
    
            @media ${({theme}) => theme.device.tablet} {
                width: 100%;
                font-size: small;
    
                span {
                    padding: 0.25rem;
                }
            }
        }

        @media ${({ theme }) => theme.device.tablet} {
            width: calc(100% - 2rem);
            padding: 0 1rem;
        }
    }

    @media ${({ theme }) => theme.device.mobile} {
        aspect-ratio: 9 / 16;
    }
`

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0rem 1rem 0 1rem;
    width: calc(100% - 2rem);
    align-items: center;
    animation: Mount-animation 0.5s ease;

    & > .wrapper {
        width: 60%;
        display: flex;
        flex-direction: column;
        margin-top: 2rem;

        @media ${({ theme }) => theme.device.tablet} {
            width: 100%;
        }

        & > .title {
            width: 100%;
            font-weight: bolder;
            font-size: xx-large;
            word-break: keep-all;
            transition: color 0.5s ease;

            @media ${({ theme }) => theme.device.mobile} {
                width: 100%;
                position: relative;
                font-size: xxx-large;
                top: 0;
            }
        }

        & > .content {
            width: 100%;
            margin-top: 1rem;
            word-break: keep-all;
            @media ${({ theme }) => theme.device.mobile} {
                width: 100%;
                margin-left: 0;
            }
        }
        
        & > .list {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            column-gap: 1rem;
            grid-auto-rows: 1fr;
            row-gap: 1rem;

            @media ${({ theme }) => theme.device.laptop} {
                grid-template-columns: repeat(3, 1fr);
            }

            @media ${({ theme }) => theme.device.mobile} {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    }
`

const ServiceApp = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.colors.colorSurfaceVariant};
    border-radius: 1rem;
    padding: 1rem;
    transition: background-color 0.5s ease;
    
    & > img {
        width: 4rem;
        height: min-content;
    }

    & > div {
        margin-top: 1rem;
        font-weight: 700;
        font-size: xx-large;
        text-align: center;
        transition: color 0.5s ease;
    }

    @media ${({ theme }) => theme.device.mobile} {
        & > img {
            width: 2rem;
        }
        & > div {
            font-size: large;
        }
    }
`
