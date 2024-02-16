import styled, {useTheme} from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import React, {useEffect, useRef, useState} from "react";
import {AppProps} from "../../App";
import imgCalarmPattern  from "../../assets/img_calarm_pattern.png";
import icCalarm from "../../assets/ic_calarm.png";
import patternBlack from "../../assets/pattern_black.png";
import {ContentContent, ContentScreenshot, ContentSpan, ContentTitle, ContentWrapper, GooglePlayDownload, ImgTitle, ImgTitleContent, ImgTitleSectionLeft, ImgTitleText, ImgTitleVersionText, PreviewPhoneWrapper, SafeArea} from "../../components/DevPage/CommonComponent";
import {Slide} from "react-slideshow-image";
import imgScreenshot01 from "../../assets/devpage/calarm/screenshot_01.png";
import imgScreenshot02 from "../../assets/devpage/calarm/screenshot_02.png";
import imgPreviewPhone2 from "../../assets/frame_test.png";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, getDoc, getDocs, doc, collection, query, where, DocumentData, Firestore } from "firebase/firestore";
import RecentChange from "../../components/DevPage/RecentChange";
import TechStack from "../../components/Intro/TechStack";
import LoremIpsum from "react-lorem-ipsum";
import AppHeader from "../../components/DevPage/AppHeader";
import {getFirestoreData} from "../../utils/FirebaseData";
import appHeader from "../../components/DevPage/AppHeader";

function Calarm({darkMode, setDarkMode}: AppProps) {
    const packageName = "zone.ien.calarm";
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [versionName, setVersionName] = useState("-");
    const [changelog, setChangelog] = useState("-");
    const [appName, setAppName] = useState("-");
    const [appDesc, setAppDesc] = useState("-");
    const screenshots = [
        imgScreenshot01,
        imgScreenshot01,
    ];

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
            let result = await getFirestoreData(firestore, packageName);
            let versionCode = -1;
            let tempVersionName = "-";
            let tempChangelog = "-";
            result.forEach((data, code) => {
                if (code === "app_name") {
                    setAppName(data.toString());
                } else if (code === "app_desc") {
                    setAppDesc(data.toString());
                } else if (versionCode < Number(code)) {
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

    const contents = [
        {
            category: "알람",
            title: "정해진 시간에 알려줘!",
            content: "알람 및 알람에 종속된 서브 알람을 간편하게 설정하세요.",
            screenshots: [
                imgScreenshot01,
                imgScreenshot02
            ]
        },
        {
            category: "캘린더 알람",
            title: "일정에 맞춰서 똑똑하게",
            content: "내 일정과 교통 상황, 그리고 준비 시간에 맞게 알아서 깨워드려요.",
            screenshots: [
                imgScreenshot01,
                imgScreenshot02,
            ]
        },
        {
            category: "반복 타이머",
            title: "30분 간격으로 알려줘!",
            content: "일정한 주기로 알려주기 원할 때, 반복 타이머를 사용해 보세요.",
            screenshots: [
                imgScreenshot01,
                imgScreenshot02
            ]
        },
        {
            category: "스톱워치",
            title: "이모지로 똑똑하게 구분하기",
            content: "랩스도 이모지로 구분하여 기록할 수 있어요. 예약도 가능해요.",
            screenshots: [
                imgScreenshot01,
                imgScreenshot02
            ]
        },
        {
            category: "탁상시계 및 화면 보호기",
            title: "바쁠 땐 탁상시계로",
            content: "공부나 작업 중에 휴대폰을 탁상시계로 사용할 수 있어요.",
            screenshots: [
                imgScreenshot01,
                imgScreenshot02
            ]
        },
    ]

    let screenshotView = (screenshots: string[], isReverse: boolean) => {
        const result = [];
        for (let i = 0; i < screenshots.length; i++) {
            result.push(
                <PreviewPhoneWrapper>
                    <div style={{backgroundImage: `url(${screenshots[i]})`}} />
                </PreviewPhoneWrapper>
            );
        }

        return (
            <ContentScreenshot className={isReverse ? "reverse" : ""}>
                {result}
            </ContentScreenshot>
        );
    }

    let contentView = (category: string, title: string, content: string) => {
        return (
            <ContentSpan titleColor={"#FF4081"}>
                <span className={"category"}>{category}</span>
                <span className={"title"}>{title}</span>
                <span className={"content"}>{content}</span>
            </ContentSpan>
        );
    }

    return (
        <DevDetailWrapper>
            <Header className={"app-header"} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} isAppHeaderAvailable={true}/>
            <ImgTitle style={{backgroundImage: darkMode ? patternBlack : imgCalarmPattern}}>
                <ImgTitleSectionLeft>
                    <ImgTitleText>{appName}<ImgTitleVersionText>{versionName}</ImgTitleVersionText></ImgTitleText>
                    <ImgTitleContent>{appDesc}</ImgTitleContent>
                </ImgTitleSectionLeft>
                {GooglePlayDownload(packageName)}
                <PreviewPhoneWrapper className={"title"}>
                    <Slide easing={"ease"} arrows={false}>
                        {screenshots.map((image: string) => (
                            <div className={"each-slide-effect"}>
                                <SlideshowImage style={{'backgroundImage': `url(${image})`}}/>
                            </div>
                        ))}
                    </Slide>
                </PreviewPhoneWrapper>
            </ImgTitle>
            <AppHeader packageName={packageName} appIcon={icCalarm} appName={appName} appDesc={appDesc} appVersion={versionName}/>
            {contents.map((value: { category: string; title: string; content: string; screenshots: string[] }, index) => (
                <ContentWrapper>
                    <SafeArea className={index % 2 !== 0 ? "reverse" : ""}>
                        {screenshotView(value.screenshots, index % 2 !== 0)}
                        {contentView(value.category, value.title, value.content)}
                    </SafeArea>
                </ContentWrapper>
            ))}
            <RecentChange changelog={changelog} />
            <Footer/>
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} darkMode={darkMode} setDarkMode={setDarkMode}/>
        </DevDetailWrapper>
    );
}

const DevDetailWrapper = styled.div`
`

const SlideshowImage = styled.div`
    transition: background-image 0.5s ease;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: ${props => props.style?.backgroundImage};
`;


export default Calarm;
