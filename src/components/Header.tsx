import styled, {useTheme} from "styled-components";
import {Icon, SvgIcon, TextField} from "@mui/material";
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
import {AppProps} from "../App";

interface ConstructionProps {
    className?: string,
    isAppHeaderAvailable?: boolean
}
type Props = SidebarProps & ConstructionProps;

export default function Header({isOpen, setIsOpen, className, isAppHeaderAvailable}: Props) {
    const [navBg, setNavBg] = useState(false);
    const [showSearchbar, setShowSearchbar] = useState(false);
    const theme = useTheme();
    const navigate = useNavigate();
    const isSticky = isAppHeaderAvailable !== true;

    let lastScroll = -1;
    const changeNavBg = () => {
        window.scrollY >= (isSticky ? 10 : 70) ? setNavBg(true) : setNavBg(false);
        lastScroll = window.scrollY;
    }
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        window.addEventListener('scroll', changeNavBg);
    }, []);

    const iconStyle = {
        transition: "all 0.5s ease",
        color: theme.colors.colorOnSurface,
        filter: theme.name === "light" ? (navBg ? "invert(100%) sepia(0%) saturate(15%) hue-rotate(303deg) brightness(106%) contrast(105%)" : "invert(11%) sepia(11%) saturate(17%) hue-rotate(346deg) brightness(92%) contrast(95%)") : ""
    };

    const customIconStyle = {
        transition: "all 0.5s ease",
        filter: (theme.name === "light" && !navBg) ? "invert(11%) sepia(11%) saturate(17%) hue-rotate(346deg) brightness(92%) contrast(95%)" : "invert(100%) sepia(0%) saturate(15%) hue-rotate(303deg) brightness(106%) contrast(105%)"
    };

    return (
        <Wrapper className={navBg ? "nav-bg" : ""}>
            <div>
                <div className={"start"}>
                    <li><Ripples onClick={toggleSidebar} placeholder={"menu"}><Icon baseClassName={"material-icons-round"} sx={iconStyle}>{className === "construction" ? (isOpen ? "dark_mode" : "light_mode") : "menu"}</Icon></Ripples></li>
                </div>
                <button className={navBg ? "nav-bg" : ""} onClick={() => { navigate("/"); }}/>
                <div className={"end"}>
                    <li><Ripples onClick={() => { window.location.href = "https://blog.ien.zone"; }} placeholder={"tistory"}><img src={icTistory} style={customIconStyle}/></Ripples></li>
                    <li><Ripples onClick={() => { window.location.href = "https://www.instagram.com/ienlab"; }} placeholder={"instagram"}><FontAwesomeIcon icon={faInstagram} size={"lg"} style={iconStyle}/></Ripples></li>
                    <li><Ripples onClick={() => { window.location.href = "https://github.com/ienground"; }} placeholder={"github"}><FontAwesomeIcon icon={faGithub} size={"lg"} style={iconStyle}/></Ripples></li>
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
    z-index: 990;
    top: 0;
    transition: background-color 0.5s ease, backdrop-filter 0.5s ease;

    &.nav-bg {
        background-color: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
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

            & > li {
                list-style: none;

                & > div {
                    padding: 1rem;
                    border-radius: 50%;
                    transition: background-color 0.5s ease;
                    &:hover {
                        background-color: rgba(0, 0, 0, 0.1);
                    }

                    & > img {
                        transition: all 0.5s ease;
                        height: 1.2rem;
                    }
                }
            }

            &.start {
                justify-content: start;
            }

            &.end {
                justify-content: end;
                
            }

            @media ${({ theme }) => theme.device.mobile} {
                width: 20%;
                
                &.end > li {
                    display: none;
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

            &.nav-bg {
                background-image: url(${mainIconWhite});
            }

            @media ${({ theme }) => theme.device.mobile} {
                width: 60%;
            }
        }
    }
`
