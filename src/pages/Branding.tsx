import {AppProps} from "../App";
import React, {useEffect, useState} from "react";
import styled, {useTheme} from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import DesignHeader from "../components/Branding/DesignHeader";
import imgLogoFull from "../assets/brand/img_logo_full.png";
import imgLogoShort from "../assets/brand/img_logo_short.png";
import {ImgTitle} from "../components/Branding/CommonComponent";
import logoColor from "../assets/branding/2024/logo_color_transparent.png";
import BrandSystem from "../components/Branding/BrandSystem";
import ApplicationUsages from "../components/Branding/ApplicationUsages";
import ButtonToTop from "../components/ButtonToTop";
import LastEdit from "../components/LastEdit";
import {useLocation} from "react-router-dom";
import {TitleBox} from "../components/Component";
import brandingColor from "../assets/branding/2024/branding_color.png";
import brandingWhite from "../assets/branding/2024/branding_white.png";
import brandingBlack from "../assets/branding/2024/branding_black.png";
import brandingBlueprint from "../assets/branding/2024/branding_blueprint.png";
import {Fade} from "@mui/material";
import pattern from "../assets/brand/pattern.png";
import background from "../assets/branding/2024/mockup/background.png";
import pinButton from "../assets/branding/2024/mockup/pin_button.png";
import pinButton2 from "../assets/branding/2024/mockup/pin_button2.png";
import squareSticker from "../assets/branding/2024/mockup/square_sticker.png";
import {sleep} from "../utils/Utils";

export default function Branding({darkMode, setDarkMode}: AppProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const theme = useTheme();
    const brandingSlide = [brandingColor, brandingWhite, brandingBlack, brandingBlueprint];
    // const brandingSlide = [brandingColor, brandingWhite, brandingBlack, brandingBlueprint];
    const [indicatorIndex, setIndicatorIndex] = useState(0);

    const indicators = (index?: number) => (<SlideshowIndicators className={index === indicatorIndex ? "active" : ""}/>);
    const brandColorInfo = [
        {
            title: "Charming Pink",
            rgb: { red: 255, green : 64, blue: 129 },
            cmyk: { cyan: 0, magenta: 85, yellow: 23, black: 0 },
            code: theme.colors.brand.pink
        },
        {
            title: "Heavenly Purple",
            rgb: { red: 124, green : 77, blue: 255 },
            cmyk: { cyan: 73, magenta: 71, yellow: 0, black: 0 },
            code: theme.colors.brand.purple
        },
        {
            title: "Bracing Skyblue",
            rgb: { red: 3, green : 169, blue: 244 },
            cmyk: { cyan: 72, magenta: 21, yellow: 0, black: 0 },
            code: theme.colors.brand.skyblue
        },
        {
            title: "Neptunian Blue",
            rgb: { red: 63, green : 81, blue: 181 },
            cmyk: { cyan: 83, magenta: 72, yellow: 0, black: 0 },
            code: theme.colors.brand.blue
        },
    ];
    const luminance = (r: number, g: number, b: number) => {
        let a = [r, g, b].map((v) => {
            v /= 255;
            return (v <= 0.03928) ? (v / 12.92) : (Math.pow( (v + 0.055) / 1.055, 2.4 ));
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };
    const checkBlackText = (color: {red: number, green: number, blue: number}) => {
        const colorLuminance = luminance(color.red, color.green, color.blue);
        const blackLuminance = luminance(0, 0, 0);
        const ratio = colorLuminance > blackLuminance
            ? ((blackLuminance + 0.05) / (colorLuminance + 0.05))
            : ((colorLuminance + 0.05) / (blackLuminance + 0.05));
        return (ratio < 1 / 3);
    };
    const previewData = {
        "weight" : "Thin |ExtraLight |Light |Regular |Medium |SemiBold |Bold |ExtraBold |Black",
        "english" : "The |Quick |Brown |Fox |Jumps |Over |The |Lazy |Dog",
        "korean" : "다람쥐 |헌 |쳇바퀴에 |타고파 |정 참판 |양반댁 |규수 |큰 교자 타고 |혼례 치른 날"
    }

    useEffect(() => {
        (async () => {
            await sleep(5);
            setIndicatorIndex((indicatorIndex + 1) % brandingSlide.length);
        })()
    }, [indicatorIndex]);

    return (
        <Wrapper>
            <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} darkMode={darkMode} setDarkMode={setDarkMode}/>
            <div id="wrap">
                <TitleBox className={"title-wrapper"}>
                    <div>
                        <img src={logoColor} />
                    </div>
                </TitleBox>
                <DesignHeader icon={imgLogoFull} shortIcon={imgLogoShort} title={"Brand Identity"} />
                <div className="content-wrapper">
                    <div className="title">
                        <span><div/>01</span>
                        <div>브랜드 요소 & 시스템</div>
                    </div>
                    <div className="content">
                        <div className={"content-wrapper slideshow"}>
                            <div className="fade-wrapper">
                                {brandingSlide.map((source, index) => (
                                    <Fade in={indicatorIndex === index} timeout={{enter: 1000, exit: 1000}}>
                                        <div style={{backgroundImage: `url(${source})`}}></div>
                                    </Fade>
                                ))}
                            </div>
                            <ul className="indicators">
                                {brandingSlide.map((_, index) => (
                                    indicators(index)
                                ))}
                            </ul>
                        </div>
                        <div className={"content-wrapper palette"}>
                            <div className="title">컬러 팔레트</div>
                            <div className="content">
                                {brandColorInfo.map((color) => (
                                    <div style={{backgroundColor: color.code}} className={checkBlackText(color.rgb) ? " black" : ""}>
                                        <div className="title">{color.title}</div>
                                        <div className={"colors"}>
                                            <span>
                                                <span className="color">R</span>{color.rgb.red}
                                                <span className="color"> G</span>{color.rgb.green}
                                                <span className="color"> B</span>{color.rgb.blue}
                                            </span>
                                            <span>
                                                <span className="color">C</span>{color.cmyk.cyan}
                                                <span className="color"> M</span>{color.cmyk.magenta}
                                                <span className="color"> Y</span>{color.cmyk.yellow}
                                                <span className="color"> K</span>{color.cmyk.black}
                                            </span>
                                        </div>
                                        <div className="code">{color.code}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={"content-wrapper pattern"}>
                            <div className="title">패턴</div>
                            <img className={"content"} src={pattern}/>
                        </div>
                        <div className={"content-wrapper typeface"}>
                            <div className="title">글꼴</div>
                            <div className="content">
                                <div className={"title"}>
                                    <div className="title">Pretendard</div>
                                    <div className="weight">
                                        {previewData.weight.split("|").map((word, index) => (
                                            <span style={{fontWeight: 100 * (index + 1)}}>{word}</span>
                                        ))}
                                    </div>
                                </div>
                                <span className={"preview"}>Aa</span>
                                <div className={"sentences"}>
                                    <div>
                                        {previewData.english.split("|").map((word, index) => (
                                            <span style={{fontWeight: 100 * (index + 1)}}>{word}</span>
                                        ))}
                                    </div>
                                    <div>
                                        {previewData.korean.split("|").map((word, index) => (
                                            <>
                                                <span style={{fontWeight: 100 * (index + 1)}}>{word}</span>
                                                {index === 5 ? <br/> : <></>}
                                            </>
                                        ))}
                                    </div>
                                </div>
                                <div className={"letter"}>
                                    <div className={"alphabat"}>AaBbCcDdEeFfGgHhIiJjKkLlMnNnOoPpQqRrSsTtUuVvWwXxYyZz</div>
                                    <div className={"number"}>0123456789</div>
                                    <div className={"symbol"}>!@#$%^&*()_+?,.:;</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-wrapper">
                    <div className="title">
                        <span><div/>02</span>
                        <div>응용</div>
                    </div>
                    <div className="content">
                        <div className="content-wrapper usages">
                            <img src={background}/>
                            <img src={pinButton}/>
                            <img src={pinButton2}/>
                            <img src={squareSticker}/>
                        </div>
                    </div>
                </div>
                <LastEdit link={location.pathname}/>
            </div>
            <Footer/>
            <ButtonToTop/>
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    & > #wrap {
        display: flex;
        flex-direction: column;
        align-items: center;

        & > .title-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-color: ${props => props.theme.colors.common.darkBlue};
            z-index: 985;
            transition: background-color 0.5s ease;

            & > div {
                max-width: 1440px;
                width: 100%;
                height: calc(100% - 2rem);
                position: relative;
                padding: 1rem 0;

                & > img {
                    width: 20%;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }
                
                @media ${({ theme }) => theme.device.pc} {
                    width: calc(100% - 2rem);
                    padding: 1rem;
                }
            }
        }
        
        & > .content-wrapper {
            max-width: 1440px;
            width: 100%;
            display: flex;
            flex-direction: row;
            gap: 1rem;
            margin-top: 2rem;
            animation: Mount-animation 0.5s ease;

            & > .title {
                width: 20%;
                height: fit-content;
                position: sticky;
                top: 10.5rem;
                
                & > span {
                    display: flex;
                    flex-direction: row;
                    font-weight: 800;
                    font-size: xxx-large;
                    color: ${props => props.theme.colors.colorOnSurface};
                    transition: color 0.5s ease;
                    
                    & > div {
                        width: 0.5rem;
                        height: 3rem;
                        margin-right: 1rem;
                        border-radius: 3rem;
                        background-color: ${props => props.theme.colors.colorOnSurface};
                    }
                }

                & > div {
                    margin-top: 1rem;
                    font-weight: 800;
                    font-size: xxx-large;
                    color: ${props => props.theme.colors.colorOnSurface};
                    transition: color 0.5s ease;
                }

                @media ${({ theme }) => theme.device.netbook} {
                    width: 40%;
                }

                @media ${({ theme }) => theme.device.mobile} {
                    width: 100%;
                    position: initial;
                }
            }
            
            & > .content {
                width: 80%;
                display: flex;
                flex-direction: column;
                gap: 2rem;

                & > .content-wrapper {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    gap: 1rem;

                    & > .title {
                        width: calc(300% / 8);
                        height: fit-content;
                        position: sticky;
                        top: 10.5rem;
                        font-size: xx-large;
                        font-weight: 700;
                    }
                    
                    & > .content {
                        width: calc(500% / 8);
                    }

                    &.slideshow {
                        aspect-ratio: 16 / 9;
                        position: relative;
                        overflow: hidden;
                        border-radius: 1rem;

                        & > .fade-wrapper {
                            width: 100%;
                            height: 100%;
                            display: grid;
                            grid-template-rows: 1fr;
                            grid-template-columns: 1fr;
                            position: absolute;
                            z-index: 500;

                            & > div {
                                grid-column: 1;
                                grid-row: 1;
                                width: 100%;
                                background-size: contain;
                                background-position: center;
                                background-repeat: no-repeat;

                            }
                        }

                        & > ul.indicators {
                            height: 2rem;
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            position: absolute;
                            left: 50%;
                            bottom: 0;
                            margin-bottom: 2rem;
                            transform: translate(-50%, 0);
                            z-index: 600;

                            & > button {
                                margin-right: 0.5rem;
                            }

                            & > :last-child {
                                margin-right: 0;
                            }
                        }
                    }
                    
                    &.palette {
                        & > .content {
                            display: grid;
                            grid-template-columns: repeat(2, 1fr);
                            column-gap: 1rem;
                            row-gap: 1rem;
                            
                            & > div {
                                aspect-ratio: 1;
                                display: flex;
                                flex-direction: column;
                                overflow: hidden;
                                border-radius: 1rem;
                                transition: transform 0.5s ease, box-shadow 0.5s ease;
                                
                                & > .title {
                                    padding: 2rem;
                                    font-weight: 700;
                                    font-size: xx-large;
                                    background-color: ${props => props.theme.colors.colorWhite};
                                    transition: background-color 0.5s ease;
                                }

                                & > .colors {
                                    display: flex;
                                    flex-direction: column;
                                    padding: 2rem 2rem 0 2rem;
                                    color: white;
                                    
                                    & > span {
                                        font-size: large;
                                        & > span.color {
                                            font-weight: 700;
                                        }
                                    }
                                    
                                    &.black {
                                        color: black;
                                    }
                                }
                                
                                & > .code {
                                    margin-top: auto;
                                    padding: 0 2rem 2rem 2rem;
                                    font-weight: 800;
                                    font-size: xx-large;
                                    text-align: end;
                                    color: white;
                                }
                                
                                &.black {
                                    & > .colors, & > .code {
                                        color: black;
                                    }
                                }

                                @media (hover: hover) and (pointer: fine) {
                                    &:hover {
                                        transform: translateY(-0.5rem);
                                        box-shadow: 0 0 40px -0.5rem black;
                                    }
                                }
                            }
                            
                            @media ${({ theme }) => theme.device.pc} {
                                & > div {
                                    aspect-ratio: 3 / 2;
                                    
                                    & > .title, & > .code {
                                        font-size: x-large;
                                    }
                                }
                            }
                            
                            @media ${({ theme }) => theme.device.laptop} {
                                grid-template-columns: 1fr;
                                
                                & > div > .title, & > div > .code {
                                    font-size: xx-large;
                                }
                            }
                            
                            @media ${({ theme }) => theme.device.tablet} {
                                & > div {
                                    aspect-ratio: 2 / 1;
                                    & > .title {
                                        font-size: x-large;
                                        padding: 1rem;
                                    }
                                    
                                    & > .colors {
                                        padding: 1rem 1rem 0 1rem;
                                        
                                        & > span {
                                            font-size: small;
                                        }
                                    }
                                    
                                    & > .code {
                                        font-size: x-large;
                                        padding: 0 1rem 1rem 1rem;
                                    }
                                }
                            }
                            
                            @media ${({ theme }) => theme.device.mobile} {
                                & > div {
                                    aspect-ratio: 2 / 1;
                                    & > .title {
                                        font-size: xx-large;
                                        padding: 1rem;
                                    }

                                    & > .colors {
                                        padding: 1rem 1rem 0 1rem;

                                        & > span {
                                            font-size: medium;
                                        }
                                    }

                                    & > .code {
                                        font-size: xx-large;
                                        padding: 0 1rem 1rem 1rem;
                                    }
                                }
                            }
                        }
                    }
                    
                    &.pattern {
                        & > img {
                            border-radius: 1rem;
                        }
                    }
                    
                    &.typeface {
                        & > .content {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            grid-template-rows: 1fr 1fr;
                            grid-template-areas: 
                                "title sentences"
                                "preview letter";
                            padding: 1rem;
                            border-radius: 1rem;
                            background-color: ${props => props.theme.colors.colorSurfaceVariant};
                            transition: background-color 0.5s ease;

                            & > .title {
                                grid-area: title;
                                
                                & > .title {
                                    font-size: xx-large;
                                }
                                
                                & > .weight {
                                    margin-top: 0.5rem;
                                    font-size: large;
                                }
                            }

                            & > .preview {
                                grid-area: preview;
                                font-weight: 900;
                                font-size: 10rem;
                                margin-bottom: -1rem;
                            }

                            & > .sentences {
                                grid-area: sentences;
                                display: flex;
                                flex-direction: column;
                                gap: 1rem;
                                
                                & > div {
                                    font-size: large;
                                }
                            }

                            & > .letter {
                                grid-area: letter;
                                display: flex;
                                flex-direction: column;
                                gap: 1rem;
                                
                                & > .alphabat {
                                    margin-top: auto;
                                    font-size: x-large;
                                    word-break: break-all;
                                }
                                
                                & > .number, & > .symbol {
                                    font-size: large;
                                }
                                
                                & > .symbol {
                                    
                                }
                            }
                            
                            @media ${({ theme }) => theme.device.pc} {
                                grid-template-columns: 1fr;
                                grid-template-rows: repeat(4, 1fr);
                                grid-template-areas:
                                    "title"
                                    "sentences"
                                    "letter"
                                    "preview";
                            }
                        }
                    }
                    
                    &.usages {
                        width: 100%;
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        grid-auto-rows: 1fr;
                        column-gap: 1rem;
                        row-gap: 1rem;
                        
                        & > img {
                            width: 100%;
                            aspect-ratio: 1;
                            object-fit: cover;
                            overflow: hidden;
                            border-radius: 1rem;
                            transition: transform 0.5s ease, box-shadow 0.5s ease;

                            @media (hover: hover) and (pointer: fine) {
                                &:hover {
                                    transform: translateY(-0.5rem);
                                    box-shadow: 0 0 40px -0.5rem black;
                                }
                            }
                        }
                    }

                    @media ${({ theme }) => theme.device.netbook} {
                        flex-direction: column;
                        
                        & > .title {
                            width: 100%;
                            position: initial;
                        }
                        
                        & > .content {
                            width: 100%;
                        }

                        &.typeface {
                            width: calc(100% - 2rem);
                        }
                        
                        &.usages {
                            grid-template-columns: 1fr;
                        }
                    }
                }

                @media ${({ theme }) => theme.device.netbook} {
                    width: 60%;
                }

                @media ${({ theme }) => theme.device.mobile} {
                    width: 100%;
                }
            }

            @media ${({ theme }) => theme.device.pc} {
                width: calc(100% - 2rem);
                padding: 0 1rem;
            }
            
            @media ${({ theme }) => theme.device.mobile} {
                flex-direction: column;
            }
        }
    }
`

const SlideshowIndicators = styled.button`
    width: 0.5rem;
    height: 0.5rem;
    padding: 0;
    background-color: white;
    border-radius: 2rem;
    transition: all 0.5s ease;

    &.active {
        width: 1rem;
        height: 1rem;
    }
`
