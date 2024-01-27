import styled from "styled-components";
import React from "react";

export interface SidebarProps {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function Sidebar({isOpen, setIsOpen}: SidebarProps) {
    const toggleSidebar = () => {
        setIsOpen(false)
    }

    const test = (e: React.MouseEvent) => {
        e.stopPropagation();
        console.log("hello world");
    }

    return (
        <SidebarBackground onClick={toggleSidebar} className={isOpen ? 'open' : ''}>
            <SidebarWrapper onClick={test} className={isOpen ? 'open' : ''}>
                sidebar {isOpen ? 1 : 0} yes!
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
    width: 40%;
    height: 100%;
    left: -40%;
    top: 0;
    background-color: ${props => props.theme.colors.colorBackground };
    
    transition: all 0.5s ease;
    &.open {
        left: 0;
    }
`
export default Sidebar;
