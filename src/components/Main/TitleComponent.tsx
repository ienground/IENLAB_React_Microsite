import styled from "styled-components";

export const ButtonGo = styled.button`
    display: flex;
    width: 3rem;
    height: 3rem;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 3rem;
    transition: all 0.5s ease;
    align-items: center;
    
    &:hover {
        //border-radius: 0;
    }
`

export const TextDate = styled.div`
    margin-right: auto;
    margin-top: auto;
    margin-bottom: 1rem;
    padding: 0.5rem;
    background-color: black;
    color: white;
`
export const TextTitle = styled.span`
    display: inline-block;
    font-weight: bold;
    font-size: xx-large;
    background-color: black;
    line-break: auto;
    color: white;
    padding: 0.5rem;
    margin-right: auto;
`

export const TitleButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: end;
`
