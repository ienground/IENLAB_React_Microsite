import styled, {useTheme} from "styled-components";
import {Button, Icon} from "@mui/material";
import 'react-slideshow-image/dist/styles.css'
import {Slide} from "react-slideshow-image";
import pattern from "../../assets/brand/pattern_color.png";
import patternBlack from "../../assets/brand/pattern_black.png";
import imgCalarmPattern from "../../assets/img_calarm_pattern.png";
import icCalarm from "../../assets/icon/ic_calarm.png";
import icPlayStore from "../../assets/icon/ic_google_play.svg";
import screenshotCalarmAlarm from "../../assets/devpage/calarm/alarm_01.png";
import screenshotCalarmCalarm from "../../assets/devpage/calarm/calendar_alarm_01.png";
import React from "react";
import {useNavigate} from "react-router-dom";
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

    return (
        <TitleBox>
            <Wrapper>
                <Slide prevArrow={prevButton} nextArrow={nextButton} indicators={indicators} easing={"ease"} duration={10000000}>
                    <TitleBox className={"slide-wrapper"} style={{backgroundImage: `url(${darkMode ? patternBlack : pattern}`}}>
                        <span id={"slide-1"}>
                            <span className={"bold new-line"}>SIMPLE,</span> The <span className={"bold"}>Best</span> Worth.
                        </span>
                    </TitleBox>
                    <TitleBox className={"slide-wrapper"} style={{backgroundImage: `url(${darkMode ? patternBlack : imgCalarmPattern}`}}>
                        <div id={"slide-2"}>
                            <div className={"left"}>
                                <div/>
                                <div className={"title"}>
                                    <div className={"title"}>
                                        <div>캘람</div>
                                        <img src={icCalarm}/>
                                    </div>
                                    <div className={"content"}>
                                        내 일정을 아는 똑똑한 알람
                                    </div>
                                </div>
                                <div className={"button"}>
                                    <button onClick={() => window.location.href = "https://play.google.com/store/apps/details?id=zone.ien.calarm"}/>
                                </div>
                            </div>
                            <div className={"right"}>
                                <div>
                                    <div style={{backgroundImage: `url(${screenshotCalarmAlarm})`}}/>
                                </div>
                                <div>
                                    <div style={{backgroundImage: `url(${screenshotCalarmCalarm})`}}/>
                                </div>
                            </div>
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
                
                & > div {
                    width: 100%;
                    height: 100%;
                }
                
                @media ${({ theme }) => theme.device.laptop} {
                    width: calc(100% - 10rem);
                }

                @media ${({ theme }) => theme.device.mobile} {
                    width: calc(100% - 2rem);
                }
            }
            
            & > #slide-1 {
                margin: auto;
                font-size: xxx-large;
                color: ${props => props.theme.colors.colorSurface};
                transition: color 0.5s ease;
                
                & > .bold {
                    font-weight: 800;
                }
                
                @media ${({ theme }) => theme.device.tablet} {
                    font-size: xx-large;
                }
                
                @media ${({ theme }) => theme.device.mobile} {
                    font-size: xx-large;

                    & > .new-line::after {
                        content: "\\a";
                        white-space: pre;
                    }
                }
            }
            
            & > #slide-2 {
                display: flex;
                flex-direction: row;
                
                & > .left {
                    width: 50%;
                    display: grid;
                    grid-template-rows: 1fr 1fr 1fr;
                    
                    & > .title {
                        display: flex;
                        flex-direction: column;
                        
                        & > .title {
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            gap: 1rem;
                            margin-top: auto;
                            
                            & > div {
                                font-size: xxx-large;
                                font-weight: 800;
                            }
                            
                            & > img {
                                width: 4rem;
                            }
                        }
                        
                        & > .content {
                            margin-bottom: auto;
                        }
                        
                        @media ${({ theme }) => theme.device.tablet} {
                            & > .title {
                                & > div {
                                    font-size: xx-large;
                                }

                                & > img {
                                    width: 2rem;
                                }
                            }
                            
                            & > .content {
                                margin-top: 0.5rem;
                                font-size: small;
                            }
                        }
                    }

                    & > .button {
                        display: flex;
                        flex-direction: row;
                        align-items: start;
                        
                        & > button {
                            width: 2rem;
                            height: 2rem;
                            background-color: transparent;
                            background-image: url(${icPlayStore});
                            background-repeat: no-repeat;
                            background-size: contain;
                            background-position: center;
                        }
                    }
                    
                    @media ${({ theme }) => theme.device.mobile} {
                        width: 100%;
                        grid-template-rows: 0 3fr 1fr;
                        
                        & > .title {
                            align-items: center;
                            & > .title {
                                & > div {
                                    font-size: xxx-large;
                                }
                                
                                & > img {
                                    width: 4rem;
                                }
                            }
                            
                            & > .content {
                                font-size: medium;
                            }
                        }
                        
                        & > .button {
                            align-items: center;
                            
                            & > button {
                                margin: 0 auto;
                            }
                        }
                    }
                }
                
                & > .right {
                    width: 50%;
                    position: relative;

                    & > div {
                        width: auto;
                        height: 120%;
                        aspect-ratio: 18 / 39;
                        position: absolute;
                        right: 0;
                        padding: 0.5rem;
                        border-radius: 1vw;
                        background-color: slategray;
                        box-shadow: 0 0 40px -1rem black;
                        
                        & > div {
                            width: 100%;
                            height: 100%;
                            border-radius: calc(1vw - 0.25rem);
                            background-repeat: no-repeat;
                            background-size: contain;
                        }
                        
                        @media ${({ theme }) => theme.device.tablet} {
                            border-radius: 2vw;
                            
                            & > div {
                                border-radius: calc(2vw - 0.25rem);
                            }
                        }
                        
                        @media ${({ theme }) => theme.device.mobile} {
                            border-radius: 4vw;

                            & > div {
                                border-radius: calc(4vw - 0.25rem);
                            }
                        }
                    }
                    
                    & > :nth-child(2) {
                        right: 20%;
                    }
                    
                    @media ${({ theme }) => theme.device.mobile} {
                        width: 100%;
                        
                        & > div {
                            width: 60%;
                            height: auto;
                            left: initial;
                            right: 0;
                        }
                        
                        & > :nth-child(2) {
                            left: 0;
                            right: initial;
                        }
                    }
                }
                
                @media ${({ theme }) => theme.device.mobile} {
                    flex-direction: column;
                }
            }
        }
    }
`

const SlideshowButton = styled.button`
    width: 4rem;
    height: 4rem;
    border-radius: 10rem;
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
    
    @media ${({ theme }) => theme.device.laptop} {
        width: 3rem;
        height: 3rem;
        
        & > span {
            font-size: 18px;
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
    border-radius: 10rem;
    background-color: white;
    box-shadow: 0 0 10px -0.1rem gray;
    transition: width 0.5s ease, height 0.5s ease;
    
    &.active {
        width: 1rem;
        height: 1rem;
    }
`
