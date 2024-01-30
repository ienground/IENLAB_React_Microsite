import styled from "styled-components";
import {ContentWrapper, InnerContentWrapper, InnerTitleWrapper, InnerWrapper, TextTitle} from "./CommonComponent/CommonComponent";

function Contact() {
    return (
        <ContactWrapper>
            <TextTitle>연락처</TextTitle>
            <ContentWrapper>
                <InnerWrapper>
                    <InnerTitleWrapper>
                        Inner
                    </InnerTitleWrapper>
                    <InnerContentWrapper>
                        Content
                    </InnerContentWrapper>
                </InnerWrapper>
            </ContentWrapper>
        </ContactWrapper>
    );
}

const ContactWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1rem 2rem 0 2rem;
    animation: Mount-animation 0.5s;
    align-items: start;

    @media ${({ theme }) => theme.device.mobile} {
        flex-direction: column;
        margin: 1rem 1rem 0 1rem;
    }
`

export default Contact;
