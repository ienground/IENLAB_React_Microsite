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
import {TitleBox} from "../Component";

export default function Slideshow() {
    const theme = useTheme();
    const navigate = useNavigate();
    const darkMode = theme.name === "dark";

    let indicators = (index?: number) => (<SlideshowIndicator />);
    let prevButton =
        <SlideshowButton className={"prev"}>
            <Icon baseClassName={"material-icons-round"}>arrow_back</Icon>
        </SlideshowButton>;
    let nextButton =
        <SlideshowButton className={"next"}>
            <Icon baseClassName={"material-icons-round"}>arrow_forward</Icon>
        </SlideshowButton>;

    // return (
    //     <SlideshowWrapper className={"wrapper"}>
    //         <Slide prevArrow={prevButton} nextArrow={nextButton} indicators={indicators} easing={"ease"} duration={100000000}>
    //             <div className={"each-slide-effect"}>
    //                 <SlideshowImage style={{'backgroundImage': `url(${images[0]})`}}>
    //                     <BlurBackground darkMode={darkMode}>
    //                         <img src={imgLogoShortWhite}/>
    //                     </BlurBackground>
    //                 </SlideshowImage>
    //             </div>
    //             <div className={"each-slide-effect"}>
    //                 <SlideshowImage style={{backgroundImage: `url(${images[1]}`}}>
    //                     <div className={"title"}>캘람</div>
    //                     <div className={"content"}>내 일정을 아는 똑똑한 알람</div>
    //                     <div className={"buttons"}>
    //                         <Ripples placeholder={"web"}><ImgButton onClick={() => navigate("/calarm")}><Icon baseClassName={"material-icons-round"}>language</Icon></ImgButton></Ripples>
    //                         <Ripples placeholder={"store"}><ImgButton onClick={() => window.location.href=`https://play.google.com/store/apps/details?id=zone.ien.calarm`} style={{backgroundImage: `url(${icPlayStore})`}} /></Ripples>
    //                     </div>
    //                 </SlideshowImage>
    //             </div>
    //         </Slide>
    //     </SlideshowWrapper>
    // );

    return (
        <TitleBox>
            <Wrapper>
                <Slide prevArrow={prevButton} nextArrow={nextButton} indicators={indicators} easing={"ease"} duration={10000}>
                    {/*<div className={"slide-wrapper"} style={{backgroundImage: `url(${darkMode ? patternBlack : pattern}`}}>*/}

                    {/*</div>*/}
                    {/*<div className={"slide-wrapper"}  style={{backgroundImage: `url(${imgCalarmPattern}`}}>*/}

                    {/*</div>*/}
                    <TitleBox className={"slide-wrapper"} style={{backgroundImage: `url(${darkMode ? patternBlack : pattern}`}}>
                        <div>
                            <div></div>
                        </div>
                    </TitleBox>
                    <TitleBox className={"slide-wrapper"} style={{backgroundImage: `url(${imgCalarmPattern}`}}>
                        <div>
                            <div></div>
                        </div>
                    </TitleBox>
                </Slide>
            </Wrapper>
        </TitleBox>
    );
}

const Wrapper = styled.div`
    & > div {
        position: relative;
        
        & > .react-slideshow-container {
            
        }
        
        & > ul.indicators {
            height: 2rem;
            align-items: center;
            position: absolute;
            margin-bottom: 2rem;
            left: 50%;
            bottom: 0;
            transform: translateX(-50%);
            
            & > button {
                margin-right: 0.5rem;
            }
            
            & > :last-child {
                margin-right: 0;
            }
        }
        
        .slide-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            transition: background-image 0.5s ease;
            
            & > div {
                max-width: calc(1440px - 10rem);
                width: calc(100% - 12rem);
                height: calc(100% - 2rem);
                padding: 1rem;
                background-color: red;
                
                & > div {
                    width: 100%;
                    height: 100%;
                    background-color: blue;
                }

                @media ${({ theme }) => theme.device.mobile} {
                    width: calc(100% - 2rem);
                }
            }
        }
    }
`

// const SlideshowWrapper = styled.div`
//     display: flex;
//     border-radius: 1rem;
//     margin: 0 1rem;
//     animation: Mount-animation 0.5s ease;
//
//     & > div {
//         display: flex;
//         flex-direction: row;
//         width: 100%;
//         border-radius: 1rem;
//         overflow: hidden;
//         align-items: end;
//     }
//
//     .react-slideshow-container {
//         width: 100%;
//     }
//
// `;
//
// const SlideshowImage = styled.div`
//     width: 100%;
//     height: 100%;
//     transition: background-image 0.5s ease;
//     background-size: contain;
//     background-position: center;
//     background-repeat: no-repeat;
//     display: flex;
//     flex-direction: column;
//     overflow: hidden;
//
//     & > .title {
//         font-weight: 900;
//         font-size: 4vmax;
//         visibility: hidden;
//
//         @media ${({ theme }) => theme.device.mobile} {
//             visibility: visible;
//         }
//     }
//
//     & > .content {
//         margin-top: 1rem;
//         font-size: 1.5vmax;
//         visibility: hidden;
//
//         @media ${({ theme }) => theme.device.mobile} {
//             visibility: visible;
//         }
//     }
//
//     & > .buttons {
//         position: absolute;
//         display: flex;
//         flex-direction: row;
//         bottom: 6rem;
//
//         & > div {
//             border-radius: 5rem;
//             transition: background-color 0.5s ease;
//             &:hover {
//                 background-color: rgba(0, 0, 0, 0.1);
//             }
//         }
//     }
// `;
//
// const ImgButton = styled.button`
//     width: 2rem;
//     height: 2rem;
//     position: relative;
//     background-color: transparent;
//     background-size: contain;
//     background-position: center;
//     background-repeat: no-repeat;
//     margin: 1rem;
//
//     & > span {
//         position: absolute;
//         top: 0;
//         left: 0;
//         font-size: 2rem;
//         transition: color 0.5s ease;
//         color: ${props => props.theme.colors.colorOnSurface};
//     }
//
// `
//
// const BlurBackground = styled.div<{ darkMode: boolean }>`
//     display: flex;
//     flex-direction: column;
//     width: 100%;
//     height: 100%;
//     animation: Blur-animation 10s infinite;
//     animation-direction: alternate;
//     align-items: center;
//     transition: background-color 0.5s ease;
//     background-color: ${(props) => props.darkMode ? "rgba(0, 0, 0, 0.3)" : "transparent" };
//
//     & > img {
//         width: 10%;
//         margin: auto;
//     }
//
//     @media ${({ theme }) => theme.device.mobile} {
//         & > img {
//             width: 40%;
//         }
//     }
// `
//

const SlideshowButton = styled.button`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    
    & > span {
        margin: auto;
    }

    

    &.prev {
        margin-left: calc((100% - 1440px) / 2);
    }

    &.next {
        margin-right: calc((100% - 1440px) / 2);
    }
    
    @media ${({ theme }) => theme.device.pc} {
        &.prev {
            margin-left: 1rem;
        }

        &.next {
            margin-right: 1rem;
        }
    }
    
    @media ${({ theme }) => theme.device.mobile} {
        visibility: hidden;
    }
`

const SlideshowIndicator = styled.button`
    width: 0.5rem;
    height: 0.5rem;
    padding: 0;
    border-radius: 50%;
    background-color: white;
    box-shadow: 0 0 10px -0.1rem gray;
    transition: width 0.5s ease, height 0.5s ease;
    
    &.active {
        width: 1rem;
        height: 1rem;
    }
`
