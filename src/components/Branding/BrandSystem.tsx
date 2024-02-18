import styled, {useTheme} from "styled-components";
import {ContentTitle, ContentWrapper, TextTitle} from "./CommonComponent";
import {Fade, Slide} from "react-slideshow-image";
import React from "react";
import brandingBlack from "../../assets/branding/2024/branding_black.png";
import brandingColor from "../../assets/branding/2024/branding_color.png";
import brandingWhite from "../../assets/branding/2024/branding_white.png";
import brandingBlueprint from "../../assets/branding/2024/branding_blueprint.png";
import pattern from "../../assets/brand/pattern.png";
import {Spacer} from "../Component";
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
    console.log(ratio);
    return (ratio < 1 / 3);
};

function BrandSystem() {
    const theme = useTheme();
    const brandingSlide = [brandingColor, brandingWhite, brandingBlack, brandingBlueprint];
    const indicators = (index?: number) => (<SlideshowIndicators />);
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

    return (
        <Wrapper>
            <TextTitle><div className={"number"}><div /><span>01</span></div>Brand Elements & System</TextTitle>
            <ContentWrapper>
                <SlideshowWrapper>
                    <Slide indicators={indicators} easing={"ease"} >
                        {brandingSlide.map((source) => (
                            <div className={"each-slide-effect"}>
                                <SlideshowImage style={{'backgroundImage': `url(${source})`}}/>
                            </div>
                        ))}
                    </Slide>
                </SlideshowWrapper>
                <ContentTitle>Color Palettes</ContentTitle>
                <ColorPaletteWrapper>
                    {brandColorInfo.map((color) => (
                        <ColorPalette style={{backgroundColor: color.code}} color={color.rgb}>
                            <div className={"title"}>{color.title}</div>
                            <div className={"colors"}>
                                <span><span className={"color"}>R</span>{color.rgb.red} <span className={"color"}>G</span>{color.rgb.green} <span className={"color"}>B</span>{color.rgb.blue}</span><br />
                                <span><span className={"color"}>C</span>{color.cmyk.cyan} <span className={"color"}>M</span>{color.cmyk.magenta} <span className={"color"}>Y</span>{color.cmyk.yellow} <span className={"color"}>K</span>{color.cmyk.black}</span>
                            </div>
                            <div className={"code"}>{color.code}</div>
                        </ColorPalette>
                    ))}
                </ColorPaletteWrapper>
                <ContentTitle>Patterns</ContentTitle>
                <img className={"content-pattern"} src={pattern} />
                <ContentTitle>Typeface</ContentTitle>
                <TypefaceWrapper>
                    <div className={"left"}>
                        <div className={"title"}>Pretendard</div>
                        <div className={"weight"}>
                            <span style={{fontWeight: "100"}}>Thin </span>
                            <span style={{fontWeight: "200"}}>ExtraLight </span>
                            <span style={{fontWeight: "300"}}>Light </span>
                            <span style={{fontWeight: "400"}}>Regular </span>
                            <span style={{fontWeight: "500"}}>Medium </span>
                            <span style={{fontWeight: "600"}}>SemiBold </span>
                            <span style={{fontWeight: "700"}}>Bold </span>
                            <span style={{fontWeight: "800"}}>ExtraBold </span>
                            <span style={{fontWeight: "900"}}>Black</span>
                        </div>
                        <div className={"preview"}>Aa</div>
                    </div>
                    <div className={"right"}>
                        <div className={"preview"}>
                            <span style={{fontWeight: "100"}}>The </span>
                            <span style={{fontWeight: "200"}}>Quick </span>
                            <span style={{fontWeight: "300"}}>Brown </span>
                            <span style={{fontWeight: "400"}}>Fox </span>
                            <span style={{fontWeight: "500"}}>Jumps </span>
                            <span style={{fontWeight: "600"}}>Over </span>
                            <span style={{fontWeight: "700"}}>The </span>
                            <span style={{fontWeight: "800"}}>Lazy </span>
                            <span style={{fontWeight: "900"}}>Dog </span>
                        </div>
                        <Spacer orientation={"vertical"} size={"1rem"} />
                        <div className={"preview"}>
                            <span style={{fontWeight: "100"}}>다람쥐 </span>
                            <span style={{fontWeight: "200"}}>헌 </span>
                            <span style={{fontWeight: "300"}}>쳇바퀴에 </span>
                            <span style={{fontWeight: "400"}}>타고파</span><br/>
                            <span style={{fontWeight: "500"}}>정 참판 </span>
                            <span style={{fontWeight: "600"}}>양반댁 </span>
                            <span style={{fontWeight: "700"}}>규수 </span>
                            <span style={{fontWeight: "800"}}>큰 교자 타고 </span>
                            <span style={{fontWeight: "900"}}>혼례 치른 날 </span>
                        </div>
                        <div className={"alphabat"}>
                            AaBbCcDdEeFfGgHhIiJjKkLlMnNnOoPpQqRrSsTtUuVvWwXxYyZz
                        </div>
                        <div className={"number"}>
                            0123456789
                        </div>
                        <div className={"symbol"}>
                            !@#$%^&*()_+?,.:;
                        </div>
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
    display: flex;
    border-radius: 1rem;
    overflow: hidden;
    animation: Mount-animation 0.5s ease;

    & > div {
        display: flex;
        flex-direction: row;
        width: 100%;
        overflow: hidden;
        align-items: end;
        position: relative;
    }

    .react-slideshow-container {
        width: 100%;

        & > button {
            visibility: hidden;
        }
    }

    ul.indicators {
        height: 2rem;
        position: absolute;
        margin-bottom: 2rem;
        align-items: center;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 500;

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
            margin-bottom: 1rem;
        }
    }
`
const SlideshowImage = styled.div`
    aspect-ratio: 16 / 9;
    width: 100%;
    //height: 20rem; //todo
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

const ColorPalette = styled.div<{color: {red: number, green: number, blue: number}}>`
    flex: 0.25;
    aspect-ratio: 2 / 3;
    border-radius: 1rem;
    padding: 2rem;
    transition: scale 0.5s ease;
    display: flex;
    flex-direction: column;
    color: ${props => checkBlackText(props.color) ? "black" : "white"};

    @media ${({ theme }) => theme.device.pc} {
        aspect-ratio: 3 / 2;
    }
    
    &:hover {
        scale: 1.05;
    }
    
    & > .title {
        font-weight: 700;
        font-size: xx-large;
    }
     
    & > .colors {
        margin-top: 1rem;
        margin-bottom: auto;
        
        & > span > span.color {
            font-weight: 700;
        }
    }
    
    & > .code {
        font-weight: 900;
        font-size: xx-large;
        text-align: end;
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

export default BrandSystem;
