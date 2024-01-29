import styled from "styled-components";

function RecentProject() {
    return (
        <RecentProjectWrapper>
            RecentProject
        </RecentProjectWrapper>
    );
}

const RecentProjectWrapper = styled.div`
    display: flex;
    border-radius: 1rem;
    margin: 0 1rem;
    animation: Mount-animation 0.5s;
`

export default RecentProject;
