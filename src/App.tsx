import React, {useEffect, useState} from 'react';
import './App.css';
import GlobalStyles from "./style/GlobalStyles";
import styled, {ThemeProvider} from "styled-components";
import {dark, light} from "./style/theme";
import Router from "./Router";
import {BrowserRouter} from "react-router-dom";
import AnimatedCursor from "react-animated-cursor";
import * as LocalStorageKey from "./constant/LocalStorageKey";
import {getBooleanWithExpiry, setWithExpiry} from "./utils/ExpireLocalStorage";
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getNoticeItem, getRecentNoticeDate} from "./utils/FirebaseData";
import {LastEditData} from "./data/LastEditData";

export interface AppProps {
    darkMode: boolean,
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

function detectMobileDevice(agent: string) {
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

function App() {
    const initialDarkMode = getBooleanWithExpiry(LocalStorageKey.IS_DARK_MODE, window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const [darkMode, setDarkMode] = useState(initialDarkMode);
    let theme = darkMode ? dark : light;
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
            LastEditData.set("/notice", [recentNoticeDate.getFullYear(), recentNoticeDate.getMonth() + 1, recentNoticeDate.getDate(), recentNoticeDate.getHours(), recentNoticeDate.getMinutes()]);
        };
        processing();
    }, []);

    return (
        <AppWrapper theme={theme}>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
            />
            <link rel="stylesheet" as="style"
                  href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"/>

            {!detectMobileDevice(window.navigator.userAgent) &&
                <AnimatedCursor
                    clickables={['a', 'button', 'input']}
                    color={"255,255,255"}
                    innerSize={20}
                    innerScale={2}
                    innerStyle={{mixBlendMode: "difference"}}
                    outerSize={5}
                    outerScale={0}
                />
            }
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
`

const AppContainer = styled.div`
    width: 100%;
    position: relative;
    margin: 0 auto;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
`;

export default App;
