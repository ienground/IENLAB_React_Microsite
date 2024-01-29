import styled from "styled-components";

export const TextTitle = styled.span`
    width: 15%;
    font-weight: bolder;
    font-size: 3vmax;
    position: sticky;
    top: 6.5rem;
`

export const TextContentTitle = styled.span`
    font-weight: bolder;
    font-size: xxx-large;
    line-height: 1.2;
    color: ${props => props.theme.colors.colorOnSurfaceVariant};
    
    transition: color 0.5s ease;
    & > .black {
        transition: color 0.5s ease;
        color: ${props => props.theme.colors.colorOnSurface};
    }
    
    & > .underline {
        text-decoration: underline;
        text-underline-position: under;
    }
`

export const ContentWrapper = styled.div`
    width: 85%;
    display: flex;
    flex-direction: row;
    align-items: start;
`
