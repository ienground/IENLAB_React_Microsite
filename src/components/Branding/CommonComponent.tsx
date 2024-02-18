import styled from "styled-components";

export const ImgTitle = styled.div`
    display: flex;
    width: calc(100% - 2rem);
    aspect-ratio: 21 / 9;
    align-items: center;
    justify-content: space-between;
    border-radius: 1rem;
    margin: 0 1rem;
    background-color: ${props => props.theme.colors.common.darkBlue};
    overflow: hidden;
    position: relative;
    z-index: 985;
    transition: background-image 0.5s ease;
    animation: Mount-animation 0.5s ease;

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    & > img {
        position: absolute;
        width: 20%;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    
    @media ${({ theme }) => theme.device.mobile} {
        aspect-ratio: 9 / 16;
        flex-direction: column;
        
        & > img {
            width: 40%;
        }
    }
`

export const TextTitle = styled.span`
    width: 30%;
    font-weight: bolder;
    font-size: 3vmax;
    position: sticky;
    top: 10.5rem;
    z-index: 100;
    margin-top: 1rem;
    transition: color 0.5s ease;
    
    & > div.number {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 2rem;
        
        & > div {
            width: 0.5rem;
            height: 3rem;
            margin-right: 1rem;
            background-color: ${props => props.theme.colors.colorOnSurface};
            border-radius: 1rem;
        }
        
        & > span {
            transition: color 0.5s ease;
        }
    }

    @media ${({ theme }) => theme.device.mobile} {
        width: 100%;
        position: relative;
        font-size: xxx-large;
        top: 0;
    }
`

export const ContentTitle = styled.div`
    margin-top: 2rem;
    font-weight: bolder;
    font-size: xxx-large;
    color: ${props => props.theme.colors.colorOnSurface};
    transition: color 0.5s ease;

    @media ${({ theme }) => theme.device.mobile} {
        font-size: xx-large;
    }
`

export const ContentWrapper = styled.div`
    width: calc(70% - 1rem);
    margin-left: 1rem;

    & > img {
        margin-top: 1rem;
        width: 100%;
        border-radius: 1rem;
    }

    @media ${({ theme }) => theme.device.mobile} {
        width: 100%;
        margin-left: 0;
    }
`
