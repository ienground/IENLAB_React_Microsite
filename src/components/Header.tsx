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
        window.scrollY >= 50 ? setNavBg(true) : setNavBg(false);
        console.log(window.scrollY);
    }

    useEffect(() => {
        window.addEventListener('scroll', changeNavBg);
        return () => {
            // window.removeEventListener('scroll', changeNavBg);
        }
    }, []);

    const style = {
        backgroundColor: '#FF4081'
    }

    const iconStyle = {
        color: navBg ? "#FFFFFF" : "#000000"
    }

    return (
      <HeaderWrapper style={navBg ? { backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 999 } : {} }>
          <NavIcons>
              <NavIconList><Icon baseClassName={"material-icons-round"} sx={ iconStyle }>menu</Icon></NavIconList>
              <NavIconList><Icon baseClassName={"material-icons-round"} sx={ iconStyle }>search</Icon></NavIconList>
          </NavIcons>
          <MainLogo style={ navBg ? { backgroundImage: mainIcon } : { backgroundImage: mainIcon } }/>
          <NavIcons>
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
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    padding: 0.5rem;
`;

const MainLogo = styled.div`
    width: 14rem;
    height: 2rem;
    background-image: Main;
`;

const NavIcons = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
`;

const NavIconList = styled.li`
    padding: 1rem;
`;


export default Header;
