import styled from "styled-components";
import React from "react";
import LoremIpsum from "react-lorem-ipsum";
import {Icon} from "@mui/material";
import Ripples from "react-ripples"
import {AppProps} from "../App";
import {useLocation, useNavigate} from "react-router-dom";
import icCalarm from "../assets/icon/ic_calarm.png";
import icIenlab from "../assets/brand/ic_ienlab.svg";

export interface SidebarProps {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = SidebarProps & AppProps;

function Sidebar({ isOpen, setIsOpen, darkMode, setDarkMode } : Props) {
    const location = useLocation();
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

    const divider = { icon: "", title: "", link: "", isMark: false, contents: [] };
    const navItems = [
        { icon: "home", title: "홈", link: "/", isMark: false, contents: [] },
        divider,
        { icon: "", svg: icIenlab, title: "아이엔 IENGROUND", link: "/intro", isMark: false, contents: [] },
        { icon: "brush", title: "브랜드 아이덴티티", link: "/brand", isMark: false, contents: [] },
        { icon: "code", title: "개발", link: "/dev", isMark: false, contents: [
            { icon: icCalarm, title: "캘람", link: "/calarm", isMark: false },
        ] },
    ];
    const navDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        let parent = e.currentTarget.parentNode?.parentElement;

        if (parent?.classList?.contains("visible")) {
            parent?.classList?.remove("visible");
        } else {
            parent?.classList?.add("visible");
        }
    };

    const defaultVisible = (item: {icon: string, title: string, link: string, isMark: boolean, contents: {icon: string, title: string, link: string, isMark: boolean}[]}) => {
        let result = false;
        if (item.link === location.pathname) {
            result = true;
        }
        for (let content of item.contents) {
            if (content.link === location.pathname) {
                console.log(item.title, content.link, location.pathname, (content.link === location.pathname ? "true" : "false"));
                result = true;
                break;
            }
        }
        return result;
    };

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
                    {navItems.map((item) => (
                        (item.icon === "" && item.title === "" && item.link === "") ?
                            <NavDivider /> :
                            <NavItemWrapper className={defaultVisible(item) ? "visible" : ""}>
                                <NavItem onClick={() => closeNavigate(item.link)} className={location.pathname === item.link ? "selected" : ""}>
                                    {item.icon !== "" ? <Icon baseClassName={"material-icons-round"}>{item.icon}</Icon> : <></>}
                                    {item.svg !== undefined ? <img src={item.svg} className={"icon"}/> : <></>}
                                    <div className={"title"}>{item.title}</div>
                                    {item.isMark ? <div className={"mark"} /> : <></> }
                                    {item.contents.length !== 0 ? <button onClick={navDropdown}><Icon baseClassName={"material-icons-round"}>arrow_drop_down</Icon></button> : <></> }
                                </NavItem>
                                {item.contents.length !== 0 ? <NavSubItemWrapper className={"sub-items"}>
                                    {item.contents.map((content) => (
                                        <NavItem onClick={() => closeNavigate(content.link)} className={location.pathname === content.link ? "selected" : ""}>
                                            <img src={content.icon} />
                                            <div className={"title"}>{content.title}</div>
                                            {content.isMark ? <div className={"mark"} /> : <></> }
                                        </NavItem>
                                    ))}
                                </NavSubItemWrapper> : <></>}
                            </NavItemWrapper>
                    ))}
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
    backdrop-filter: blur(5px);

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
    padding: 0.5rem 0;
    box-sizing: border-box;
    overflow-y: auto;
    border-radius: 0 1rem 1rem 0;
    background-color: ${props => props.theme.colors.colorBackground};
    transition: all 0.5s ease;

    &.open {
        left: 0;
    }

    @media ${({ theme }) => theme.device.mobile} {
        width: 100%;
        left: -100%;
        border-radius: 0;
    }
`

const NavIcons = styled.ul`
    list-style: none;
    margin: 0 0.5rem;
    justify-content: ${props => props.style?.justifyContent};
    display: flex;
`;

const NavIconListWrapper = styled.div`
    border-radius: 2rem;
    margin-left: 0.5rem;
    overflow: hidden;
    transition: background-color 0.5s ease;
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }

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
    margin-top: 1rem;
`;

const NavDivider = styled.div`
    margin: 0.5rem 0;
    width: 100%;
    height: 1px;
    background: ${props => props.theme.colors.colorOnSurface};
`

const NavItemWrapper = styled.div`
    display: flex;
    flex-direction: column;

    &.visible {
        & > button {
            background-color: ${props => props.theme.colors.colorSurfaceVariant};

            & > button {
                rotate: 180deg;
            }
        }

        & > div {
            max-height: 20rem;
            transition: max-height 0.8s ease-in;
        }
    }

    & > button {
        &:hover {
            background-color: ${props => props.theme.colors.colorSurfaceVariant};
        }

        &.selected {
            background-color: ${props => props.theme.colors.brand.pink}24;
        }
    }
`

const NavSubItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 0;
    margin-left: 2rem;
    overflow: hidden;
    transition: max-height 0.5s ease-out;

    & > button {
        background-color: transparent;
        border-radius: 4rem;
        transition: background-color 1s ease;

        &:hover {
            background-color: ${props => props.theme.colors.colorSurfaceVariant};
        }

        &.selected {
            background-color: ${props => props.theme.colors.brand.pink}24;
        }
    }

    & > :first-child {
        margin-top: 0.2rem;
    }

    & > :last-child {
        margin-bottom: 0.2rem;
    }
`

const NavItem = styled.button`
    background-color: transparent;
    border-radius: 4rem;
    padding: 0 1rem;
    margin: 0 0.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: background-color 0.5s ease;

    & > * {
        transition: color 0.5s ease;
        color: ${props => props.theme.colors.colorOnSurface};
    }

    & > img {
        height: 2rem;
    }
    
    & > img.icon {
        height: 24px;
        margin-left: 0.5rem;
        transition: filter 0.5s ease;
        filter: ${props => (props.theme.name === "light") ? "" : "invert(100%) sepia(1%) saturate(3596%) hue-rotate(200deg) brightness(119%) contrast(76%);"};
    }

    & > span {
        margin-left: 0.5rem;
    }

    & > div.title {
        margin: 1rem auto 1rem 1rem;
        text-align: start;
        font-weight: 600;
        font-size: 1rem;
        font-family: Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    }

    & > div.mark {
        width: 0.6rem;
        margin-right: 0.5rem;
        aspect-ratio: 1;
        border-radius: 1rem;
        background-color: ${props => props.theme.colors.colorError};
        transition: background-color 0.5s ease;
    }

    & > button {
        background: transparent;
        display: flex;
        padding: 0;
        align-items: center;
        transition: rotate 0.5s ease;

    }
`

export default Sidebar;
