import styled from "styled-components";

function Noticeboard() {
    return (
        <NoticeboardWrapper>
            Noticeboard
        </NoticeboardWrapper>
    );
}

const NoticeboardWrapper = styled.div`
    display: flex;
    width: 60%;
    background-color: #3a2d2f;
    border-radius: 1rem;
    margin: 1rem 1rem 0 2rem;
    padding: 1rem;
`

export default Noticeboard;
