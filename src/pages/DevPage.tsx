import {AppProps} from "../App";
import React, {useState} from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import ButtonToTop from "../components/ButtonToTop";
import {appList} from "../data/CommonData";
import AppPreview from "../components/DevPage/AppPreview";

export default function DevPage({darkMode, setDarkMode}: AppProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    window.document.title = "프로젝트 | 아이엔랩 ienlab";

    return (
        <Wrapper>
            <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} darkMode={darkMode} setDarkMode={setDarkMode}/>
            <div id="wrap">
                <div>
                    <div className="title">프로젝트</div>
                    <div className="content-wrapper">
                        {appList.map((category) => (
                            category.content.map((app) => (
                                <AppPreview app={app}/>
                            ))
                        ))}
                    </div>
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
        animation: Mount-animation 0.5s ease;
        
        & > div {
            max-width: 1440px;
            width: 100%;
            display: flex;
            flex-direction: row;
            gap: 2rem;

            & > .title {
                width: 20%;
                position: sticky;
                top: 6.5rem;
                z-index: 100;
                font-weight: 800;
                font-size: xxx-large;
                transition: color 0.5s ease;
            }

            & > .content-wrapper {
                width: 80%;
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-auto-rows: 1fr;
                column-gap: 1rem;
                row-gap: 1rem;
                animation: Mount-animation 0.5s ease;
                
                @media ${({ theme }) => theme.device.tablet} {
                    grid-template-columns: 1fr;
                    grid-auto-rows: initial;
                }
            }
            
            @media ${({ theme }) => theme.device.pc} {
                width: calc(100% - 2rem);
                padding: 0 1rem;
            }
            
            @media ${({ theme }) => theme.device.tablet} {
                flex-direction: column;
            
                & > .title {
                    width: 100%;
                    position: initial;
                }
                
                & > .content-wrapper {
                    width: 100%;
                }
            }
        }
    }
`

const ContentWrapper = styled.div`
    display: grid;
    margin: 0 1rem;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    row-gap: 1rem;

    @media ${({ theme }) => theme.device.mobile} {
        grid-template-columns: 1fr;
    }
`
