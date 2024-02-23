import styled from "styled-components";
import LoremIpsum from "react-lorem-ipsum";
import {Fade, Skeleton} from "@mui/material";
import {useState} from "react";

interface RecentChangeProps {
    changelog: string
}

export default function RecentChange({changelog}: RecentChangeProps) {
    const [isPrepared, setIsPrepared] = useState(false);

    return (
      <RecentChangeWrapper>
          <TextTitle>변경 사항</TextTitle>
          <div className={"change-wrapper"}>
              <Fade className={"skeleton"} in={changelog === "-"} addEndListener={() => { setIsPrepared(true); }}>
                  <TextContent>
                      <Skeleton width={"40%"} variant={"text"} sx={{fontSize: "x-large"}} />
                      <Skeleton width={"40%"} variant={"text"} sx={{fontSize: "x-large"}} />
                      <Skeleton width={"40%"} variant={"text"} sx={{fontSize: "x-large"}} />
                  </TextContent>
              </Fade>
              <Fade className={"data"} in={isPrepared && changelog !== "-"}>
                  <TextContent>{changelog}</TextContent>
              </Fade>
          </div>
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
    animation: Mount-animation 0.5s ease;
    
    & > span {
        transition: color 0.5s ease;
    }
    
    & > .change-wrapper {
        width: 100%;
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 1fr;

        & > .skeleton {
            z-index: 500;
        }

        & > .data {
            z-index: 501;
        }
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
    grid-column: 1;
    grid-row: 1;
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    font-size: medium;
    align-items: center;
`
