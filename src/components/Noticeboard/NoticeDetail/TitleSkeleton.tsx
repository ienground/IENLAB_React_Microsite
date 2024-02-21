import {Skeleton, Typography} from "@mui/material";
import styled from "styled-components";

function TitleSkeleton() {
    return (
        <Wrapper>
            <div className={"category"}>
                <Skeleton variant={"text"} width={60}/>
            </div>
            <Skeleton variant={"text"} sx={{fontSize: "2rem"}} width={"40%"}/>
            <Skeleton variant={"text"} sx={{fontSize: "6vmax"}} width={"100%"}/>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    & > .category {
        width: fit-content;
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        margin-bottom: 1rem;
        background-color: ${props => props.theme.colors.colorSurface}80;
        color: ${props => props.theme.colors.colorOnSurface};
        transition: color 0.5s ease, background-color 0.5s ease;
    }
`

export default TitleSkeleton;
