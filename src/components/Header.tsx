import styled, {useTheme} from "styled-components";
import {Fade, Icon, SvgIcon, TextField} from "@mui/material";
import mainIcon from "../assets/brand/img_logo_typo.png";
import mainIconWhite from "../assets/brand/img_logo_typo_white.png";
import icTistory from "../assets/icon/ic_tistory.svg";
import "../style/main.css"
import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faGithub } from "@fortawesome/free-brands-svg-icons"
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import zIndex from "@mui/material/styles/zIndex";
import {SidebarProps} from "./Sidebar";
import Ripples from "react-ripples";
import {InputAdornment} from "@mui/material-next";
import {useNavigate} from "react-router-dom";
import {AppProps, detectMobileDevice} from "../App";

interface ConstructionProps {
    className?: string,
    isAppHeaderAvailable?: boolean
}
type Props = SidebarProps & ConstructionProps & AppProps;

const isMobile = detectMobileDevice(window.navigator.userAgent);
export default function Header({isOpen, setIsOpen, className, isAppHeaderAvailable, darkMode, setDarkMode}: Props) {
    const [navBg, setNavBg] = useState(false);
    const theme = useTheme();
    const navigate = useNavigate();
    const isSticky = isAppHeaderAvailable !== true;

    let lastScroll = -1;
    const changeNavBg = () => {
        window.scrollY >= (isSticky ? 30 : 70) ? setNavBg(true) : setNavBg(false);
        lastScroll = window.scrollY;
    }
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    useEffect(() => {
        window.addEventListener('scroll', changeNavBg);
        changeNavBg();
    }, []);

    const iconStyle = {
        transition: "color 0.5s ease, filter 0.5s ease",
        color: theme.colors.colorOnSurface,
        filter: theme.name === "light" ? ("invert(11%) sepia(11%) saturate(17%) hue-rotate(346deg) brightness(92%) contrast(95%)") : ""
    };

    const customIconStyle = {
        transition: "filter 0.5s ease",
        filter: theme.name === "light" ? "invert(11%) sepia(11%) saturate(17%) hue-rotate(346deg) brightness(92%) contrast(95%)" : "invert(100%) sepia(0%) saturate(15%) hue-rotate(303deg) brightness(106%) contrast(105%)"
    };

    return (
        <Wrapper className={navBg ? "nav-bg" : ""}>
            <div>
                <div className={"start"}>
                    <li className={isOpen ? "open" : ""}><Ripples onMouseEnter={() => { if (!isMobile && !isOpen) setIsOpen(true); }} onClick={() => { if (isOpen) setIsOpen(false); else if (isMobile) setIsOpen(true); }} placeholder={"menu"}><Icon baseClassName={"material-icons-round"} sx={iconStyle}>expand_more</Icon></Ripples></li>
                </div>
                <button className={navBg ? "nav-bg" : ""} onClick={() => { navigate("/"); }}/>
                <div className={"end"}>
                    <Fade in={isOpen}><li className={"dark-mode"}>
                        <Ripples onClick={toggleDarkMode} placeholder={"Dark mode"}><Icon baseClassName={"material-icons-round"} sx={iconStyle}>{darkMode === true ? "dark_mode" : "light_mode"}</Icon></Ripples>
                    </li></Fade>
                    <Fade in={!isOpen}><li><Ripples onClick={() => {
                        window.location.href = "https://blog.ien.zone";
                    }} placeholder={"tistory"}><img src={icTistory} style={customIconStyle}/></Ripples></li></Fade>
                    <Fade in={!isOpen}><li><Ripples onClick={() => {
                        window.location.href = "https://www.instagram.com/ienlab";
                    }} placeholder={"instagram"}><FontAwesomeIcon icon={faInstagram} size={"lg"} style={iconStyle}/></Ripples>
                    </li></Fade>
                    <Fade in={!isOpen}><li><Ripples onClick={() => {
                        window.location.href = "https://github.com/ienground";
                    }} placeholder={"github"}><FontAwesomeIcon icon={faGithub} size={"lg"} style={iconStyle}/></Ripples>
                    </li></Fade>
                </div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.nav`
    width: 100%;
    height: 4.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: sticky;
    background-color: ${props => props.theme.colors.colorSurface};
    z-index: 991;
    top: 0;
    transition: box-shadow 0.5s ease, background-color 0.5s ease;

    @media ${({ theme }) => theme.device.pc} {
        width: calc(100% - 2rem);
        padding: 0 1rem;
    }

    &.nav-bg {
        box-shadow: 0 0 30px -1rem black;
    }

    & > div {
        max-width: 1440px;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0.5rem 0;

        & > div {
            width: 40%;
            display: flex;
            flex-direction: row;
            align-items: center;

            & > li {
                list-style: none;

                & > div {
                    padding: 1rem;
                    border-radius: 10rem;
                    transition: background-color 0.5s ease;
                    @media (hover: hover) and (pointer: fine) {
                        &:hover {
                            background-color: rgba(0, 0, 0, 0.1);
                        }
                    }

                    & > img {
                        transition: all 0.5s ease;
                        height: 1.2rem;
                    }
                }
            }

            &.start {
                justify-content: start;
                
                & > li {
                    & > div > span {
                        transition: color 0.5s ease, rotate 0.5s ease;
                    }
                    
                    &.open > div > span {
                        rotate: 180deg;
                    }
                }
            }

            &.end {
                position: relative;
                justify-content: end;
                
                & > li.dark-mode {
                    position: absolute;
                    background-color: ${props => props.theme.colors.colorOnSurface}19;
                    border-radius: 10rem;
                    transition: background-color 0.5s ease;
                }
            }

            @media ${({ theme }) => theme.device.mobile} {
                width: 20%;
                
                &.end > li {
                    display: none;
                    
                    & > div > span {
                        color: ${props => props.theme.colors.colorOnSurface};
                        transition: color 0.5s ease;
                    }
                    
                    &.dark-mode {
                        display: initial;
                    }
                }
            }
        }

        & > button {
            width: 20%;
            height: 2rem;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            background-color: transparent;
            background-image: url(${mainIcon});
            transition: background-image 0.5s ease;

            @media ${({ theme }) => theme.device.mobile} {
                width: 60%;
            }
        }
    }
`
