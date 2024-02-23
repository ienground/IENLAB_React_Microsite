import styled, {useTheme} from "styled-components";
import {ContentTitle, ContentWrapper, TextTitle} from "./CommonComponent";
import {Slide} from "react-slideshow-image";
import React, {useEffect, useState} from "react";
import brandingBlack from "../../assets/branding/2024/branding_black.png";
import brandingColor from "../../assets/branding/2024/branding_color.png";
import brandingWhite from "../../assets/branding/2024/branding_white.png";
import brandingBlueprint from "../../assets/branding/2024/branding_blueprint.png";
import pattern from "../../assets/brand/pattern.png";
import {Spacer} from "../Component";
import ColorPalette from "./BrandSystem/ColorPalette";
import {Fade} from "@mui/material";
import {sleep} from "../../utils/Utils";

export default function BrandSystem() {
    const theme = useTheme();
    const brandingSlide = [brandingColor, brandingWhite, brandingBlack, brandingBlueprint];
    // const brandingSlide = [brandingColor, brandingWhite, brandingBlack, brandingBlueprint];
    const [indicatorIndex, setIndicatorIndex] = useState(0);
    let checkValid = 0;
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
            rgb: { red: 63, green : 81, blue: 81 },
            cmyk: { cyan: 83, magenta: 72, yellow: 0, black: 0 },
            code: theme.colors.brand.blue
        },
    ];
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
            <TextTitle><div className={"number"}><div /><span>01</span></div>Brand Elements & System</TextTitle>
            <ContentWrapper>
                <SlideshowWrapper>
                    <div className={"fade-wrapper"}>
                        {brandingSlide.map((source, index) => (
                            <Fade in={indicatorIndex === index} >
                                <SlideshowImage style={{'backgroundImage': `url(${source})`}}/>
                            </Fade>
                        ))}
                    </div>
                    <ul className={"indicators"}>
                        {brandingSlide.map((source, index) => (
                            indicators(index)
                        ))}
                    </ul>
                </SlideshowWrapper>
                <ContentTitle>Color Palettes</ContentTitle>
                <ColorPaletteWrapper>
                    {brandColorInfo.map((color) => (
                        <ColorPalette color={color} />
                    ))}
                </ColorPaletteWrapper>
                <ContentTitle>Patterns</ContentTitle>
                <img className={"content-pattern"} src={pattern} />
                <ContentTitle>Typeface</ContentTitle>
                <TypefaceWrapper>
                    <div className={"left"}>
                        <div className={"title"}>Pretendard</div>
                        <div className={"weight"}>
                            {previewData.weight.split("|").map((word, index) => (
                                <span style={{fontWeight: 100 * (index + 1)}}>{word}</span>
                            ))}
                        </div>
                        <div className={"preview"}>Aa</div>
                    </div>
                    <div className={"right"}>
                        <div className={"preview"}>
                            {previewData.english.split("|").map((word, index) => (
                                <span style={{fontWeight: 100 * (index + 1)}}>{word}</span>
                            ))}
                        </div>
                        <Spacer orientation={"vertical"} size={"1rem"} />
                        <div className={"preview"}>
                            {previewData.korean.split("|").map((word, index) => (
                                <>
                                    <span style={{fontWeight: 100 * (index + 1)}}>{word}</span>
                                    {index === 5 ? <br /> : <></>}
                                </>
                            ))}
                        </div>
                        <div className={"alphabat"}>AaBbCcDdEeFfGgHhIiJjKkLlMnNnOoPpQqRrSsTtUuVvWwXxYyZz</div>
                        <div className={"number"}>0123456789</div>
                        <div className={"symbol"}>!@#$%^&*()_+?,.:;</div>
                    </div>
                </TypefaceWrapper>
            </ContentWrapper>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1rem 1rem 0 2rem;
    animation: Mount-animation 0.5s ease;
    align-items: start;

    @media ${({theme}) => theme.device.mobile} {
        flex-direction: column;
        margin: 1rem 1rem 0 1rem;
    }
`

const SlideshowWrapper = styled.div`
    width: 100%;
    aspect-ratio: 16 / 9;
    display: flex;
    border-radius: 1rem;
    overflow: hidden;
    position: relative;
    animation: Mount-animation 0.5s ease;
    
    & > div.fade-wrapper {
        width: 100%;
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 1fr;
        position: absolute;
        z-index: 500;
        
        & > div {
            grid-column: 1;
            grid-row: 1;
            width: 100%;
        }
    }

    ul.indicators {
        height: 2rem;
        display: flex;
        position: absolute;
        margin-bottom: 2rem;
        align-items: center;
        left: 50%;
        bottom: 0;
        transform: translate(-50%, 0);
        z-index: 600;

        & > button {
            margin-right: 0.5rem;
        }
        & > :last-child {
            margin-right: 0;
        }
    }

    @media ${({ theme }) => theme.device.mobile} {
        margin-top: 1rem;
        
        ul.indicators {
            margin-bottom: 0;
        }
    }
`
const SlideshowImage = styled.div`
    aspect-ratio: 16 / 9;
    width: 100%;
    transition: background-image 0.5s ease;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
`;

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

const ColorPaletteWrapper = styled.div`
    width: 100%;
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 1rem;
    row-gap: 1rem;

    @media ${({ theme }) => theme.device.pc} {
        grid-template-columns: 1fr 1fr;
    }
    
    @media ${({ theme }) => theme.device.tablet} {
        grid-template-columns: 1fr;
    }
`

const TypefaceWrapper = styled.div`
    margin-top: 1rem;
    padding: 2rem;
    border-radius: 1rem;
    background-color: ${props => props.theme.colors.colorSurfaceVariant};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    transition: background-color 0.5s ease;

    @media ${({ theme }) => theme.device.pc} {
        flex-direction: column;
    }
    
    & div, & span {
        color: ${props => props.theme.colors.colorOnSurface};
        transition: color 0.5s ease;
    }
    
    & > .left {
        width: 30%;
        display: flex;
        flex-direction: column;
        
        & > .title {
            font-weight: 400;
            font-size: xxx-large;
        }
        
        & > .weight {
            font-size: large;
            margin-top: 1rem;
        }
        
        & > .preview {
            font-weight: 900;
            font-size: 10rem;
            margin-top: auto;
            margin-bottom: -1rem;
        }

        @media ${({ theme }) => theme.device.pc} {
            width: 100%;
            
            & > .title {
                font-size: xx-large;
            }
            
            & > .preview {
                font-size: 6rem;
            }
        }
    }
    
    & > .right {
        width: 60%;
        
        & > .preview {
            font-size: x-large;
        }
        
        & > .alphabat {
            margin-top: 4rem;
            font-size: xxx-large;
            word-break: break-all;
        }
        
        & > .number, & > .symbol {
            margin-top: 1rem;
            font-size: xx-large;
        }

        @media ${({ theme }) => theme.device.pc} {
            width: 100%;
            margin-top: 2rem;
            
            & > .alphabat {
                margin-top: 2rem;
                font-size: xx-large;
            }
            
            & > .number, & > .symbol {
                margin-top: 0;
                font-size: x-large;
            }
        }
    }
`
