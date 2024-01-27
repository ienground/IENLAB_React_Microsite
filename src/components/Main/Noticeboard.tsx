import styled from "styled-components";
import background from "../../../src/assets/dev_page_nologo.png"
import imgProfile from "../../../src/assets/img_ienground_profile.png"
import {Icon} from "@mui/material";
import React from "react";
import {ButtonGo, TextDate, TitleButtonWrapper, TextTitle} from "./TitleComponent";
function Noticeboard() {
    return (
        <NoticeboardWrapper style={{backgroundImage: background}}>
            <TextDate>Date</TextDate>
            <TitleButtonWrapper>
                <TextTitle>This is IENGROUND</TextTitle>
                <ButtonGo><Icon baseClassName={"material-icons-round"}>arrow_forward</Icon></ButtonGo>
            </TitleButtonWrapper>
        </NoticeboardWrapper>
    );
}

const NoticeboardWrapper = styled.div`
    display: flex;
    overflow: hidden;
    position: relative;
    flex-direction: column;
    width: 60%;
    height: 12rem;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${ props => props.style?.backgroundImage });
    border-radius: 1rem;
    margin: 1rem 1rem 0 2rem;
    padding: 1rem;
`

export default Noticeboard;
