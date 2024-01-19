import styled from "styled-components";
import theme from "../../style/theme";
import {Button} from "@mui/material";

function Slideshow() {
    return (
        <SlideshowWrapper theme={theme}>
            Slideshow
            <Button variant="contained" color={"primary"}>Primary</Button>
            <Button variant="outlined" color="secondary" sx={{ ml: 2 }}>Secondary</Button>
        </SlideshowWrapper>
    );
}

const SlideshowWrapper = styled.div`
    display: flex;
    aspect-ratio: 16 / 9;
    //background-color: red;
    border-radius: 1rem;
`;

export default Slideshow;
