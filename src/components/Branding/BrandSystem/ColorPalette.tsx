import React from "react";
import styled from "styled-components";

interface ColorPaletteProps {
    color: {title: string, rgb: {red: number, green: number, blue: number}, cmyk: {cyan: number, magenta: number, yellow: number, black: number}, code: any}
}

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

export default function ColorPalette({color}: ColorPaletteProps) {
    return (
        <Wrapper style={{backgroundColor: color.code}} color={color.rgb}>
            <div className={"title"}>{color.title}</div>
            <div className={"colors"}>
                <span><span className={"color"}>R</span>{color.rgb.red} <span className={"color"}>G</span>{color.rgb.green} <span className={"color"}>B</span>{color.rgb.blue}</span><br />
                <span><span className={"color"}>C</span>{color.cmyk.cyan} <span className={"color"}>M</span>{color.cmyk.magenta} <span className={"color"}>Y</span>{color.cmyk.yellow} <span className={"color"}>K</span>{color.cmyk.black}</span>
            </div>
            <div className={"code"}>{color.code}</div>
        </Wrapper>
    );
}

const Wrapper = styled.div<{color: {red: number, green: number, blue: number}}>`
    flex: 0.25;
    aspect-ratio: 2 / 3;
    border-radius: 1rem;
    padding: 2rem;
    transition: transform 0.5s ease, box-shadow 0.5s ease;
    display: flex;
    flex-direction: column;
    color: ${props => checkBlackText(props.color) ? "black" : "white"};

    @media ${({ theme }) => theme.device.pc} {
        aspect-ratio: 3 / 2;
    }

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            transform: translateY(-0.5rem);
            box-shadow: 0 0 40px -0.5rem black;
        }
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
