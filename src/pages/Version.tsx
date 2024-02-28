import {AppProps} from "../App";
import React, {useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ButtonToTop from "../components/ButtonToTop";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import patternColor from "../assets/brand/pattern_color.png";
import patternBlack from "../assets/brand/pattern_black.png";
import {TitleBox} from "../components/Component";
import {LastEditData} from "../data/LastEditData";

export default function Version({darkMode, setDarkMode}: AppProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const date = new Date();
    const data = LastEditData.get("/version");

    if (data !== undefined) {
        date.setFullYear(data[0], data[1] - 1, data[2]);
        date.setHours(data[3], data[4], 0);
    }

    window.document.title = `버전 ${process.env.REACT_APP_VERSION} | 아이엔랩 ienlab`;

    return (
        <Wrapper>
            <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} darkMode={darkMode} setDarkMode={setDarkMode}/>
            <div id="wrap">
                <TitleBox className={"title-wrapper"} style={{backgroundImage: `url(${darkMode ? patternBlack : patternColor})`}}>
                    <div>
                        <h3 className="timestamp"><span>{date.toLocaleString()}</span></h3>
                        <h1 className="title"><span>{process.env.REACT_APP_VERSION}</span></h1>
                    </div>
                </TitleBox>
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
        animation: Mount-animation 0.5s ease;
        
        & > .title-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-color: ${props => props.theme.colors.common.darkBlue};
            z-index: 985;
            transition: background-color 0.5s ease;

            & > div {
                max-width: 1440px;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                padding: 1rem 0;

                & > h1.title {
                    margin-bottom: -0.5rem;
                    font-weight: 800;
                    font-size: xxx-large;
                    word-break: keep-all;
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
                    margin-top: auto;
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

                @media ${({ theme }) => theme.device.pc} {
                    width: calc(100% - 2rem);
                    padding: 1rem;
                }
            }
        }
        
        
    }
`
