import Header from "../components/Header";
import Slideshow from "../components/Main/Slideshow";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../style/main.css"
import styled from "styled-components";
import {Icon} from "@mui/material";
import React, {useState} from "react";
import {AppProps} from "../App";
import ButtonToTop from "../components/ButtonToTop";
import {useNavigate} from "react-router-dom";
import imgIengroundProfile from "../assets/image/img_ienground_profile_main.png";
import patternColor from "../assets/brand/pattern_color.png";

export default function Main({darkMode, setDarkMode}: AppProps) {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    window.document.title = "아이엔랩 ienlab";

    return (
        <Wrapper>
            <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} darkMode={darkMode} setDarkMode={setDarkMode}/>
            <div id={"wrap"}>
                <Slideshow />
                <div className={"content"}>
                    <div className={"left"}>
                        <img src={imgIengroundProfile}/>
                        <div>
                            <h1><span>This is IENGROUND</span></h1>
                        </div>
                        <button onClick={() => {
                            navigate("/intro");
                        }}><Icon baseClassName={"material-icons-round"}>arrow_forward</Icon></button>
                    </div>
                    <div className="right">
                        <div>
                            <h1><span>브랜드 아이덴티티</span></h1>
                        </div>
                        <button onClick={() => {
                            navigate("/brand");
                        }}><Icon baseClassName={"material-icons-round"}>arrow_forward</Icon></button>
                    </div>
                </div>
            </div>
            <Footer/>
            <ButtonToTop/>
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    & > #wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        & > .content {
            max-width: 1440px;
            width: 100%;
            display: flex;
            flex-direction: row;
            gap: 2rem;
            margin-top: 2rem;
            animation: Mount-animation 0.5s ease;
            
            & > .left, & > .right {
                display: flex;
                flex-direction: row;
                align-items: end;
                gap: 1rem;
                position: relative;
                overflow: hidden;
                border-radius: 1rem;
                padding: 1rem;

                & > div {
                    flex-grow: 1;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    z-index: 501;
                    
                    & > :first-child {
                        margin-top: auto;
                    }

                    & > h1, h3 {
                        & > span {
                            padding: 0.5rem;
                            line-height: 2;
                            background-color: black;
                            color: white;
                            word-break: keep-all;
                            box-decoration-break: clone;
                            -webkit-box-decoration-break: clone;
                        }
                    }

                    & > h1 {
                        font-size: xx-large;
                        font-weight: 700;
                    }

                    @media ${({ theme }) => theme.device.mobile} {
                        justify-content: space-between;

                        & > h3 {
                            font-size: x-small;

                            & > span {
                                padding: 0.25rem;
                            }
                        }

                        & > h1 {
                            font-size: x-large;
                        }
                    }
                }

                & > img {
                    height: 90%;
                    position: absolute;
                    right: 0;
                    bottom: 0;
                }
            }
            
            & > .left {
                width: calc(60% - 2rem);
                height: calc(16rem - 2rem);
                background-color: #dceffd;
            }
            
            & > .right {
                width: calc(40% - 2rem);
                height: calc(16rem - 2rem);
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                background-image: url(${patternColor});
            }

            button {
                width: 3rem;
                height: 3rem;
                background-color: ${props => props.theme.colors.colorSurface};
                border-radius: 3rem;
                z-index: 500;
                transition: background-color 0.5s ease;

                & > span {
                    color: ${props => props.theme.colors.colorOnSurface};
                    transition: color 0.5s ease;
                }
            }

            @media ${({ theme }) => theme.device.pc} {
                & > .left {
                    width: calc(60% - 3rem);
                    margin-left: 1rem;
                }
                
                & > .right {
                    width: calc(40% - 3rem);
                    margin-right: 1rem;
                }
            }

            @media ${({ theme }) => theme.device.tablet} {
                flex-direction: column;
                
                & > .left, & > .right {
                    width: calc(100% - 4rem);
                    margin: 0 1rem;
                }
            }
        }
    }
`
