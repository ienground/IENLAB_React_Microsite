import styled from "styled-components";
import LoremIpsum from "react-lorem-ipsum";
import {TextTitle} from "./CommonComponent/CommonComponent";

function TechStack() {
    return (
        <TechStackWrapper>
            <TextTitle>기술 스택</TextTitle>
            <div style={{display: "flex", flexDirection: "column", width: "85%"}}>
                <LoremIpsum p={100} />
            </div>
        </TechStackWrapper>
    );
}

const TechStackWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1rem 2rem 0 2rem;
    animation: Mount-animation 0.5s;
    align-items: start;
`

export default TechStack;
