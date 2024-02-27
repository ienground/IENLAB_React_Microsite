import styled, {useTheme} from "styled-components";
import React, {useEffect, useRef, useState} from "react";
import {getAppInfo} from "../../utils/FirebaseData";
import {Firestore} from "firebase/firestore";
import icPlayStore from "../../assets/icon/ic_google_play.svg";
// import {ImgTitleVersionText} from "./CommonComponent";
import {convertRemToPixels} from "../../utils/Utils";

interface AppHeaderProp {
    icon: string,
    shortIcon: string,
    title: string,
    darkMode: boolean
}

export default function AppHeader({icon, shortIcon, title, darkMode} : AppHeaderProp) {
    const [navBg, setNavBg] = useState(false);
    const theme = useTheme();

    const scrollListener = () => {
        let app_header = document.querySelector("#app-header")
        let headerY = app_header?.getBoundingClientRect().y;
        if (headerY) {
            if (headerY <= convertRemToPixels(4.5)) {
                app_header?.classList.add("visible-shadow");
            } else {
                app_header?.classList.remove("visible-shadow");
            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollListener);
        scrollListener();
    }, []);

    useEffect(() => {
        scrollListener();
    }, [darkMode]);

    return (
        <Wrapper id={"app-header"} icon={icon} shortIcon={shortIcon}>
            <div>
                <div>
                    <img />
                    <div>{title}</div>
                </div>
                <div>

                </div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div<{icon: string, shortIcon: string}>`
    width: 100%;
    height: 4rem;
    margin-top: calc(-4rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: sticky;
    top: 4.5rem;
    background-color: ${props => props.theme.colors.colorSurface};
    z-index: 980;
    transition: box-shadow 0.5s ease, background-color 0.5s ease;
    animation: Mount-animation-header 1s ease;
    
    &.visible-shadow {
        box-shadow: 0 0 30px -1rem black;
    }
    
    & > div {
        max-width: 1440px;
        width: 100%;
        height: 100%;

        & > div {
            height: 100%;
            display: flex;
            flex-direction: row;
            gap: 1rem;
            align-items: center;

            & > img {
                height: 2rem;
                content: url("${props => props.icon}");
            }

            & > div {
                font-weight: 700;
                font-size: x-large;
                transition: color 0.5s ease;
            }
        }
        
        @media ${({ theme }) => theme.device.pc} {
            width: calc(100% - 2rem);
            padding: 0 1rem;
        }
        
        @media ${({ theme }) => theme.device.mobile} {
            & > div > img {
                content: url("${props => props.shortIcon}");
            }
        }
    }
`
