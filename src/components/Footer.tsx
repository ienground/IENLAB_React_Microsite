import styled, {useTheme} from "styled-components";
import imgLogoFull from "../assets/brand/img_logo_full.png";
import imgLogoShort from "../assets/brand/img_logo_short.png";
import imgLogoFullWhite from "../assets/brand/img_logo_full_white.png";
import icTistory from "../assets/icon/ic_tistory.svg";
import imgPattern from "../assets/brand/pattern.png";
import {Icon} from "@mui/material";
import React from "react";
import {Link, useNavigate} from "react-router-dom";

export default function Footer() {
    const theme = useTheme();
    const navigate = useNavigate();
    const darkMode = theme.name === "dark";
    const date = new Date();

    // return (
    //     <FooterWrapper>
    //         <AuthorInfoWrapper>
    //             <Text>Copyright © 2014-{date.getFullYear()} ienlab. 모든 권리 보유.</Text>
    //         </AuthorInfoWrapper>
    //         <Image src={darkMode ? imgLogoFullWhite : imgLogoFull}/>
    //     </FooterWrapper>
    // );

    return (
        <Wrapper>
            <div>
                <div>
                    <div className="author">Copyright © 2014-{date.getFullYear()} ienlab. 모든 권리 보유.</div>
                    <div className={"link"}>
                        <Link to={"/notice"}>공지사항</Link>
                        |
                        <Link to={"/privacy"}>개인정보 처리방침</Link>
                    </div>
                </div>
                <img/>
            </div>

        </Wrapper>
    );
}

const Wrapper = styled.footer`
    width: 100%;
    height: 6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    background-color: ${props => props.theme.colors.colorSurfaceVariant};
    transition: background-color 0.5s ease;
    
    & > div {
        max-width: 1440px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        transition: color 0.5s ease;
        
        & > div > * {
            font-size: medium;
        }
        
        & > div {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            
            & > .link {
                display: flex;
                flex-direction: row;
                gap: 0.5rem;
                
                & > a {
                    color: ${props => props.theme.colors.colorLink};
                    transition: color 0.5s ease;
                }
            }
        }
        
        & > img {
            height: 2rem;
            content: url(${imgLogoFull});
        }

        @media ${({ theme }) => theme.device.pc} {
            width: calc(100% - 2rem);
            margin: 0 1rem;
        }
        
        @media ${({ theme }) => theme.device.tablet} {
            & > div > * {
                font-size: small;
            }
        }
        
        @media ${({ theme }) => theme.device.mobile} {
            & > div > * {
                font-size: x-small;
            }
            
            & > img {
                content: url(${imgLogoShort});
            }
        }
    }
`

// const FooterWrapper = styled.div`
//     transition: background-color 0.5s ease;
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
//     align-items: center;
//     background-color: ${props => props.theme.colors.colorSurfaceVariant};
//     height: 4rem;
//     border-radius: 1rem;
//     margin: 1rem;
//     padding: 1rem;
//     animation: Mount-animation 0.5s ease;
//
//     @media ${({ theme }) => theme.device.mobile} {
//         flex-direction: column-reverse;
//     }
// `
//
// const Text = styled.div`
//     margin-left: 1rem;
//     transition: background-color 0.5s ease, color 0.5s ease;
//     @media ${({ theme }) => theme.device.mobile} {
//         margin: 0;
//         font-size: small;
//     }
// `
//
// const AuthorInfoWrapper = styled.div`
//     display: flex;
//     flex-direction: row;
//     align-items: center;
// `
//
// const Image = styled.div<{src: string}>`
//     height: 2rem;
//     aspect-ratio: 4.84;
//     transition: background-image 0.5s ease;
//     background-image: url(${props => props.src});
//     background-size: contain;
//     background-position: center;
//     background-repeat: no-repeat;
// `
