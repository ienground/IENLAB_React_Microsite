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
            <BrowserRouter>
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
