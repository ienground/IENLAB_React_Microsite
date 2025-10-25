import styled from "styled-components";

export const CommonWrapper = styled.div`
  flex-grow: 1;
  
  width: 100%;
  max-width: calc(1440px + 2rem);
  padding: 0 1rem;
  
  display: flex;
  flex-direction: column;
  
  
  & > .header {
    min-height: 200px;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    & > div {
      font-size: xxx-large;
      font-weight: bold;
      text-align: center;

      ${({ theme }) => theme.breakpoints.down("tablet")} {
        font-size: xx-large;
      }
    }
  }
  
  & > .toolbar {
    
  }
  
  & > .content-wrapper {
  }
`;