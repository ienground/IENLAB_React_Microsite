import styled from "styled-components";
import LoremIpsum from "react-lorem-ipsum";

interface RecentChangeProps {
    changelog: string
}

function RecentChange({changelog}: RecentChangeProps) {
    return (
      <RecentChangeWrapper>
          <TextTitle>변경 사항</TextTitle>
          <TextContent>{changelog}</TextContent>
      </RecentChangeWrapper>
    );
}

const RecentChangeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100% - 2rem);
    overflow: hidden;
    padding: 1rem;
    border-top: 1px solid ${props => props.theme.colors.colorOnSurface};
    animation: Mount-animation 0.5s;
    
    & > span {
        transition: color 0.5s ease;
    }
`

const TextTitle = styled.span`
    font-weight: bolder;
    font-size: xxx-large;
    margin-top: 1rem;

    @media ${({ theme }) => theme.device.mobile} {
        font-size: xxx-large;
        top: 0;
    }
`

const TextContent = styled.span`
    margin-top: 2rem;
    font-size: medium;
`

export default RecentChange;
