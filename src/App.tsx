import React from 'react';
import './App.css';
import GlobalStyles from "./style/GlobalStyles";
import styled, {ThemeProvider} from "styled-components";
import theme from "./style/theme";
import Router from "./Router";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
            />
            <link rel="stylesheet" as="style" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"/>
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
    font-family: Pretendard, sans-serif;
`;

export default App;
