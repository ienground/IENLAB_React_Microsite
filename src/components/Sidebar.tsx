import styled from "styled-components";
import React from "react";
import LoremIpsum from "react-lorem-ipsum";
import {Icon} from "@mui/material";
import Ripples from "react-ripples"
import {AppProps} from "../App";
import {useNavigate} from "react-router-dom";

export interface SidebarProps {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = SidebarProps & AppProps;

function Sidebar({ isOpen, setIsOpen, darkMode, setDarkMode } : Props) {
    const navigate = useNavigate();
    const toggleSidebar = () => {
        setIsOpen(false)
    }

    const test = (e: React.MouseEvent) => {
        e.stopPropagation();
    }

    const toggleDarkMode = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDarkMode(!darkMode);
    }

    const closeNavigate = (dest: string) => {
        toggleSidebar();
        navigate(dest);
    }

    return (
        <SidebarBackground onClick={toggleSidebar} className={isOpen ? 'open' : ''}>
            <SidebarWrapper onClick={test} className={isOpen ? 'open' : ''}>
                <NavIcons style={{justifyContent: "space-between"}}>
                    <NavIconListWrapper>
                        <Ripples placeholder={"Back"}>
                            <NavIconList onClick={toggleSidebar}><Icon baseClassName={"material-icons-round"}>arrow_back</Icon></NavIconList>
                        </Ripples>
                    </NavIconListWrapper>
                    <NavIconListWrapper>
                        <Ripples placeholder={"Dark mode"}><NavIconList style={{backgroundColor: "rgba(0,0,0,0.1)"}} onClick={toggleDarkMode}><Icon baseClassName={"material-icons-round"}>{ darkMode === true ? "dark_mode" : "light_mode"}</Icon></NavIconList></Ripples>
                    </NavIconListWrapper>
                </NavIcons>
                <NavList>
                    <NavItem onClick={() => closeNavigate("/")}>Home</NavItem>
                    <NavItem onClick={() => closeNavigate("/intro")}>Intro</NavItem>
                </NavList>

                {/*<LoremIpsum p={10} />*/}

            </SidebarWrapper>
        </SidebarBackground>
    );
}

const SidebarBackground = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 991;
    left: 0;
    top: 0;
    opacity: 0;
    visibility: hidden;
    background-color: rgba(0, 0, 0, 0.4);
    transition: all 0.5s ease;

    &.open {
        visibility: visible;
        opacity: 100%;
    }
`
const SidebarWrapper = styled.div`
    position: fixed;
    width: 25%;
    height: 100%;
    left: -25%;
    top: 0;
    padding: 0.5rem 1rem;
    box-sizing: border-box;
    overflow-y: auto;
    border-radius: 0 1rem 1rem 0;
    background-color: ${props => props.theme.colors.colorBackground};
    transition: all 0.5s ease;

    &.open {
        left: 0;
    }
`

const NavIcons = styled.ul`
    list-style: none;
    justify-content: ${props => props.style?.justifyContent};
    display: flex;
`;
const NavIconListWrapper = styled.div`
    border-radius: 2rem;
    overflow: hidden;

    & > div {
        height: 100%;
    }
`
const NavIconList = styled.button`
    padding: 1rem;
    border-radius: 2rem;
    background: none;
    align-items: center;
    display: flex;
    
    & > span {
        transition: color 0.5s ease;
        color: ${props => props.theme.colors.colorOnSurface};
    }
`;

const NavList = styled.div`
    display: flex;
    flex-direction: column;
`;
const NavItem = styled.button`
    height: 2rem;
    background-color: transparent;
    color: ${props => props.theme.colors.colorOnSurface};
`

export default Sidebar;
