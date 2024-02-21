import styled from "styled-components";
import {ContentWrapper, ImgIcon, ImgTitleIcon, InnerBoxWrapper, InnerContentWrapper, InnerTitleWrapper, InnerWrapper, TextContentContent, TextContentTitle, TextTitle} from "./CommonComponent/CommonComponent";
import icAndroid from "../../assets/icon/ic_android.svg";
import {Spacer} from "../Component";
import icPlayStore from "../../assets/icon/ic_google_play.svg";
import {useNavigate} from "react-router-dom";
import Ripples from "react-ripples";
import {Icon} from "@mui/material";
import React from "react";
import {appList} from "../../data/CommonData";
import icIosStore from "../../assets/icon/ic_ios_store.svg";
import Item from "./RecentProject/Item";

function RecentProject() {
    return (
        <RecentProjectWrapper>
            <TextTitle>프로젝트</TextTitle>
            <ContentWrapper>
                {appList.map((category) => (
                    <Item category={category} />
                ))}
            </ContentWrapper>
        </RecentProjectWrapper>
    );
}

const RecentProjectWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1rem 2rem 0 2rem;
    animation: Mount-animation 0.5s ease;
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
    animation: Mount-animation 0.5s ease;
    align-items: start;
`

export default RecentProject;
