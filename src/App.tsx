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
    darkMode: Boolean,
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

function App() {
    const initialDarkMode = getBooleanWithExpiry(LocalStorageKey.IS_DARK_MODE) !== null ? getBooleanWithExpiry(LocalStorageKey.IS_DARK_MODE) : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [darkMode, setDarkMode] = useState(initialDarkMode);
    let theme = darkMode ? dark : light;

    useEffect(() => {
        let defaultMode = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
        if (defaultMode !== darkMode) {
            setWithExpiry(LocalStorageKey.IS_DARK_MODE, darkMode.toString(), 30 * 60 * 1000);
        } else {
            localStorage.removeItem(LocalStorageKey.IS_DARK_MODE)
        }
    }, [darkMode]);

    return (
        <AppWrapper theme={theme}>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
            />
            <link rel="stylesheet" as="style" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"/>
            <AnimatedCursor
                clickables={['a', 'button']}
                color={"255,255,255"}
                innerSize={20}
                innerScale={2}
                innerStyle={{mixBlendMode: "exclusion"}}
                outerSize={0}
            />
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
    background-color: ${props => props.theme.colors.colorSurface};
    color: ${props => props.theme.colors.colorOnSurface };
`

const AppContainer = styled.div`
    width: 100%;
    position: relative;
    margin: 0 auto;
    font-family: Pretendard, sans-serif;
`;

export default App;
