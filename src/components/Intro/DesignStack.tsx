import styled from "styled-components";

function DesignStack() {
    return (
        <DesignStackWrapper>

            DesignStack
        </DesignStackWrapper>
    );
}

const DesignStackWrapper = styled.div`
    display: flex;
    border-radius: 1rem;
    margin: 0 1rem;
    animation: Mount-animation 0.5s;
`

export default DesignStack;
