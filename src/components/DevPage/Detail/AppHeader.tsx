import styled from "styled-components";
import React, {useEffect, useRef, useState} from "react";
import {getAppInfo} from "../../../utils/FirebaseData";
import {Firestore} from "firebase/firestore";
import icPlayStore from "../../../assets/icon/ic_google_play.svg";
import {ImgTitleVersionText} from "../CommonComponent";
import {convertRemToPixels} from "../../../utils/Utils";
import appHeader from "./AppHeader";

interface AppHeaderProp {
    // ref: React.MutableRefObject<any>
    packageName: string,
    appIcon: string
    appName: string,
    appDesc: string,
    appVersion: string
}

export default function AppHeader({packageName, appIcon, appName, appDesc, appVersion} : AppHeaderProp) {
    const [navBg, setNavBg] = useState(false);

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
        /*
        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                // console.log(entry.target.getBoundingClientRect().y);
                // if (entry.isIntersecting) {
                //     console.log("intersecting");
                // }
            });
        };
        const observer = new IntersectionObserver(observerCallback, {
            threshold: 0.5
        });
        if (appHeaderRef.current) {
            // console.log("ref");
            observer.observe(appHeaderRef.current);
        }

         */
        window.addEventListener('scroll', scrollListener);
    }, []);

    return (
        <Wrapper id={"app-header"}>
            <div>
                <div className={"left"}>
                    <img src={appIcon} />
                    <div>{appName}</div>
                </div>
                <div className={"right"}>
                    <button onClick={() => window.location.href='https://play.google.com/store/apps/details?id=' + packageName}>
                        <img src={icPlayStore}/>
                        <span>설치</span>
                    </button>
                </div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
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
    transition: box-shadow 0.5s ease;
    animation: Mount-animation-header 1s ease;
    
    &.visible-shadow {
        box-shadow: 0 0 30px -1rem black;
    }
    
    & > div {
        max-width: 1440px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 0;

        & > div {
            height: 100%;
            display: flex;
            flex-direction: row;
            gap: 1rem;
            align-items: center;

            &.left {
                & > img {
                    height: 2rem;
                }

                & > div {
                    font-weight: 700;
                    font-size: x-large;
                }
            }
            
            &.right {
                & > button {
                    width: fit-content;
                    height: 100%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    padding: 0 1rem;
                    border-radius: 10rem;
                    transition: background-color 0.5s ease;
                    
                    & > img {
                        height: calc(100% - 1rem);
                        aspect-ratio: 1;
                        margin-right: 0.5rem;
                    }
                    
                    & > span {
                        font-weight: 700;
                        color: ${props => props.theme.colors.colorSurface};
                        transition: color 0.5s ease;
                    }
                }
            }
        }
        
        @media ${({ theme }) => theme.device.pc} {
            width: calc(100% - 2rem);
            padding: 0 1rem;
        }
    }
`
