import {useEffect, useState} from "react";
import styled from "styled-components";
import {Icon} from "@mui/material";

function ButtonToTop() {
    const [buttonVisible, setButtonVisible] = useState(false);

    const changeButtonVisible = () => {
        window.scrollY >= 10 ? setButtonVisible(true) : setButtonVisible(false);
    }

    const scrollToTop = () => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
    }

    useEffect(() => {
        window.addEventListener('scroll', changeButtonVisible);
    }, []);

    return (
        <ButtonWrapper className={buttonVisible ? "visible" : ""} onClick={scrollToTop}>
            <Icon baseClassName={"material-icons-round"}>expand_less</Icon>
        </ButtonWrapper>
    );
}

const ButtonWrapper = styled.button`
    position: fixed;
    width: 3rem;
    height: 3rem;
    border-radius: 3rem;
    background-color: ${props => props.theme.colors.colorOnSurfaceVariant};
    left: 50%;
    bottom: -10%;
    transform: translateX(-50%);
    margin-bottom: 2rem;
    z-index: 990;
    transition: bottom 0.5s ease, background-color 0.5s ease;
    
    &.visible {
        bottom: 0%;
    }
    
    & > span {
        position: absolute;
        color: ${props => props.theme.colors.colorSurfaceVariant};
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        transition: color 0.5s ease;
    }
`


export default ButtonToTop;
