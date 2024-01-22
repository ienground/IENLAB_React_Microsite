import styled from "styled-components";
import imgLogoTypo from "../assets/img_logo_typo.png";
import imgLogoFull from "../assets/img_logo_full.png";
import icTistory from "../assets/ic_tistory.svg";
import imgPattern from "../assets/pattern.png";
import {Icon} from "@mui/material";

function Footer() {
    return (
        <FooterWrapper>
            <AuthorInfoWrapper>
                <Image src={imgLogoFull}/>
                <Text>Copyright (c) 2024 ienlab. 모든 권리 보유.</Text>
            </AuthorInfoWrapper>
            <TistoryInfoWrapper>
                <Icon baseClassName={"material-icons-round"} fontSize={"small"} style={ { color: "red", marginRight: "0.5rem", fontSize: 16 } } >favorite</Icon>
                <Image src={icTistory}/>
            </TistoryInfoWrapper>
        </FooterWrapper>
    );
}

const FooterWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: ${props => props.theme.backgroundGray};
    height: 4rem;
    border-radius: 1rem;
    margin: 1rem 2rem 2rem 2rem;
    padding: 1rem;
`

const Text = styled.div`
    margin-left: 1rem;
`

const AuthorInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const TistoryInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Image = styled.img`
    height: 2rem;
`

export default Footer;
