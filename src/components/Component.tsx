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

export const BrCondition = styled.br`
    display: none;
    @media ${({ theme }) => theme.device.mobile} {
        display: inherit;
    }
`
