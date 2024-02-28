import styled, {useTheme} from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import React, {useEffect, useRef, useState} from "react";
import {AppProps} from "../../App";
import imgBlogPlannerPattern  from "../../assets/img_blogplanner_pattern.png";
import icBlogPlanner from "../../assets/icon/ic_blogplanner.png";
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
import bg1 from "../../assets/devpage/blogplanner/bp1.png";
import bg2 from "../../assets/devpage/blogplanner/bp2.png";
import bg3 from "../../assets/devpage/blogplanner/bp3.png";
import bg4 from "../../assets/devpage/blogplanner/bp4.png";
import bg5 from "../../assets/devpage/blogplanner/bp5.png";
import bg6 from "../../assets/devpage/blogplanner/bp6.png";
import {Wrapper} from "./Calarm";

export default function BlogPlanner({darkMode, setDarkMode}: AppProps) {
    const location = useLocation();
    const packageName = "net.ienlab.blogplanner";
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [versionName, setVersionName] = useState("-");
    const [changelog, setChangelog] = useState("-");
    const [isPrepared, setIsPrepared] = useState(false);
    const screenshots = [
        bg1, bg2, bg3, bg4, bg5, bg6
    ];

    window.document.title = "블로그 플래너 | 아이엔랩 ienlab";

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

    const appName = "블로그 플래너";
    const appDesc = "규칙적인 블로그 생활을 위해";
    const appColor = "#FF4081";
    const contents = [
        {
            category: "홈",
            title: "한 눈에 내 블로그 파악",
            content: "첫 화면에서 내 블로그의 현황을 확인하세요.",
            screenshots: [bg1, bg1]
        },
        {
            category: "목표",
            title: "포스팅은 계획대로.",
            content: "포스팅 목표를 세우면 목표 및 마감 시간 전에 알려드려요.",
            screenshots: [bg2, bg2]
        },
        {
            category: "작성 글 및 순위",
            title: "내 글은 얼마나 위에 있을까?",
            content: "작성 글을 확인하고 태그를 클릭해 검색엔진 순위를 볼 수 있어요.",
            screenshots: [bg3, bg3]
        },
        {
            category: "목표 추가",
            title: "약속된 글은 잊지 않게.",
            content: "계정별로 작성 예정 및 마감 시각을 설정하여 목표를 세울 수 있어요.",
            screenshots: [bg4, bg4]
        },
        {
            category: "1일 N포스팅 리마인드",
            title: "1일 1포스팅 어렵지 않아요.",
            content: "1일 N포스팅 연속 달성을 위한 리마인더를 제공해요.",
            screenshots: [bg5, bg5]
        },
        {
            category: "위젯",
            title: "오늘은 몇 명이 방문했을까?",
            content: "방문자수 위젯 및 목표 달성률 그래프 위젯을 사용해 보세요.",
            screenshots: [bg6, bg6]
        },
    ]

    return (
        <Wrapper color={appColor}>
            <Header className={"app-header"} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} isAppHeaderAvailable={true} darkMode={darkMode} setDarkMode={setDarkMode}/>
            <div id="wrap">
                <TitleBox className={"title-wrapper"} style={{backgroundImage: darkMode ? `url(${patternBlack})` : `url(${imgBlogPlannerPattern})`}}>
                    <div>
                        <div className={"left"}>
                            {/*<div />*/}
                            <div className={"icon"}>
                                <img src={icBlogPlanner}/>
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
                <AppHeader darkMode={darkMode} packageName={packageName} appIcon={icBlogPlanner} appName={appName} appDesc={appDesc} appVersion={versionName}/>
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
