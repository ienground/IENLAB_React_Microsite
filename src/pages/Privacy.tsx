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

    window.document.title = "개인정보 처리방침 | 아이엔랩 ienlab";

    const appList = [
        { icon: icCalarm, title: "캘람" },
        { icon: icBlogPlanner, title: "블로그 플래너" },
        { icon: icAlbatrossReminder, title: "알바트로스 리마인더" },
    ];

    return (
        <Wrapper>
            <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} darkMode={darkMode} setDarkMode={setDarkMode}/>
            <div id="wrap">
                <TitleBox className="title-wrapper" style={{backgroundImage: `url(${backgroundPrivacy})`}}>
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
                    <PrivacyContent company={"아이엔랩 ienlab"} name={"이현우"} email={"my@ien.zone"} charge={"개발자, 디자이너"} level={"개발자, 디자이너"} date={{year: 2024, month: 2, day: 22}} processPrivacy={false}/>
                </div>
                <LastEdit link={location.pathname}/>
            </div>
            <Footer/>
            <ButtonToTop/>
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
        </Wrapper>
    );
}

export const Wrapper = styled.div`
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
            margin-top: 2rem;
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

                @media ${({ theme }) => theme.device.netbook} {
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
