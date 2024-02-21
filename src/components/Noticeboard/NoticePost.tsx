import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {NoticePostProps} from "../../pages/Noticeboard";

function NoticePost({item}: NoticePostProps) {
    const navigate = useNavigate();

    return (
        <Wrapper onClick={() => { navigate(`/notice/detail?id=${item.id}`) }}>
            <div className={"category"}>{item.category}</div>
            <div className={"title"}>{item.title}</div>
            <div className={"create_time"}>{item.create_time.toLocaleString()}</div>
        </Wrapper>
    );
}

const Wrapper = styled.button`
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    padding: 1rem;
    background-color: ${props => props.theme.colors.colorSurfaceVariant};
    transition: background-color 0.5s ease;
    
    & > * {
        color: ${props => props.theme.colors.colorOnSurface};
        transition: color 0.5s ease;
        font-family: Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        text-align: start;
    }
    & > .category {
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
        font-weight: 500;
    }
`

export default NoticePost;
