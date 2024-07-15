import React, {useEffect, useState} from 'react';
import './App.css';
import GlobalStyles from "./style/GlobalStyles";
import styled, {ThemeProvider} from "styled-components";
import {dark, light} from "./style/theme";
import Router from "./Router";
import {BrowserRouter, useNavigate} from "react-router-dom";
import AnimatedCursor from "react-animated-cursor";
import * as LocalStorageKey from "./constant/LocalStorageKey";
import {getBooleanWithExpiry, setWithExpiry} from "./utils/ExpireLocalStorage";
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getNoticeItem, getRecentNoticeDate} from "./utils/FirebaseData";
import {getAuth, signInWithPopup, GoogleAuthProvider, setPersistence, browserSessionPersistence} from "firebase/auth";
import {LastEditData} from "./data/LastEditData";

export interface AppProps {
    darkMode: boolean,
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

export function detectMobileDevice(agent: string) {
    const mobileRegex = [
        /Android/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return mobileRegex.some(mobile => agent.match(mobile));
}

export default function App() {
    const initialDarkMode = getBooleanWithExpiry(LocalStorageKey.IS_DARK_MODE, window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const [darkMode, setDarkMode] = useState(initialDarkMode);
    const theme = darkMode ? dark : light;
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
    const auth = getAuth(app);

    auth.onAuthStateChanged((user) => {
        if (user) {
            localStorage.setItem(
                'user',
                JSON.stringify({
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL
                })
            );
            console.log("auth changed");
        }
    });

    useEffect(() => {
        let defaultMode = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
        if (defaultMode !== darkMode) {
            setWithExpiry(LocalStorageKey.IS_DARK_MODE, darkMode.toString(), 30 * 60 * 1000);
        } else {
            localStorage.removeItem(LocalStorageKey.IS_DARK_MODE)
        }
        if (darkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [darkMode]);

    useEffect(() => {
        const processing = async () => {
            let recentNoticeDate = await getRecentNoticeDate(firestore);
            LastEditData.set("/notice", [recentNoticeDate.getFullYear(), recentNoticeDate.getMonth(), recentNoticeDate.getDate(), recentNoticeDate.getHours(), recentNoticeDate.getMinutes()]);
        };
        processing();

        console.log(detectMobileDevice(window.navigator.userAgent), window.navigator.userAgent);
    }, []);


    const [position, setPosition] = useState({x: 0, y: 0});
    const [hidden, setHidden] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [linkHovered, setLinkHovered] = useState(false);

    useEffect(() => {
        addEventListeners();
        handleLinkHoverEvents();
        return () => {
            removeEventListeners();
            removeLinkHoverEvents();
            setLinkHovered(false);
        }
    }, [window.location.href]);

    const addEventListeners = () => {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseenter", onMouseEnter);
        document.addEventListener("mouseleave", onMouseLeave);
        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mouseup", onMouseUp);
    };

    const removeEventListeners = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseenter", onMouseEnter);
        document.removeEventListener("mouseleave", onMouseLeave);
        document.removeEventListener("mousedown", onMouseDown);
        document.removeEventListener("mouseup", onMouseUp);
    };

    const selectors = ["a", "button", "input", ".link"]

    const handleLinkHoverEvents = () => {
        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.addEventListener("mouseover", onLinkHovered);
                el.addEventListener("mouseout", onLinkUnhovered);
            })
        })
    }

    const removeLinkHoverEvents = () => {
        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.removeEventListener("mouseover", onLinkHovered);
                el.removeEventListener("mouseout", onLinkUnhovered);
            })
        })
    }

    const onLinkHovered = () => {
        setLinkHovered(true);
    }

    const onLinkUnhovered = () => {
        setLinkHovered(false);
    }

    const onMouseMove = (e: MouseEvent) => {
        setPosition({x: e.clientX, y: e.clientY});
    };

    const onMouseLeave = () => {
        setHidden(true);
    };

    const onMouseEnter = () => {
        setHidden(false);
    };

    const onMouseDown = () => {
        setClicked(true);
    };

    const onMouseUp = (e: MouseEvent) => {
        setClicked(false);
    };

    return (
        <AppWrapper theme={theme}>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
            />
            <link rel="stylesheet" as="style"
                  href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"/>
            <div className={'cursor' + (hidden ? ' hidden' : '') + (clicked ? ' clicked' : '') + (linkHovered ? ' hovered' : '')} style={{
                left: `${position.x}px`,
                top: `${position.y}px`
            }}/>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <GlobalStyles/>
                <ThemeProvider theme={theme}>
                    <AppContainer>
                        <Router darkMode={darkMode} setDarkMode={setDarkMode}/>
                    </AppContainer>
                </ThemeProvider>
            </BrowserRouter>
        </AppWrapper>
    );
}

const AppWrapper = styled.div`
    transition: background-color 0.5s ease;
    color: ${props => props.theme.colors.colorOnSurface};

    .cursor {
        width: 20px;
        height: 20px;
        display: none;
        position: fixed;
        transform: translate(-50%, -50%);
        border: 2px solid #fefefe;
        border-radius: 100%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: all 0.15s ease;
        transition-property: opacity, background-color, transform, mix-blend-mode;
        
        &.hidden {
            opacity: 0;
        }
        
        &.clicked {
            transform: translate(-50%, -50%) scale(0.9);
            background-color: #fefefe;
        }
        
        &.hovered {
            transform: translate(-50%, -50%) scale(1.5);
            background-color: #fefefe;
        }

        @media (hover: hover) and (pointer: fine) {
            display: initial;
        }
    }
`

const AppContainer = styled.div`
    width: 100%;
    position: relative;
    margin: 0 auto;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
`;
