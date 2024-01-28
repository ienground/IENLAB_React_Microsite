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

const ButtonWrapper = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 3rem;
    height: 3rem;
    margin: 0 1rem 1rem 0;
    border-radius: 3rem;
    background-color: ${props => props.theme.colors.colorPrimary};
    transition: all 0.5s ease;

    & > span {
        //width: 50%;
        //height: 50%;
        display: inline-block;
        margin: auto;
    }
`;

export default ButtonWrapper;
