import styled from "styled-components";
import React from "react";
import LoremIpsum from "react-lorem-ipsum";
import {Icon} from "@mui/material";
import Ripples from "react-ripples"
import {AppProps} from "../App";
import {useLocation, useNavigate} from "react-router-dom";
import icCalarm from "../assets/icon/ic_calarm.png";
import icTetris from "../assets/icon/ic_tetris_rpg.png";
import icIenlab from "../assets/brand/ic_ienlab.svg";
import imgLogoFull from "../assets/brand/img_logo_full.png";
import {LastEditData} from "../data/LastEditData";

export interface SidebarProps {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = SidebarProps;

export default function Sidebar({ isOpen, setIsOpen} : Props) {
    const location = useLocation();
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen(false)
    }

    const closeNavigate = (dest: string) => {
        toggleSidebar();
        navigate(dest);
    }

    const homeItem = {
        icon: "home", svg: "", title: "홈", link: "/", contents: [
            { icon: "notifications", svg: "", title: "공지사항", link: "/notice" },
            { icon: "policy", svg: "", title: "개인정보 처리방침", link: "/privacy" }
        ]
    };
    const navItems = [
        { icon: "", svg: icIenlab, title: "아이엔 IENGROUND", link: "/intro", contents: [] },
        { icon: "brush", title: "브랜드 아이덴티티", link: "/brand", contents: [] },
        { icon: "code", title: "개발", link: "/dev", contents: [
            { icon: "", svg: icCalarm, title: "캘람", link: "/calarm" },
            { icon: "", svg: icTetris, title: "테트리스 RPG", link: "/tetris" },
        ] },
    ];

    const navDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        let parent = e.currentTarget.parentNode?.parentElement?.parentElement;

        if (parent?.classList?.contains("visible")) {
            parent?.classList?.remove("visible");
        } else {
            parent?.classList?.add("visible");
        }
    };

    const defaultVisible = (item: {icon: string, title: string, link: string, contents: {icon: string, title: string, link: string}[]}) => {
        let result = false;
        if (item.link === location.pathname) {
            result = true;
        }
        for (let content of item.contents) {
            if (location.pathname.includes(content.link)) {
                result = true;
                break;
            }
        }
        return result;
    };

    const checkMark = (item: {icon: string, title: string, link: string}) => {
        const date = new Date();
        const currentDate = new Date();
        const data = LastEditData.get(item.link);

        if (data !== undefined) {
            date.setFullYear(data[0], data[1] - 1, data[2]);
            date.setHours(data[3], data[4], 0);
        }

        let diff = Math.abs(currentDate.getTime() - date.getTime());

        return data !== undefined && Math.ceil(diff / (1000 * 3600 * 24)) <= 7;
    }

    return (
        <Wrapper className={isOpen ? "open" : ""}>
            <div>
                <div className={"background"} onMouseEnter={toggleSidebar}/>
                <div className={"content"}>
                    <div>
                        <div className={"home" + (defaultVisible(homeItem) ? " visible" : "")}>
                            <MenuButton className={location.pathname === homeItem.link ? "selected" : ""} onClick={() => navigate(homeItem.link)}>
                                <Icon className={homeItem.icon} baseClassName={"material-icons-round"}>home</Icon>
                                <div>
                                    <div className={"title"}>{homeItem.title}</div>
                                    {homeItem.contents.length !== 0 ? <button onClick={navDropdown}><Icon baseClassName={"material-icons-round"}>arrow_drop_down</Icon></button> : <></>}
                                </div>
                            </MenuButton>
                            <div>
                                {homeItem.contents.map((content) => (
                                    <SubMenuButton className={location.pathname.includes(content.link) ? "selected" : ""} onClick={() => navigate(content.link)}>
                                        {content.icon !== "" ? <Icon baseClassName={"material-icons-round"}>{content.icon}</Icon> : <></>}
                                        {content.svg !== "" ? <img src={content.svg} className={"icon"}/> : <></>}
                                        <div className={"title"}>{content.title}</div>
                                        {checkMark(content) ? <NewMark /> : <></> }
                                    </SubMenuButton>
                                ))}
                            </div>
                        </div>
                        <div className={"divider"}/>
                        <div className={"list"}>
                            {navItems.map((item) => (
                                <div className={defaultVisible(item) ? "visible" : ""}>
                                    <MenuButton className={location.pathname === item.link ? "selected" : ""} onClick={() => navigate(item.link)}>
                                        {item.icon !== "" ? <Icon baseClassName={"material-icons-round"}>{item.icon}</Icon> : <></>}
                                        {item.svg !== undefined ? <img src={item.svg} className={"icon"}/> : <></>}
                                        <div>
                                            <div className={"title"}>{item.title}</div>
                                            {checkMark(item) ? <NewMark /> : <></> }
                                            {item.contents.length !== 0 ? <button onClick={navDropdown}><Icon baseClassName={"material-icons-round"}>arrow_drop_down</Icon></button> : <></>}
                                        </div>
                                    </MenuButton>
                                    <div>
                                        {item.contents.map((content) => (
                                            <SubMenuButton className={location.pathname.includes(content.link) ? "selected" : ""} onClick={() => navigate(content.link)}>
                                                {content.icon !== "" ? <Icon baseClassName={"material-icons-round"}>{content.icon}</Icon> : <></>}
                                                {content.svg !== undefined ? <img src={content.svg} className={"icon"}/> : <></>}
                                                <div className={"title"}>{content.title}</div>
                                                {checkMark(content) ? <NewMark /> : <></> }
                                            </SubMenuButton>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    height: calc(100% - 4.5rem);
    visibility: hidden;
    position: fixed;
    top: 4.5rem;
    z-index: 991;
    transition: visibility 1s ease;

    & > div {
        width: 100%;
        height: 100%;
        position: relative;

        & > div.background {
            width: 100%;
            height: 100%;
            position: absolute;
            background-color: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(5px);
            opacity: 0;
            visibility: hidden;
            transition: opacity 1s ease, visibility 1s ease;
        }

        & > div.content {
            width: 100%;
            max-height: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: absolute;
            overflow: hidden;
            border-radius: 0 0 1rem 1rem;
            background-color: ${props => props.theme.colors.colorSurface};
            transition: max-height 0.5s ease-out, background-color 0.5s ease;

            & > div {
                max-width: 1440px;
                width: 100%;
                height: fit-content;
                display: grid;
                grid-template-columns: 1fr 2px 3fr;
                column-gap: 1rem;
                row-gap: 1rem;
                transition: visibility 0.5s ease;

                & > div {
                    margin-bottom: 1rem;

                    @media ${({ theme }) => theme.device.tablet} {
                        margin-bottom: 0;
                    }
                }
                
                &:last-child {
                    margin-bottom: 1rem;
                }
                
                & > .divider {
                    width: 2px;
                    background-color: ${props => props.theme.colors.colorOnSurface};
                    transition: background-color 0.5s ease;

                    @media ${({ theme }) => theme.device.tablet} {
                        width: 100%;
                        height: 2px;
                        margin: 1rem 0;
                    }
                }

                & > .list {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    column-gap: 1rem;
                    row-gap: 1rem;

                    @media ${({ theme }) => theme.device.netbook} {
                        grid-template-columns: 1fr 1fr;
                    }

                    @media ${({ theme }) => theme.device.tablet} {
                        grid-template-columns: 1fr;
                        column-gap: 0;
                        row-gap: 0;
                    }
                }
                
                & > div.home, & > .list > div {
                    &.visible {
                        & > button {
                            background-color: ${props => props.theme.colors.colorSurfaceVariant};
                            
                            & > div > button > span {
                                rotate: 180deg;
                            }
                        }
                        
                        & > div {
                            max-height: 20rem;
                            transition: max-height 0.8s ease-in;
                        }
                    }
                    
                    & > div {
                        max-height: 0;
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                        transition: max-height 0.5s ease-out;
                    }
                }

                @media ${({ theme }) => theme.device.pc} {
                    width: calc(100% - 2rem);
                    padding: 0 1rem;
                }

                @media ${({ theme }) => theme.device.netbook} {
                    grid-template-columns: 1fr 2px 2fr;
                }

                @media ${({ theme }) => theme.device.tablet} {
                    grid-template-columns: 1fr;
                    column-gap: 0;
                    row-gap: 0;
                }
            }
        }
    }
    
    &.open {
        visibility: visible;
        
        & > div {
            & > div.background {
                opacity: 1;
                visibility: visible;
            }

            & > div.content {
                max-height: 50%;
                transition: max-height 0.8s ease-in, background-color 0.5s ease;

                @media ${({ theme }) => theme.device.tablet} {
                    max-height: 100%;
                }
            }
    }
`

const MenuButton = styled.button`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background-color: ${props => props.theme.colors.colorSurface};
    border-radius: 1rem;
    transition: background-color 0.5s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: ${props => props.theme.colors.colorOnSurface}19;
        }
    }

    &.selected {
        background-color: ${props => props.theme.colors.brand.pink}24 !important;
    }

    & > img {
        width: 36px;
        height: 36px;
        transition: filter 0.5s ease;
        filter: ${props => (props.theme.name === "light") ? "" : "invert(100%) sepia(1%) saturate(3596%) hue-rotate(200deg) brightness(119%) contrast(76%);"};
    }

    & > span {
        font-size: 36px;
        color: ${props => props.theme.colors.colorOnSurface};
        transition: color 0.5s ease;

        &.home {
            margin-left: -4px;
        }
    }

    & > div {
        width: 100%;
        display: flex;
        flex-direction: row;
        margin-top: 1rem;

        & > .title {
            flex-grow: 1;
            font-weight: 700;
            font-size: x-large;
            text-align: start;
            color: ${props => props.theme.colors.colorOnSurface};
            transition: color 0.5s ease;
        }

        & > button {
            background-color: transparent;
            padding: 0;
            margin-right: -6px;
            
            & > span {
                color: ${props => props.theme.colors.colorOnSurface};
                transition: rotate 0.5s ease, color 0.5s ease;
            }
        }
    }
`

const SubMenuButton = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: ${props => props.theme.colors.colorSurface};
    border-radius: 1rem;
    transition: background-color 0.5s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: ${props => props.theme.colors.colorOnSurface}19;
        }
    }

    &.selected {
        background-color: ${props => props.theme.colors.brand.pink}24;
    }

    & > img {
        height: 24px;
    }

    & > span {
        color: ${props => props.theme.colors.colorOnSurface};
        transition: color 0.5s ease;
    }
    & > div.title {
        color: ${props => props.theme.colors.colorOnSurface};
        font-weight: 700;
        font-size: medium;
        transition: color 0.5s ease;
    }
`

const NewMark = styled.div`
    width: 0.6rem;
    height: 0.6rem;
    margin: auto 0 auto auto;
    border-radius: 1rem;
    background-color: ${props => props.theme.colors.colorError};
    transition: background-color 0.5s ease;
`
