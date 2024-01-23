import styled from "styled-components";
import {Icon, SvgIcon} from "@mui/material";
import mainIcon from "../assets/img_logo_typo.png";
import mainIconWhite from "../assets/img_logo_typo_white.png";
import icTistory from "../assets/ic_tistory.svg";
import "../style/main.css"
import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faGithub } from "@fortawesome/free-brands-svg-icons"
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import zIndex from "@mui/material/styles/zIndex";

function Header() {
    const [navBg, setNavBg] = useState(false);
    const changeNavBg = () => {
        window.scrollY >= 10 ? setNavBg(true) : setNavBg(false);
        console.log(window.scrollY);
    }

    useEffect(() => {
        window.addEventListener('scroll', changeNavBg);
        return () => {
            // window.removeEventListener('scroll', changeNavBg);
        }
    }, []);

    const iconStyle = {
        transition: "all 0.3s ease-in-out",
        filter: navBg ? "invert(100%) sepia(0%) saturate(15%) hue-rotate(303deg) brightness(106%) contrast(105%)" : "invert(0%) sepia(100%) saturate(20%) hue-rotate(39deg) brightness(101%) contrast(107%)"
    }

    return (
      <HeaderWrapper style = { navBg ? { backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 999 } : {} }>
          <NavIcons style = { { justifyContent: "start" } }>
              <NavIconList><Icon baseClassName={"material-icons-round"} sx={ iconStyle }>menu</Icon></NavIconList>
              <NavIconList><Icon baseClassName={"material-icons-round"} sx={ iconStyle }>search</Icon></NavIconList>
          </NavIcons>
          <MainLogo style = { navBg ? { backgroundImage: mainIconWhite } : { backgroundImage: mainIcon } }/>
          <NavIcons style = { { justifyContent: "end" } }>
              <NavIconList><CustomIcon src={icTistory} style={iconStyle}/></NavIconList>
              <NavIconList><FontAwesomeIcon icon={faInstagram} size={"lg"} style={ iconStyle } /></NavIconList>
              <NavIconList><FontAwesomeIcon icon={faFacebook} size={"lg"} style={ iconStyle } /></NavIconList>
              <NavIconList><FontAwesomeIcon icon={faGithub} size={"lg"} style={ iconStyle } /></NavIconList>
          </NavIcons>
      </HeaderWrapper>
    );
}

const HeaderWrapper = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: sticky;
    top: 0;
    margin: 0 2rem 0 2rem;
    border-radius: 0 0 1rem 1rem;
    padding: 0.5rem 0 0.5rem 0;
    transition: all 0.3s ease-in-out;
`;

const MainLogo = styled.div`
    transition: all 0.3s ease-in-out;
    width: 20%;
    height: 2rem;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${props => props.style?.backgroundImage || ''});
`;

const NavIcons = styled.ul`
    width: 40%;
    list-style: none;
    padding: 0 1rem 0 1rem;
    justify-content: ${props => props.style?.justifyContent};
    display: flex;
    //background-color: aqua;
`;

const NavIconList = styled.li`
    padding: 1rem;
    align-items: center;
    display: flex;
`;

const CustomIcon = styled.img`
    transition: all 0.3s ease-in-out;
    height: 1.2rem;
    fill: #61dafb;
`


export default Header;
