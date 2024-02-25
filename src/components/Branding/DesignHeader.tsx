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
}

export default function AppHeader({icon, shortIcon, title} : AppHeaderProp) {
    const [navBg, setNavBg] = useState(false);
    const theme = useTheme();
    const isMobile = window.matchMedia(theme.device.mobile).matches;

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
    }, []);

    // return (
    //     <AppHeaderWrapper ref={appHeaderRef}>
    //         <InnerWrapper>
    //             <Area>
    //                 <ImgAppIcon src={isMobile ? shortIcon : icon} />
    //                 <TextTitle>{title}</TextTitle>
    //                 {/*<ImgTitleVersionText>{appVersion}</ImgTitleVersionText>*/}
    //             </Area>
    //             <Area>
    //                 {/*<StoreButton onClick={() => window.location.href='https://play.google.com/store/apps/details?id=' + packageName}>*/}
    //                 {/*    <img src={icPlayStore} />*/}
    //                 {/*    <span>설치</span>*/}
    //                 {/*</StoreButton>*/}
    //             </Area>
    //         </InnerWrapper>
    //         <BottomLine className={"bottom-line"}/>
    //     </AppHeaderWrapper>
    // );

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
    transition: box-shadow 0.5s ease;
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

const BottomLine = styled.div`
    width: 40%;
    height: 1px;
    background-color: ${props => props.theme.colors.colorOnSurface};
    transition: width 0.5s ease, background-color 0.5s ease;
    &.visible-line {
        width: 100%;
    }
`

const AppHeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: calc(-4rem - 2px);
    background-color: ${props => props.theme.colors.colorSurface};
    position: sticky;
    align-items: center;
    top: 4.5rem;
    z-index: 980;

    animation: Mount-animation-header 1s ease;
    transition: background-color 0.5s ease;
`

const InnerWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 4rem);
    height: 2rem;
    padding: 1rem 2rem;
`

const TextTitle = styled.div`
    font-weight: bolder;
    font-size: x-large;
    margin-left: 1rem;
`

const ImgAppIcon = styled.img`
    height: 2rem;
`

const Area = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    flex-direction: row;
`

const StoreButton = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: ${props => props.theme.colors.colorOnSurface};
    width: fit-content;
    height: 100%;
    border-radius: 12rem;
    padding: 0 1rem;

    transition: background-color 0.5s ease;
    
    & > img {
        height: calc(100% - 1rem);
        margin-right: 0.5rem;
        aspect-ratio: 1;
    }
    
    & > span {
        width: fit-content;
        display: inline-block;
        font-size: medium;
        font-weight: bolder;
        color: ${props => props.theme.colors.colorSurface};
        transition: color 0.5s ease;
    }
`
