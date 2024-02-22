import styled from "styled-components";

export const ButtonGo = styled.button`
    display: flex;
    width: 3rem;
    height: 3rem;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 3rem;
    transition: all 0.5s ease;
    align-items: center;
    
    & > span {
        width: 100%;
    }
`

export const TextDate = styled.div`
    margin-right: auto;
    margin-top: auto;
    padding: 0.5rem;
    background-color: black;
    color: white;

    @media ${({ theme }) => theme.device.tablet} {
        font-size: small;
    }
`
export const TextTitle = styled.h1`
    margin-right: auto;
    
    & > span {
        padding: 0.5rem;
        font-weight: bold;
        font-size: xx-large;
        word-break: keep-all;
        line-height: 2;
        background-color: black;
        color: white;
        box-decoration-break: clone;
        -webkit-box-decoration-break: clone;

        @media ${({ theme }) => theme.device.tablet} {
            font-size: large;
        }
    }
`

export const TitleButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: end;
`
