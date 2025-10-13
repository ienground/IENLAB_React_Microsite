import styled from "styled-components";

export const CommonWrapper = styled.div`
  flex-grow: 1;
  
  width: 100%;
  max-width: 1440px;
  
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
    }
  }
  
  & > .toolbar {
    
  }
  
  & > .content-wrapper {
  }
`;