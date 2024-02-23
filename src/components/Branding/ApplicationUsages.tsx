import styled from "styled-components";
import {ContentWrapper, TextTitle} from "./CommonComponent";
import React from "react";
import background from "../../assets/branding/2024/mockup/background.png"
import pinButton from "../../assets/branding/2024/mockup/pin_button.png"
import pinButton2 from "../../assets/branding/2024/mockup/pin_button2.png"
import squareSticker from "../../assets/branding/2024/mockup/square_sticker.png"

export default function ApplicationUsages() {
    return (
        <Wrapper>
            <TextTitle><div className={"number"}><div /><span>02</span></div>Application Usages</TextTitle>
            <ContentWrapper>
                <img src={background} />
                <img src={pinButton} />
                <img src={pinButton2} />
                <img src={squareSticker} />
            </ContentWrapper>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1rem 1rem 0 2rem;
    animation: Mount-animation 0.5s ease;
    align-items: start;

    @media ${({theme}) => theme.device.mobile} {
        flex-direction: column;
        margin: 1rem 1rem 0 1rem;
    }
`
