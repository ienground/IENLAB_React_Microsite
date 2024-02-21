import styled, {useTheme} from "styled-components";
import imgLogoFull from "../assets/brand/img_logo_full.png";
import imgLogoFullWhite from "../assets/brand/img_logo_full_white.png";
import icTistory from "../assets/icon/ic_tistory.svg";
import imgPattern from "../assets/brand/pattern.png";
import {Icon} from "@mui/material";
import React from "react";

function Footer() {
    const theme = useTheme();
    const darkMode = theme.name === "dark";
    const date = new Date();

    return (
        <FooterWrapper>
            <AuthorInfoWrapper>
                <Text>Copyright © 2014-{date.getFullYear()} ienlab. 모든 권리 보유.</Text>
            </AuthorInfoWrapper>
            <Image src={darkMode ? imgLogoFullWhite : imgLogoFull}/>
        </FooterWrapper>
    );
}

const FooterWrapper = styled.div`
    transition: background-color 0.5s ease;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${props => props.theme.colors.colorSurfaceVariant};
    height: 4rem;
    border-radius: 1rem;
    margin: 1rem;
    padding: 1rem;
    animation: Mount-animation 0.5s ease;

    @media ${({ theme }) => theme.device.mobile} {
        flex-direction: column-reverse;
    }
`

const Text = styled.div`
    margin-left: 1rem;
    transition: background-color 0.5s ease, color 0.5s ease;
    @media ${({ theme }) => theme.device.mobile} {
        margin: 0;
        font-size: small;
    }
`

const AuthorInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Image = styled.div<{src: string}>`
    height: 2rem;
    aspect-ratio: 4.84;
    transition: background-image 0.5s ease;
    background-image: url(${props => props.src});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
`

export default Footer;
