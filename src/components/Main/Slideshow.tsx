import styled from "styled-components";
import {Button, Icon} from "@mui/material";
import 'react-slideshow-image/dist/styles.css'
import './slideshow.css'
import {Slide} from "react-slideshow-image";
import bgIenlab from "../../assets/background_ienlab.png"
import bgCalarm from "../../assets/background_calarm.png"
import React from "react";

function Slideshow() {
    const images = [
        bgIenlab,bgCalarm
    ];

    let indicators = (index?: number) => (<SlideshowIndicators />);
    let prevButton =
        <SlideshowButton>
            <Icon baseClassName={"material-icons-round"}>arrow_back</Icon>
        </SlideshowButton>
    let nextButton =
        <SlideshowButton>
            <Icon baseClassName={"material-icons-round"}>arrow_forward</Icon>
        </SlideshowButton>


    return (
        <SlideshowWrapper className={"wrapper"}>
            <Slide prevArrow={prevButton} nextArrow={nextButton} indicators={indicators} easing={"ease"}>
                <div className={"each-slide-effect"}>
                    <SlideshowImage style={{'backgroundImage': `url(${images[0]})`}} />
                </div>
                <div className={"each-slide-effect"}>
                    <SlideshowImage style={{'backgroundColor': `black`}} />
                </div>
                <div className={"each-slide-effect"}>
                    <SlideshowImage style={{'backgroundColor': `red`}} />
                </div>
            </Slide>
        </SlideshowWrapper>
    );
}

const SlideshowWrapper = styled.div`
    display: flex;
    border-radius: 1rem;
    margin: 0 2rem 0 2rem;
    
    & > div {
        display: flex;
        flex-direction: row;
        width: 100%;
        border-radius: 1rem;
        overflow: hidden;
        background-color: #61dafb;
        align-items: end;
    }
    
    .react-slideshow-container {
        width: 100%;
    }
    
    ul.indicators {
        height: 2rem;
        position: absolute;
        margin-bottom: 2rem;
        align-items: center;
        left: 50%;
        transform: translate(-50%, 0);
        
        & > button {
            margin-right: 0.5rem;
        }
        & > :last-child {
            margin-right: 0;
        }
    }
`;

const SlideshowImage = styled.div`
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: ${props => props.style?.backgroundImage};
    
`;

const SlideshowButton = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 2rem;
    border-radius: 2rem;
    width: 4rem;
    height: 4rem;
    background-color: rgba(255, 255, 255, 0.5);

    & > span {
        display: inline-block;
        margin: auto;
    }
`

const SlideshowIndicators = styled.button`
    width: 0.5rem;
    height: 0.5rem;
    padding: 0;
    background-color: white;
    border-radius: 2rem;
    transition: all 0.5s ease;
    
    &.active {
        width: 1rem;
        height: 1rem;
    }
`

export default Slideshow;
