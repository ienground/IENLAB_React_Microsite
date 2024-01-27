import styled from "styled-components";
import background from "../../../src/assets/dev_page_nologo.png"
import {ButtonGo, TextDate, TitleButtonWrapper, TextTitle} from "./TitleComponent";
import {Icon} from "@mui/material";
import React from "react";

function Contact() {

    return (
        <ContactWrapper style={{backgroundImage: background}}>
            {/*<TextDate>Contact on</TextDate>*/}
            <TitleButtonWrapper>
                {/*<TextTitle>my@ien.zone</TextTitle>*/}
                {/*<ButtonGo onClick={sendMail}><Icon baseClassName={"material-icons-round"}>arrow_forward</Icon></ButtonGo>*/}
            </TitleButtonWrapper>
        </ContactWrapper>
    );
}

const ContactWrapper = styled.div`
    display: flex;
    overflow: hidden;
    position: relative;
    flex-direction: column;
    width: 40%;
    height: 12rem;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${ props => props.style?.backgroundImage });
    border-radius: 1rem;
    margin: 1rem 2rem 0 0;
    padding: 1rem;
`

export default Contact;
