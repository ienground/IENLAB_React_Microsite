import {AppProps} from "../../App";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getNoticeboards, getNoticeItem} from "../../utils/FirebaseData";
import Header from "../../components/Header";
import NoticePost from "../../components/Noticeboard/NoticePost";
import LastEdit from "../../components/LastEdit";
import Footer from "../../components/Footer";
import ButtonToTop from "../../components/ButtonToTop";
import Sidebar from "../../components/Sidebar";
import styled, {useTheme} from "styled-components";
import {Fade, Icon, Skeleton} from "@mui/material";
import Ripples from "react-ripples";
import remarkGfm from "remark-gfm";
import Markdown from "../../components/Markdown";
import patternColor from "../../assets/brand/pattern_color.png";
import patternBlack from "../../assets/brand/pattern_black.png";
import LoremIpsum from "react-lorem-ipsum";
import TitleSkeleton from "../../components/Noticeboard/NoticeDetail/TitleSkeleton";
import {TitleBox} from "../../components/Component";

export default function TetrisRPG({darkMode, setDarkMode}: AppProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    window.document.title = "테트리스 RPG | 아이엔랩 ienlab";

    // document.onkeydown = (e: KeyboardEvent) => {
    //     const preventKey = ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"];
    //     console.log(e.key, e.key in preventKey, typeof e.key);
    //     if (preventKey.includes(e.key)) {
    //         console.log("prevent");
    //         e.preventDefault();
    //     }
    // };



    return (
        <Wrapper>
            <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} darkMode={darkMode} setDarkMode={setDarkMode}/>
            <div id="wrap">
                {/*<TitleBox className={"title-wrapper"} style={{backgroundImage: `url(${darkMode ? patternBlack : patternBlack})`}}>*/}
                {/*    <div>*/}
                {/*        <div className={"data"}>*/}
                {/*            <div className="category">category</div>*/}
                {/*            <h3 className="timestamp"><span>create_time?</span></h3>*/}
                {/*            <h1 className="title"><span>title</span></h1>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</TitleBox>*/}
                <div className="content-wrapper">
                    <iframe src={"https://ienground.github.io/TetrisRPG/"} />
                </div>
            </div>
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
            transition: background-image 0.5s ease;
            
            & > div {
                max-width: 1440px;
                width: 100%;
                height: calc(100% - 2rem);
                display: grid;
                grid-template-columns: 1fr;
                grid-template-rows: 1fr;
                padding: 1rem 0;
                
                & > .data {
                    z-index: 500;
                }
                
                & > div {
                    grid-row: 1;
                    grid-column: 1;
                    display: flex;
                    flex-direction: column;
                    
                    & > :first-child {
                        margin-top: auto;
                    }
                    
                    & > div.category {
                        width: fit-content;
                        padding: 0.5rem 1rem;
                        margin-bottom: 1rem;
                        border-radius: 1rem;
                        background-color: ${props => props.theme.colors.colorSurface}80;
                        color: ${props => props.theme.colors.colorOnSurface};
                        transition: background-color 0.5s ease, color 0.5s ease;
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
                    
                    & > h3.timestamp {
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
                            transition: background-color 0.5s ease;
                        }
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
            display: grid;
            grid-template-rows: 1fr;
            grid-template-columns: 1fr;
            //margin-top: 2rem;
            animation: Mount-animation 0.5s ease;
            
            & > iframe {
                width: 100%;
                aspect-ratio: 16 / 9;
            }

            @media ${({ theme }) => theme.device.pc} {
                width: calc(100% - 2rem);
                padding: 0 1rem;
            }
        }
    }
`
