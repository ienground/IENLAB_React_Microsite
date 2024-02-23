import {Skeleton, Typography} from "@mui/material";
import styled from "styled-components";

export default function TitleSkeleton() {
    return (
        <Wrapper>
            <div className={"category"}>
                <Skeleton variant={"text"} width={60}/>
            </div>
            <Skeleton className={"timestamp"} variant={"text"}/>
            <Skeleton className={"title"} variant={"text"}/>
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
    
    & > .timestamp {
        width: calc(30% - 1rem);
        padding: 0.5rem;
        font-size: medium;
    }
    
    & > .title {
        width: calc(100% - 2rem);
        padding: 1rem;
        font-size: xxx-large;

        @media ${({ theme }) => theme.device.tablet} {
            font-size: xx-large;
        }
    }
`
