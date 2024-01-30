import styled, {useTheme} from "styled-components";
import imgLogoFull from "../assets/img_logo_full.png";
import imgLogoFullWhite from "../assets/img_logo_full_white.png";
import icTistory from "../assets/ic_tistory.svg";
import imgPattern from "../assets/pattern.png";
import {Icon} from "@mui/material";
import React from "react";

function Footer() {
    const theme = useTheme();
    const darkMode = theme.name === "dark";

    return (
        <FooterWrapper>
            <AuthorInfoWrapper>
                <Text>Copyright © 2024 ienlab. 모든 권리 보유.</Text>
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
    animation: Mount-animation 0.5s;

    @media ${({ theme }) => theme.device.mobile} {
        flex-direction: column-reverse;
    }
`

const Text = styled.div`
    margin-left: 1rem;
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

const TistoryInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Image = styled.img`
    height: 2rem;
`

export default Footer;
