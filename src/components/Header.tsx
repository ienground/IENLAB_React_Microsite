import styled from "styled-components";
import {Icon} from "@mui/material";
import mainIcon from "../assets/img_logo_typo.png";
import mainIconWhite from "../assets/img_logo_typo_white.png";
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
        color: navBg ? "#FFFFFF" : "#000000"
    }

    return (
      <HeaderWrapper style = { navBg ? { backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 999 } : {} }>
          <NavIcons style = { { justifyContent: "start" } }>
              <NavIconList><Icon baseClassName={"material-icons-round"} sx={ iconStyle }>menu</Icon></NavIconList>
              <NavIconList><Icon baseClassName={"material-icons-round"} sx={ iconStyle }>search</Icon></NavIconList>
          </NavIcons>
          <MainLogo style = { navBg ? { backgroundImage: mainIconWhite } : { backgroundImage: mainIcon } }/>
          <NavIcons style = { { justifyContent: "end" } }>
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
    //justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    margin: 0 2rem 0 2rem;
    border-radius: 0 0 1rem 1rem;
    padding: 0.5rem 0 0.5rem 0;
`;

const MainLogo = styled.div`
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
`;


export default Header;
