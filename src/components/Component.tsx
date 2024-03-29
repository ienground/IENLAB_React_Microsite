import styled, {useTheme} from "styled-components";
import React from "react";


export interface SpacerProps {
    orientation: string,
    size: string
}

export const Spacer = ({orientation, size}: SpacerProps) => {
    const theme = useTheme();
    const isMobile = window.matchMedia(theme.device.mobile).matches;

    if (orientation === "vertical") {
        return (
            <div style={{
                width: "100%",
                height: isMobile ? `calc(${size} / 2)` : size
            }} />
        );
    } else {
        return (
            <div style={{
                width: isMobile ? `calc(${size} / 2)` : size,
                height: "100%"
            }} />
        );
    }
}

export const TitleBox = styled.div`
    width: 100%;
    //height: 405px;
    height: 617px;
    aspect-ratio: 21 / 9;
    overflow: hidden;
    animation: Mount-animation 0.5s ease;
    
    @media ${({ theme }) => theme.device.pc} {
        height: auto;
        aspect-ratio: 21 / 9;
    }

    @media ${({ theme }) => theme.device.netbook} {
        aspect-ratio: 21 / 9;
    }

    @media ${({ theme }) => theme.device.tablet} {
        aspect-ratio: 16 / 9;
    }

    @media ${({ theme }) => theme.device.mobile} {
        aspect-ratio: 9 / 16;
        
        &.mobile-free {
            aspect-ratio: initial;
        }
    }
`
