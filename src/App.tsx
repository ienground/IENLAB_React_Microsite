import React, {useState} from 'react';
import './App.css';
import GlobalStyles from "./style/GlobalStyles";
import styled, {ThemeProvider} from "styled-components";
import {dark, light} from "./style/theme";
import Router from "./Router";
import {BrowserRouter} from "react-router-dom";
import AnimatedCursor from "react-animated-cursor";

function App() {
    const [darkMode, isDarkMode] = useState(false);
    const theme = darkMode ? dark : light;

    return (
        <>
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
                        <Router/>
                    </AppContainer>
                </ThemeProvider>
            </BrowserRouter>
        </>
    );
}
const AppContainer = styled.div`
    width: 100%;
    position: relative;
    margin: 0 auto;
    //background-color: black;
    font-family: Pretendard, sans-serif;
`;

export default App;
