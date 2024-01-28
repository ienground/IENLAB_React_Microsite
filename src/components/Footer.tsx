import styled from "styled-components";
import imgLogoTypo from "../assets/img_logo_typo.png";
import imgLogoFull from "../assets/img_logo_full.png";
import icTistory from "../assets/ic_tistory.svg";
import imgPattern from "../assets/pattern.png";
import {Icon} from "@mui/material";
import React from "react";

function Footer() {
    return (
        <>
            <FooterWrapper>
                <AuthorInfoWrapper>
                    <Text>Copyright © 2024 ienlab. 모든 권리 보유.</Text>
                </AuthorInfoWrapper>
                <Image src={imgLogoFull}/>
            </FooterWrapper>
            <FakeFooter>.</FakeFooter>
        </>
    );
}
const FakeFooter = styled.div`
    visibility: hidden;
`

const FooterWrapper = styled.div`
    transition: background-color 0.5s ease;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${props => props.theme.colors.colorSurfaceVariant};
    height: 4rem;
    border-radius: 1rem;
    margin: 1rem;
    padding: 1rem;
`

const Text = styled.div`
    margin-left: 1rem;
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
