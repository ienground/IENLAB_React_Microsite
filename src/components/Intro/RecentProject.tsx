import styled from "styled-components";
import {ContentWrapper, ImgIcon, ImgTitleIcon, InnerBoxWrapper, InnerContentWrapper, InnerTitleWrapper, InnerWrapper, TextContentContent, TextContentTitle, TextTitle} from "./CommonComponent/CommonComponent";
import icAndroid from "../../assets/ic_android.svg";
import {Spacer} from "../Component";
import icReact from "../../assets/ic_react.svg";
import icAppCalarm from "../../assets/ic_app_calarm.png";
import {useNavigate} from "react-router-dom";

function RecentProject() {
    let navigate = useNavigate();

    return (
        <RecentProjectWrapper>
            <TextTitle>프로젝트</TextTitle>
            <ContentWrapper>
                <InnerWrapper>
                    <InnerTitleWrapper className={"mobile-horizontal"}>
                        <ImgTitleIcon src={icAndroid} />
                        <Spacer orientation={"vertical"} size={"1rem"} />
                        <TextContentTitle className={"black xxx-large"} fontWeight={"600"}>Android</TextContentTitle>
                    </InnerTitleWrapper>
                    <InnerContentWrapper>
                        <InnerBoxWrapper>
                            <ImgIcon src={icAppCalarm} />
                            <Spacer orientation={"vertical"} size={"1rem"} />
                            <TextContentTitle className={"black background"}>캘람</TextContentTitle><br />
                            <TextContentContent fontWeight={"normal"} className={"black medium"}>내 일정을 아는 똑똑한 알람.</TextContentContent>
                        </InnerBoxWrapper>
                    </InnerContentWrapper>
                </InnerWrapper>
            </ContentWrapper>
        </RecentProjectWrapper>
    );
}

const RecentProjectWrapper = styled.div`
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

const TechStackWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1rem 2rem 0 2rem;
    animation: Mount-animation 0.5s;
    align-items: start;
`

export default RecentProject;
