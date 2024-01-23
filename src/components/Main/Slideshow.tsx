import styled from "styled-components";
import theme from "../../style/theme";
import {Button} from "@mui/material";
import 'react-slideshow-image/dist/styles.css'
import './slideshow.css'
import {Slide} from "react-slideshow-image";
import bgIenlab from "../../assets/background_ienlab.png"
import bgCalarm from "../../assets/background_calarm.png"

function Slideshow() {
    const images = [
        bgIenlab,bgCalarm
    ];

    return (
        <SlideshowWrapper theme={theme} className={"wrapper"}>
            <Slide>
                <div className={"each-slide-effect"}>
                    <div style={{'backgroundImage': `url(${images[0]})`}}>
                        <span>Slide 1</span>
                    </div>
                </div>
                <div className={"each-slide-effect"}>
                    <div style={{'backgroundImage': `url(${images[1]})`}}>
                        <span>Slide 2</span>
                    </div>
                </div>
            </Slide>
        </SlideshowWrapper>
    );
}

const SlideshowWrapper = styled.div`
    display: flex;
    aspect-ratio: 21 / 9;
    //background-color: #6a5a5d;
    border-radius: 1rem;
    margin: 0 2rem 0 2rem;
    
    div:first-of-type {
        width: 100%;
        height: 100%;
        border-radius: 1rem;
    }
`;

export default Slideshow;
