import styled from "styled-components";

export const TextContentTitle = styled.span<{fontWeight?: string, letterSpacing?: string}>`
    font-weight: ${props => props.fontWeight ? props.fontWeight : 'bold'};
    font-size: xxx-large;
    letter-spacing: ${props => props.letterSpacing ? props.letterSpacing : '0'};
    word-break: keep-all;
    line-height: 1.2;
    color: ${props => props.theme.colors.colorOnSurfaceVariant};
    transition: color 0.5s ease;
    
    @media ${({ theme }) => theme.device.mobile} {
        font-size: x-large;
    }
    
    &.xxx-large {
        font-size: xxx-large;
        @media ${({ theme }) => theme.device.mobile} {
            font-size: xx-large;
        }
    }
    
    &.xx-large {
        font-size: xx-large;
    }

    & > span {
        transition: color 0.5s ease;
    }
    
    &.black, & > .black {
        color: ${props => props.theme.colors.colorOnSurface};
    }
    
    & > .underline {
        text-decoration: underline;
        text-underline-position: under;
    }
    
    & > .background {
        transition: background-color 0.5s ease, color 0.5s ease;
        background-color: ${props => props.theme.colors.colorOnSurface};
        color: ${props => props.theme.colors.colorSurface};
        padding: 0 0.5rem;
        margin-right: 0.5rem;
        box-decoration-break: clone;
        -webkit-box-decoration-break: clone;

        @media ${({ theme }) => theme.device.mobile} {
            padding: 0 0.25rem;
            margin-right: 0.25rem;
        }
    }
`

export const TextContentContent = styled.span<{fontWeight?: string, letterSpacing?: string}>`
    color: ${props => props.theme.colors.colorOnSurfaceVariant};
    font-weight: ${props => props.fontWeight ? props.fontWeight : 'normal'};
    font-size: 'medium';
    letter-spacing: ${props => props.letterSpacing ? props.letterSpacing : '0'};
    transition: color 0.5s ease;
    line-height: 1.3;
    
    &.xxx-large {
        font-size: xxx-large;
        @media ${({ theme }) => theme.device.mobile} {
            //font-size: ;
        }
    }
    
    &.xx-large {
        font-size: xx-large;
        @media ${({ theme }) => theme.device.mobile} {
            font-size: larger;
        }
    }
    
    &.x-large {
        font-size: x-large;
        @media ${({ theme }) => theme.device.mobile} {
            font-size: medium;
        }
    }
    
    &.medium {
        font-size: medium;
    }
    
    & > span {
        transition: color 0.5s ease;
    }
    
    & > .black, &.black {
        color: ${props => props.theme.colors.colorOnSurface};
    }
    
    & > .bold {
        font-weight: bold;
    }
    
    & > .nine {
        font-weight: 900;
    }

    & > .background {
        transition: background-color 0.5s ease, color 0.5s ease;
        background-color: ${props => props.theme.colors.colorOnSurface};
        color: ${props => props.theme.colors.colorSurface};
        padding: 0 0.5rem;
        margin-right: 0.5rem;

        @media ${({ theme }) => theme.device.mobile} {
            padding: 0 0.25rem;
            margin-right: 0.25rem;
        }
    }
    
    & > .red {
        color: ${props => props.theme.colors.colorRed};
    }

    & > .underline {
        text-decoration: underline;
        text-underline-position: under;
    }
    
    & > .bold {
        font-weight: bold;
    }
`

export const ContentWrapper = styled.div`
    width: 85%;
    display: flex;
    flex-direction: column;
    align-items: start;

    @media ${({ theme }) => theme.device.mobile} {
        width: 100%;
    }
`

export const InnerWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: start;
    margin-bottom: 4rem;

    @media ${({ theme }) => theme.device.mobile} {
        flex-direction: column;
        margin-bottom: 1rem;
        
        &:last-child {
            margin-bottom: 0;
        }
    }
`

export const InnerBoxWrapper = styled.div`
    background-color: ${props => props.theme.colors.colorSurfaceVariant};
    padding: 2rem;
    border-radius: 1rem;
    animation: Mount-animation 0.5s ease;
    transition: background-color 0.5s ease, transform 0.5s ease, box-shadow 0.5s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            transform: translateY(-0.5rem);
            box-shadow: 0 0 40px -0.5rem black;
        }
    }

    @media ${({ theme }) => theme.device.mobile} {
        padding: 1rem;
    }
`

export const InnerTitleWrapper = styled.div`
    width: 30%;
    display: block;
    position: sticky;
    top: 6.5rem;

    @media ${({ theme }) => theme.device.mobile} {
        width: 100%;
        position: relative;
        top: 0;
        margin-top: 1rem;
        margin-bottom: 1rem;
        
        //&.mobile-horizontal {
        //    display: flex;
        //    flex-direction: row;
        //}
    }
`

export const InnerContentWrapper = styled.div`
    width: calc(70% - 2rem);
    margin-left: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    @media ${({ theme }) => theme.device.mobile} {
        width: 100%;
        margin-left: 0;
    }
`

export const ImgIcon = styled.img`
    width: 4rem;

    @media ${({ theme }) => theme.device.mobile} {
        width: 2rem;
    }
`

export const ImgTitleIcon = styled.img`
    width: 6rem;

    @media ${({ theme }) => theme.device.mobile} {
        width: 3rem;
    }
`
