import styled from "styled-components";

export const ImgTitle = styled.div`
    display: flex;
    width: calc(100% - 2rem);
    aspect-ratio: 21 / 9;
    align-items: center;
    justify-content: space-between;
    border-radius: 1rem;
    margin: 0 1rem;
    background-image: url("${props => props.style?.backgroundImage}");
    overflow: hidden;
    position: relative;
    z-index: 985;
    transition: background-image 0.5s ease;
    animation: Mount-animation 0.5s;

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: ${props => props.style?.backgroundImage};

    @media ${({ theme }) => theme.device.mobile} {
        aspect-ratio: 9 / 16;
        flex-direction: column;
    }
`

export const ImgTitleSectionLeft = styled.div`
    display: flex;
    flex-direction: column;
    margin: 4rem;

    @media ${({ theme }) => theme.device.tablet} {
        margin: 2rem;
    }

    @media ${({ theme }) => theme.device.mobile} {
        margin: 4rem 2rem 2rem 2rem;
    }
`

export const ImgTitleText = styled.div`
    font-weight: 900;
    font-size: 4vmax;
    display: flex;
    flex-direction: row;
`

export const ImgTitleContent = styled.span`
    margin-top: 1rem;
    font-size: 1.5vmax;
`

export const ImgTitleVersionText = styled.span`
    align-self: center;
    height: fit-content;
    padding: 0.5rem;
    margin-left: 1rem;
    border: 1px ${props => props.theme.colors.colorOnSurface} solid;
    border-radius: 0.5rem;
    font-size: large;
    font-weight: 600;
`

export const ImgTitleDownloadButton = styled.a`
    width: 20vmax;
    position: absolute;
    bottom: calc(4rem - 20vmax / 646 * 40);
    margin-left: calc(4rem - 20vmax / 646 * 41);

    @media ${({ theme }) => theme.device.tablet} {
        width: 15vmax;
        bottom: calc(2rem - 15vmax / 646 * 40);
        margin-left: calc(2rem - 15vmax / 646 * 41);
    }

    @media ${({ theme }) => theme.device.mobile} {
        position: relative;
        margin-left: 0;
        bottom: auto;
    }
`

export const PreviewPhoneWrapper = styled.div`
    height: 100%;
    top: 4rem;
    background-color: ${props => props.theme.colors.colorSurface};
    box-shadow: 0 0 40px -1rem black;
    border-radius: 3vmax;
    aspect-ratio: 1 / 2;
    overflow: hidden;
    position: relative;
    transition: background-color 0.5s ease;
    
    &.title {
        right: 4rem;
    }
    
    & > div {
        width: 88%;
        aspect-ratio: 6 / 13;
        left: 6%;
        top: 2.5%;
        position: absolute;

        border-radius: 2vmax;
        align-items: center;
        justify-content: center;
        background-size: cover;
    }

    .react-slideshow-container {
        border-radius: 2vmax;
        overflow: hidden;
    }

    .each-slide-effect > div {
        display: flex;
        align-items: center;
        justify-content: center;
        background-size: cover;
        aspect-ratio: 6 / 13;
    }

    @media ${({ theme }) => theme.device.mobile} {
        width: 60%;
        height: auto;
        border-radius: 5vmin;
        top: 2rem;
        
        &.title {
            right: auto;
            border-radius: 4vmin;
        }
        
        & > div {
            border-radius: 2.5vmin;
        }

        .react-slideshow-container {
           border-radius: 2vmin; 
        }
    }
`

export const GooglePlayDownload = (packageName: string) => {
    return (
        <ImgTitleDownloadButton href={'https://play.google.com/store/apps/details?id=' + packageName + '&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'}>
            <img style={{width: "100%"}} alt='Get it on Google Play'
                 src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/>
        </ImgTitleDownloadButton>)
}

export const ContentWrapper = styled.div`
    width: 100%;
    aspect-ratio: 21 / 9;
    display: flex;
    flex-direction: row;
    justify-content: center;
    overflow: hidden;
    animation: Mount-animation 0.5s;
    
    &:nth-child(4) {
        margin-top: 1rem;
    }
    
    &:nth-child(2n + 1) {
        background-color: ${props => props.theme.colors.colorSurfaceVariant};
        transition: background-color 0.5s ease;
    }

    @media ${({ theme }) => theme.device.mobile} {
        aspect-ratio: 9 / 16;
    }
`

export const SafeArea = styled.div`
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    
    &.reverse {
        flex-direction: row-reverse;
    }

    @media ${({ theme }) => theme.device.tablet} {
        width: 80%;
    }

    @media ${({ theme }) => theme.device.mobile} {
        width: calc(100% - 2rem);
        margin: 0 2rem;
        flex-direction: column-reverse;
        
        &.reverse {
            flex-direction: column-reverse;
        }
    }
`

export const ContentScreenshot = styled.div`
    width: calc(65% - 4rem);
    display: flex;
    position: relative;
    flex-direction: row;
    
    & > div {
        position: absolute;
    }
    
    & > :nth-child(2) {
        right: 0;
    }

    &.reverse {
        flex-direction: row-reverse;
        
        & > :nth-child(2) {
            left: 0;
        }
    }

    @media ${({ theme }) => theme.device.tablet} {
        width: calc(55% - 4rem);
    }

    @media ${({ theme }) => theme.device.mobile} {
        width: 100%;
        height: inherit;
        flex-direction: row;
        
        &.reverse {
            flex-direction: row;
            & > :nth-child(2) {
                left: auto;
            }
        }
    }
`

export const ContentSpan = styled.div<{titleColor: string}>`
    width: 35%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    word-break: keep-all;
    
    & > span {
        transition: color 0.5s ease;
    }
    
    & > span.category {
        color: ${props => props.titleColor};
        font-weight: 700;
        font-size: large;
    }
    
    & > span.title {
        margin-top: 1rem;
        color: ${props => props.theme.colors.colorOnSurface};
        font-weight: 600;
        font-size: xxx-large;
    }
    
    & > span.content {
        margin-top: 1rem;
        color: ${props => props.theme.colors.colorOnSurfaceVariant};
        font-weight: 400;
    }

    @media ${({ theme }) => theme.device.tablet} {
        & > span.category {
            font-size: medium;
        }
        
        & > span.title {
            font-size: xx-large;
        }
        
        & > span.content {
            font-size: small;
        }
    }

    @media ${({ theme }) => theme.device.mobile} {
        width: 100%;
        margin: 2rem 0;
        
        & > span {
            text-align: center;
        }
        
        & > span.title {
            font-size: xx-large;
        }
    }
`

export const ContentTitle = styled.span`
    font-weight: bolder;
    font-size: 3vmax;

    @media ${({ theme }) => theme.device.mobile} {
        width: 100%;
        position: relative;
        font-size: xxx-large;
        //top: 0;
    }
`

export const ContentContent = styled.span`
    font-weight: bold;
    font-size: 2vmax;
    margin-top: 2rem;
`
