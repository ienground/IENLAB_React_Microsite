import styled, {useTheme} from "styled-components";
import {Icon, SvgIcon, TextField} from "@mui/material";
import mainIcon from "../assets/img_logo_typo.png";
import mainIconWhite from "../assets/img_logo_typo_white.png";
import icTistory from "../assets/ic_tistory.svg";
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
    className?: string
}
type Props = SidebarProps & ConstructionProps;

function Header({isOpen, setIsOpen, className}: Props) {
    const [navBg, setNavBg] = useState(false);
    const [showSearchbar, setShowSearchbar] = useState(false);
    const theme = useTheme();
    const navigate = useNavigate();

    const changeNavBg = () => {
        window.scrollY >= 10 ? setNavBg(true) : setNavBg(false);
        console.log(window.scrollY);
    }
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }

    const toggleSearchbar = () => {
        setShowSearchbar(!showSearchbar);
    }

    useEffect(() => {
        window.addEventListener('scroll', changeNavBg);
        return () => {
            // window.removeEventListener('scroll', changeNavBg);
        }
    }, []);

    const iconStyle = {
        transition: "all 0.5s ease",
        color: theme.colors.colorOnSurface,
        filter: theme.name === "light" ? (navBg ? "invert(100%) sepia(0%) saturate(15%) hue-rotate(303deg) brightness(106%) contrast(105%)" : "invert(11%) sepia(11%) saturate(17%) hue-rotate(346deg) brightness(92%) contrast(95%)") : ""
    }

    const customIconStyle = {
        transition: "all 0.5s ease",
        filter: (theme.name === "light" && !navBg) ? "invert(11%) sepia(11%) saturate(17%) hue-rotate(346deg) brightness(92%) contrast(95%)" : "invert(100%) sepia(0%) saturate(15%) hue-rotate(303deg) brightness(106%) contrast(105%)"
    }

    const searchBarStyle = {
        transition: "visibility 0.5s ease",
        // visibility: showSearchbar ? "visible" : "hidden",
        input: {
            transition: "color 0.5s ease",
            color: theme.name === "light" ? (navBg ? theme.colors.colorSurface : theme.colors.colorOnSurface) : theme.colors.colorOnSurface,
            fontFamily: "Pretendard"
        },
        "div::after": {
            transition: "border-bottom-color 0.5s ease",
            borderBottomColor: theme.name === "light" ? (navBg ? theme.colors.colorSurface : theme.colors.colorOnSurface) : theme.colors.colorOnSurface,
        }
    }

    const Searchbar =
        <TextField variant={"standard"} sx={searchBarStyle} margin={"dense"} fullWidth={true}
                   InputProps={{
                       endAdornment: (
                           <InputAdornment position={"end"}><Icon baseClassName={"material-icons-round"} sx={iconStyle}>search</Icon></InputAdornment>
                       )
        }}/>

    return (
        <HeaderWrapper>
            <NavWrapper style={navBg ? {backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: "blur(10px)"} : {}}>
                <NavIcons style={{justifyContent: "start"}} className={"start"}>
                    <NavIconListWrapper><Ripples placeholder={"Menu"}><NavIconList onClick={toggleSidebar}><Icon baseClassName={"material-icons-round"} sx={iconStyle}>{className === "construction" ? (isOpen ? "dark_mode" : "light_mode") : "menu"}</Icon></NavIconList></Ripples></NavIconListWrapper>
                    {/*<NavIconListWrapper><Ripples placeholder={"Tistory"}><NavIconList><Icon baseClassName={"material-icons-round"} sx={iconStyle}>apps</Icon></NavIconList></Ripples></NavIconListWrapper>*/}
                    {/*<NavIconListWrapper><Ripples placeholder={"Tistory"}><NavIconList onClick={toggleSearchbar}><Icon baseClassName={"material-icons-round"} sx={iconStyle}>search</Icon></NavIconList></Ripples></NavIconListWrapper>*/}
                    {/*{Searchbar}*/}
                </NavIcons>
                <MainLogo onClick={ () => navigate("/") } style={navBg ? {backgroundImage: mainIconWhite} : {backgroundImage: mainIcon}}/>
                <NavIcons style={{justifyContent: "end"}} className={"end"}>
                    <NavIconListWrapper><Ripples placeholder={"Tistory"}><NavIconList href={"https://blog.ien.zone"}><CustomIcon src={icTistory} style={customIconStyle}/></NavIconList></Ripples></NavIconListWrapper>
                    <NavIconListWrapper><Ripples placeholder={"Instagram"}><NavIconList href={"https://www.instagram.com/ienlab"}><FontAwesomeIcon icon={faInstagram} size={"lg"} style={iconStyle}/></NavIconList></Ripples></NavIconListWrapper>
                    <NavIconListWrapper><Ripples placeholder={"GitHub"}><NavIconList href={"https://github.com/ienground"}><FontAwesomeIcon icon={faGithub} size={"lg"} style={iconStyle}/></NavIconList></Ripples></NavIconListWrapper>
                </NavIcons>
            </NavWrapper>
        </HeaderWrapper>
    );
}

const HeaderWrapper = styled.nav`
    display: flex;
    flex-direction: row;
    position: sticky;
    z-index: 990;
    top: 0;
`;

const NavWrapper = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    border-radius: 0 0 1rem 1rem;
    padding: 0.5rem 0 0.5rem 0;
    transition: background-color 0.5s ease;
`

const MainLogo = styled.button`
    transition: all 0.5s ease;
    width: 20%;
    height: 2rem;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-color: transparent;
    background-image: url(${props => props.style?.backgroundImage || ''});

    @media ${({ theme }) => theme.device.mobile} {
        width: 60%;
    }
`;

const NavIcons = styled.ul`
    width: 40%;
    list-style: none;
    padding: 0 1rem 0 1rem;
    justify-content: ${props => props.style?.justifyContent};
    display: flex;

    @media ${({ theme }) => theme.device.mobile} {
        width: 20%;
        &.end > div{
            display: none;
        }
    }
`;
const NavIconListWrapper = styled.div`
    border-radius: 2rem;
    align-items: center;
    overflow: hidden;
    transition: background-color 0.5s ease;
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
    
    & > div {
        height: 100%;
    }
`
const NavIconList = styled.a`
    padding: 1rem;
    background: none;
    align-items: center;
    display: flex;
`;

const CustomIcon = styled.img`
    transition: all 0.5s ease;
    height: 1.2rem;
`
export default Header;
