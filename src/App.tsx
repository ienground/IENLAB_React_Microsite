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
`;

export default App;
