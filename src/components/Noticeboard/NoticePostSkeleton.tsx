import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {NoticePostProps} from "../../pages/Noticeboard";
import {Skeleton} from "@mui/material";

export default function NoticePostSkeleton() {
    return (
        <Wrapper>
            <div className={"category"}>
                <Skeleton variant={"text"} width={60}/>
            </div>
            <Skeleton variant={"text"} sx={{fontSize: "xx-large"}} width={"60%"}/>
            <Skeleton variant={"text"} sx={{fontSize: "x-large"}} width={"40%"}/>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: calc(100% - 2rem);
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border-radius: 1rem;
    background-color: ${props => props.theme.colors.colorSurfaceVariant};
    transition: background-color 0.5s ease;
    
    & > * {
        color: ${props => props.theme.colors.colorOnSurface};
        transition: color 0.5s ease;
    }
    & > .category {
        width: fit-content;
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        margin-bottom: 1rem;
        color: ${props => props.theme.colors.colorSurface};
        background-color: ${props => props.theme.colors.colorOnSurface}80;
        transition: color 0.5s ease, background-color 0.5s ease;
    }
    
    & > .title {
        font-weight: 700;
        font-size: xx-large;
    }
    
    & > .create_time {
        font-weight: 400;
    }
`
