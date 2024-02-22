import styled, {useTheme} from "styled-components";
import {Button, Icon} from "@mui/material";
import 'react-slideshow-image/dist/styles.css'
import {Slide} from "react-slideshow-image";
import bgIenlab from "../../assets/brand/background_ienlab.png";
import pattern from "../../assets/brand/pattern_color.png";
import patternBlack from "../../assets/brand/pattern_black.png";
import imgCalarmPattern from "../../assets/img_calarm_pattern.png";
import backgroundCalarm from "../../assets/background_calarm.png";
import imgLogoShortWhite from "../../assets/brand/img_logo_short_white.png";
import icGooglePlay from "../../assets/icon/ic_google_play.svg";
import React from "react";
import Ripples from "react-ripples";
import icPlayStore from "../../assets/icon/ic_google_play.svg";
import {useNavigate} from "react-router-dom";
import {PreviewPhoneWrapper} from "../DevPage/CommonComponent";
import calarmScreenshot01 from "../../assets/devpage/calarm/screenshot_01.png";
import calarmScreenshot02 from "../../assets/devpage/calarm/screenshot_02.png";

function Slideshow() {
    const theme = useTheme();
    const navigate = useNavigate();
    const darkMode = theme.name === "dark";
    const images = [
        darkMode ? patternBlack : pattern, backgroundCalarm
    ];

    let indicators = (index?: number) => (<SlideshowIndicators />);
    let prevButton =
        <SlideshowButton>
            <Icon baseClassName={"material-icons-round"}>arrow_back</Icon>
        </SlideshowButton>
    let nextButton =
        <SlideshowButton>
            <Icon baseClassName={"material-icons-round"}>arrow_forward</Icon>
        </SlideshowButton>

    return (
        <SlideshowWrapper className={"wrapper"}>
            <Slide prevArrow={prevButton} nextArrow={nextButton} indicators={indicators} easing={"ease"} duration={100000000}>
                <div className={"each-slide-effect"}>
                    <SlideshowImage style={{'backgroundImage': `url(${images[0]})`}}>
                        <BlurBackground darkMode={darkMode}>
                            <img src={imgLogoShortWhite}/>
                        </BlurBackground>
                    </SlideshowImage>
                </div>
                <div className={"each-slide-effect"}>
                    <SlideshowImage style={{backgroundImage: `url(${images[1]}`}}>
                        <div className={"title"}>캘람</div>
                        <div className={"content"}>내 일정을 아는 똑똑한 알람</div>
                        <div className={"buttons"}>
                            <Ripples placeholder={"web"}><ImgButton onClick={() => navigate("/calarm")}><Icon baseClassName={"material-icons-round"}>language</Icon></ImgButton></Ripples>
                            <Ripples placeholder={"store"}><ImgButton onClick={() => window.location.href=`https://play.google.com/store/apps/details?id=zone.ien.calarm`} style={{backgroundImage: `url(${icPlayStore})`}} /></Ripples>
                        </div>
                        {/*<PreviewPhoneWrapper className={"screenshot"}>*/}
                        {/*    <div style={{backgroundImage: `url(${calarmScreenshot01})`}}/>*/}
                        {/*</PreviewPhoneWrapper>*/}
                        {/*<PreviewPhoneWrapper className={"screenshot"}>*/}
                        {/*    <div style={{backgroundImage: `url(${calarmScreenshot01})`}}/>*/}
                        {/*</PreviewPhoneWrapper>*/}
                    </SlideshowImage>
                </div>
                {/*<div className={"each-slide-effect"}>*/}
                {/*    <SlideshowImage style={{'backgroundColor': `maroon`}}>*/}
                {/*        */}
                {/*    </SlideshowImage>*/}
                {/*</div>*/}
            </Slide>
        </SlideshowWrapper>
    );
}

const SlideshowWrapper = styled.div`
    display: flex;
    border-radius: 1rem;
    margin: 0 1rem;
    animation: Mount-animation 0.5s ease;
    
    & > div {
        display: flex;
        flex-direction: row;
        width: 100%;
        border-radius: 1rem;
        overflow: hidden;
        align-items: end;
    }
    
    .react-slideshow-container {
        width: 100%;
    }
    
    ul.indicators {
        height: 2rem;
        position: absolute;
        margin-bottom: 2rem;
        align-items: center;
        left: 50%;
        transform: translate(-50%, 0);
        
        & > button {
            margin-right: 0.5rem;
        }
        & > :last-child {
            margin-right: 0;
        }
    }

    .each-slide-effect > div {
        display: flex;
        align-items: center;
        justify-content: center;
        background-size: cover;
        aspect-ratio: 21 / 9;

        @media ${({ theme }) => theme.device.mobile} {
            aspect-ratio: 9 / 16;
        }
    }
`;

const SlideshowImage = styled.div`
    width: 100%;
    height: 100%;
    transition: background-image 0.5s ease;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    
    & > .title {
        font-weight: 900;
        font-size: 4vmax;
        visibility: hidden;

        @media ${({ theme }) => theme.device.mobile} {
            visibility: visible;
        }
    }
    
    & > .content {
        margin-top: 1rem;
        font-size: 1.5vmax;
        visibility: hidden;

        @media ${({ theme }) => theme.device.mobile} {
            visibility: visible;
        }
    }
    
    & > .buttons {
        position: absolute;
        display: flex;
        flex-direction: row;
        bottom: 6rem;

        & > div {
            border-radius: 5rem;
            transition: background-color 0.5s ease;
            &:hover {
                background-color: rgba(0, 0, 0, 0.1);
            }
        }
    }
`;

const ImgButton = styled.button`
    width: 2rem;
    height: 2rem;
    position: relative;
    background-color: transparent;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    margin: 1rem;

    & > span {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 2rem;
        transition: color 0.5s ease;
        color: ${props => props.theme.colors.colorOnSurface};
    }

`

const BlurBackground = styled.div<{ darkMode: boolean }>`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    animation: Blur-animation 10s infinite;
    animation-direction: alternate;
    align-items: center;
    transition: background-color 0.5s ease;
    background-color: ${(props) => props.darkMode ? "rgba(0, 0, 0, 0.3)" : "transparent" };
    
    & > img {
        width: 10%;
        margin: auto;
    }

    @media ${({ theme }) => theme.device.mobile} {
        & > img {
            width: 40%;
        }
    }
`

const SlideshowButton = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 2rem;
    border-radius: 2rem;
    width: 4rem;
    height: 4rem;
    background-color: rgba(255, 255, 255, 0.5);

    & > span {
        display: inline-block;
        margin: auto;
    }

    @media ${({ theme }) => theme.device.mobile} {
        visibility: hidden;
    }
`

const SlideshowIndicators = styled.button`
    width: 0.5rem;
    height: 0.5rem;
    padding: 0;
    background-color: white;
    border-radius: 2rem;
    transition: all 0.5s ease;
    box-shadow: 0 0 10px -0.1rem gray;
    
    &.active {
        width: 1rem;
        height: 1rem;
    }
`

export default Slideshow;
