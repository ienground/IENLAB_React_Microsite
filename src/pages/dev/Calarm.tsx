import styled, {useTheme} from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import React, {useEffect, useRef, useState} from "react";
import {AppProps} from "../../App";
import imgCalarmPattern  from "../../assets/img_calarm_pattern.png";
import icCalarm from "../../assets/icon/ic_calarm.png";
import patternBlack from "../../assets/brand/pattern_black.png";
import {Slide} from "react-slideshow-image";
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, getDocs, doc, collection, query, where, DocumentData, Firestore } from "firebase/firestore";
import AppHeader from "../../components/DevPage/Detail/AppHeader";
import {getAppInfo} from "../../utils/FirebaseData";
import ButtonToTop from "../../components/ButtonToTop";
import LastEdit from "../../components/LastEdit";
import {useLocation} from "react-router-dom";
import {Fade, Skeleton} from "@mui/material";
import {TitleBox} from "../../components/Component";
import alarm1 from "../../assets/devpage/calarm/alarm_01.png";
import alarm2 from "../../assets/devpage/calarm/alarm_02.png";
import calendarAlarm1 from "../../assets/devpage/calarm/calendar_alarm_01.png";
import calendarAlarm2 from "../../assets/devpage/calarm/calendar_alarm_02.png";
import cycledTimer1 from "../../assets/devpage/calarm/cycled_timer_01.png";
import cycledTimer2 from "../../assets/devpage/calarm/cycled_timer_02.png";
import timer1 from "../../assets/devpage/calarm/timer_01.png";
import timer2 from "../../assets/devpage/calarm/timer_02.png";
import screensaver1 from "../../assets/devpage/calarm/screensaver_01.png";
import screensaver2 from "../../assets/devpage/calarm/screensaver_02.png";
import stopwatch1 from "../../assets/devpage/calarm/stopwatch_01.png";
import stopwatch2 from "../../assets/devpage/calarm/stopwatch_02.png";

export default function Calarm({darkMode, setDarkMode}: AppProps) {
    const location = useLocation();
    const packageName = "zone.ien.calarm";
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [versionName, setVersionName] = useState("-");
    const [changelog, setChangelog] = useState("-");
    const [isPrepared, setIsPrepared] = useState(false);
    const screenshots = [
        alarm1, calendarAlarm1, timer1, cycledTimer1, stopwatch1, screensaver1
    ];

    window.document.title = "캘람 | 아이엔랩 ienlab";

    const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
    };

    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);

    useEffect(() => {
        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log("intersecting");
                }
            });
        };
        const observer = new IntersectionObserver(observerCallback, {
            threshold: 0.5
        });
        const processing = async () => {
            let result = await getAppInfo(firestore, packageName);
            let versionCode = -1;
            let tempVersionName = "-";
            let tempChangelog = "-";
            result.forEach((data, code) => {
                if (versionCode < Number(code)) {
                    versionCode = Number(code);
                    tempVersionName = data.versionName;
                    tempChangelog = data.changelog;
                }
            })
            setVersionName(tempVersionName);
            setChangelog(tempChangelog);
        };
        processing();
    }, []);

    const appName = "캘람";
    const appDesc = "내 일정을 아는 똑똑한 알람";
    const appColor = "#464670";
    const contents = [
        {
            category: "알람",
            title: "정해진 시간에 알려 줘!",
            content: "알람 및 알람에 종속된 서브 알람을 간편하게 설정하세요.",
            screenshots: [alarm1, alarm2]
        },
        {
            category: "캘린더 알람",
            title: "일정에 맞춰서 똑똑하게",
            content: "내 일정과 교통 상황, 그리고 준비 시간에 맞게 알아서 깨워드려요.",
            screenshots: [calendarAlarm1, calendarAlarm2]
        },
        {
            category: "타이머 루틴",
            title: "홈트레이닝도 간단하게",
            content: "타이머를 묶어서 하나의 루틴으로 저장하세요. 예약도 가능해요.",
            screenshots: [timer1, timer2]
        },
        {
            category: "반복 타이머",
            title: "30분 간격으로 알려 줘!",
            content: "일정한 주기로 알려주기 원할 때, 반복 타이머를 사용해 보세요.",
            screenshots: [cycledTimer1, cycledTimer2]
        },
        {
            category: "스톱워치",
            title: "이모지로 똑똑하게 구분하기",
            content: "랩스도 이모지로 구분하여 기록할 수 있어요. 예약도 가능해요.",
            screenshots: [stopwatch1, stopwatch2]
        },
        {
            category: "탁상시계 및 화면 보호기",
            title: "바쁠 땐 탁상시계로",
            content: "공부나 작업 중에 휴대폰을 탁상시계로 사용할 수 있어요.",
            screenshots: [screensaver1, screensaver2]
        },
    ]

    return (
        <Wrapper color={appColor}>
            <Header className={"app-header"} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} isAppHeaderAvailable={true} darkMode={darkMode} setDarkMode={setDarkMode}/>
            <div id="wrap">
                <TitleBox className={"title-wrapper"} style={{backgroundImage: darkMode ? `url(${patternBlack})` : `url(${imgCalarmPattern})`}}>
                    <div>
                        <div className={"left"}>
                            {/*<div />*/}
                            <div className={"icon"}>
                                <img src={icCalarm}/>
                            </div>
                            <div className={"title"}>
                            <h3 className={"content"}><span>{appDesc}</span></h3>
                                <div className="title">
                                    <h1 className="title"><span>{appName}</span></h1>
                                    <span className="version-wrapper">
                                        <Fade className={"skeleton"} in={versionName === "-"} addEndListener={() => {
                                            setIsPrepared(true);
                                        }}>
                                            <span>
                                                <Skeleton width={40}/>
                                            </span>
                                        </Fade>
                                        <Fade className={"data"} in={isPrepared && versionName !== "-"}>
                                            <span>
                                                {versionName}
                                            </span>
                                        </Fade>
                                    </span>
                                </div>

                            </div>
                        </div>
                        <div className={"right"}>
                            <div>
                                <Slide easing={"ease"} arrows={false}>
                                    {screenshots.map((image) => (
                                        <div className={"each-slide"} style={{backgroundImage: `url(${image})`}}/>
                                    ))}
                                </Slide>
                            </div>
                        </div>
                    </div>
                </TitleBox>
                <AppHeader darkMode={darkMode} packageName={packageName} appIcon={icCalarm} appName={appName} appDesc={appDesc} appVersion={versionName}/>
                {contents.map((value, index) => (
                    <div className={"content-wrapper" + (index % 2 !== 0 ? " reverse" : "") + (index === 0 ? " top" : "")}>
                        <div><div>
                            <div className={"screenshots"}>
                                {value.screenshots.map((screenshot) => (
                                    <div>
                                        <div style={{backgroundImage: `url(${screenshot})`}}/>
                                    </div>
                                ))}
                            </div>
                            <div className={"text"}>
                                <span className={"category"}>{value.category}</span>
                                <span className={"title"}>{value.title}</span>
                                <span className={"content"}>{value.content}</span>
                            </div>
                        </div>
                        </div>
                    </div>
                ))}
                <LastEdit link={location.pathname}/>
            </div>
            <Footer/>
            <ButtonToTop/>
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
        </Wrapper>
    );
}

export const Wrapper = styled.div<{color: string}>`
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
            z-index: 985;
            transition: background-image 0.5s ease;
            
            & > div {
                max-width: 1440px;
                width: 100%;
                height: 100%;
                display: grid;
                grid-template-columns: 1fr 1fr;
                column-gap: 1rem;
                
                & > .left {
                    height: 100%;
                    display: grid;
                    grid-template-rows: 1fr 2fr;
                    overflow: hidden;
                    
                    & > .icon {
                        height: calc(100% - 2rem);
                        padding: 1rem 0;
                        overflow: hidden;
                        
                        & > img {
                            max-height: 100%;
                            height: 6rem;
                        }
                    }
                    
                    & > .title {
                        display: flex;
                        flex-direction: column;
                        padding: 1rem 0;
                        
                        & > .title {
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            
                            & > * {
                                margin-bottom: -0.5rem;
                            }
                            
                            & > h1 {
                                align-items: center;
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

                            & > .version-wrapper {
                                width: fit-content;
                                display: grid;
                                grid-template-columns: 1fr;
                                grid-template-rows: 1fr;
                                transition: border-color 0.5s ease, color 0.5s ease;

                                & > span {
                                    grid-row: 1;
                                    grid-column: 1;
                                    height: fit-content;
                                    padding: 0.5rem;
                                    margin-left: 1rem;
                                    border: 1px ${props => props.theme.colors.colorOnSurface} solid;
                                    border-color: ${props => props.theme.colors.colorOnSurface};
                                    border-radius: 0.5rem;
                                    font-size: large;
                                    font-weight: 700;
                                }

                                & > .skeleton {
                                    z-index: 501;
                                }

                                & > .data {
                                    z-index: 500;
                                }
                            }
                        }
                        
                        & > h3.content {
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
                    }
                }
                
                & > .right {
                    height: 120%;
                    overflow: hidden;
                    padding: 2rem 4rem 0 0;
                    margin: -1rem -4rem 0 0;
                    
                    & > div {
                        height: 100%;
                        aspect-ratio: 18 / 39;
                        margin-left: auto;
                        padding: 0.5rem;
                        border-radius: 1.5rem;
                        background-color: slategray;
                        box-shadow: 0 0 40px -1rem black;
                        
                        & > div {
                            width: 100%;
                            height: 100%;
                            margin: auto;
                            border-radius: 1rem;
                            background-size: cover;
                            background-position: center;
                            background-repeat: no-repeat;
                            
                            & .react-slideshow-container {
                                height: 100%;
                                aspect-ratio: 18 / 39;
                                overflow: hidden;
                                border-radius: 1rem;
                                
                                & > .react-slideshow-wrapper {
                                    height: 100%;
                                    
                                    & .each-slide {
                                        aspect-ratio: 18 / 39;
                                        justify-content: center;
                                        background-size: cover;
                                        background-position: center;
                                        background-repeat: no-repeat;
                                    }
                                }
                            }
                        }
                    }
                }
                
                @media ${({ theme }) => theme.device.pc} {
                    width: calc(100% - 2rem);
                    padding: 0 1rem;
                }
                
                @media ${({ theme }) => theme.device.mobile} {
                    grid-template-columns: none;
                    grid-template-rows: 2fr 5fr;
                    column-gap: initial;
                    overflow: hidden;
                    
                    & > .left {
                        width: 100%;
                        grid-template-rows: 2fr 3fr;
                        
                        & > .icon {
                            height: calc(100% - 1rem);
                            margin: 1rem auto 0 auto;
                            padding: 0;
                        }
                        
                        & > .title {
                            flex-direction: column-reverse;
                            align-items: center;
                            padding: 0;
                            
                            & > .title {

                                & > * {
                                    margin-bottom: initial;
                                }
                            }
                            
                            & > h3.content {
                                margin-top: 0.5rem;
                            }
                        }
                    }
                    
                    & > .right {
                        width: 80%;
                        padding: 2rem 20%;
                        margin: -1rem -10%;
                        
                        & > div {
                            width: calc(100% - 1rem);
                            height: auto;
                            margin-left: initial;
                        }
                    }
                }
            }
        }
        
        & > .content-wrapper {
            width: 100%;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: ${props => props.theme.colors.colorSurfaceVariant};
            transition: background-color 0.5s ease;
            animation: Mount-animation 0.5s ease;
            
            &.top {
                margin-top: 2rem;
            }
            
            & > div {
                max-width: 1440px;
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                
                & > div {
                    width: 100%;
                    aspect-ratio: 17 / 9;
                    overflow: hidden;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 2rem;
                    
                    & > .screenshots {
                        width: 50%;
                        height: 100%;
                        margin-bottom: -4rem;
                        position: relative;
                        
                        & > div {
                            height: calc(100% - 1rem);
                            aspect-ratio: 18 / 39;
                            display: flex;
                            flex-direction: row;
                            position: absolute;
                            top: 2rem;
                            padding: 0.5rem;
                            border-radius: 2vw;
                            background-color: slategray;
                            box-shadow: 0 0 40px -1rem black;
                            
                            & > div {
                                width: 100%;
                                height: 100%;
                                margin: auto;
                                border-radius: calc(2vw - 0.5rem);
                                background-size: cover;
                                background-position: center;
                                background-repeat: no-repeat;
                            }
                        }
                        
                        & > :nth-child(1) {
                            right: 0;
                            z-index: 1;
                        }
                        
                        & > :nth-child(2) {
                            left: 20%;
                            z-index: 0;
                        }
                    }

                    & > .text {
                        width: 50%;
                        display: flex;
                        flex-direction: column;
                        align-items: start;

                        & > span {
                            transition: color 0.5s ease;

                            &.category {
                                font-weight: 700;
                                font-size: large;
                                color: ${props => props.color};
                            }

                            &.title {
                                margin-top: 1rem;
                                font-weight: 700;
                                font-size: xxx-large;
                                word-break: keep-all;
                                color: ${props => props.theme.colors.colorOnSurface};
                            }

                            &.content {
                                margin-top: 1rem;
                                font-weight: 400;
                                word-break: keep-all;
                                color: ${props => props.theme.colors.colorOnSurfaceVariant};
                            }
                        }
                    }
                    
                    @media ${({ theme }) => theme.device.tablet} {
                        & > .text {
                            & > span.title {
                                font-size: xx-large;
                            }
                            
                            & > span.content {
                                font-size: small;
                            }
                        }
                    }
                    
                    @media ${({ theme }) => theme.device.mobile} {
                        aspect-ratio: 9 / 16;
                        flex-direction: column-reverse !important;
                        padding: 0 2rem; 
                        margin: 0 -2rem;
                        gap: 1rem;
                        
                        & > .screenshots {
                            width: 100%;
                            margin-bottom: 0;
                            
                            & > div {
                                width: 60%;
                                height: auto;
                                border-radius: 4vw;

                                & > div {
                                    border-radius: calc(4vw - 0.5rem);
                                }
                            }
                            
                            & > :nth-child(1) {
                                right: initial !important;
                            }

                            & > :nth-child(2) {
                                left: initial !important;
                                right: 0 !important;
                            }
                        }
                        
                        & > .text {
                            width: 100%;
                            align-items: center !important;
                            text-align: center !important;
                            padding-top: 1rem;
                            
                            & > span.category {
                                font-size: x-large;
                            }
                            
                            & > span.title {
                                font-size: xx-large;
                            }
                        }
                    }
                }
            }
            
            &.reverse {
                background-color: ${props => props.theme.colors.colorSurface};
                & > div > div {
                    flex-direction: row-reverse;
                    
                    & > .screenshots {
                        & > :nth-child(1) {
                            left: 0;
                            right: initial;
                        }
                        
                        & > :nth-child(2) {
                            left: initial;
                            right: 20%;
                        }
                    }
                    
                    & > .text {
                        align-items: end;
                        text-align: end;
                    }
                }
            }
            
            @media ${({ theme }) => theme.device.pc} {
                width: calc(100% - 2rem);
                padding: 0 1rem;
            }
        }
    }
`
