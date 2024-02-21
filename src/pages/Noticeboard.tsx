import {AppProps} from "../App";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ButtonToTop from "../components/ButtonToTop";
import Sidebar from "../components/Sidebar";
import LastEdit from "../components/LastEdit";
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAppInfo, getNoticeboards, getNoticeItem} from "../utils/FirebaseData";
import styled from "styled-components";
import NoticePost from "../components/Noticeboard/NoticePost";
import {Skeleton, Fade} from "@mui/material";
import NoticePostSkeleton from "../components/Noticeboard/NoticePostSkeleton";

export interface NoticePostProps {
    item: {id: string, title: string, content: string, create_time: Date, edit_time: Date, category: string}
}
function Noticeboard({darkMode, setDarkMode}: AppProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [noticeList, setNoticeList] = useState<{ id: string, title: string, content: string, create_time: Date, edit_time: Date, category: string }[]>();
    const [isPrepared, setIsPrepared] = useState(false);

    const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
    };

    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);

    useEffect(() => {
        const processing = async () => {
            let result = await getNoticeboards(firestore);
            result.sort((a, b) => (a.create_time > b.create_time) ? -1 : (a.create_time === b.create_time) ? 0 : 1);
            setNoticeList(result);
        };
        processing();
    }, []);

    return (
        <>
            <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
            <ContentWrapper>
                <TextTitle>공지사항</TextTitle>
                <div className={"content-wrapper"}>
                    <Fade className={"skeleton"} in={!noticeList} addEndListener={() => { setIsPrepared(true); } }>
                        <InnerContentWrapper>
                            <NoticePostSkeleton />
                            <NoticePostSkeleton />
                            <NoticePostSkeleton />
                        </InnerContentWrapper>
                    </Fade>
                    <Fade className={"data"} in={isPrepared && noticeList?.length !== 0}>
                        <InnerContentWrapper>
                            {noticeList?.map((post) => (
                                <NoticePost item={post} />
                            ))}
                        </InnerContentWrapper>
                    </Fade>
                </div>
            </ContentWrapper>
            <Footer />
            <ButtonToTop />
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} darkMode={darkMode} setDarkMode={setDarkMode}/>
        </>
    );
}

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1rem 1rem 0 2rem;
    animation: Mount-animation 0.5s ease;
    align-items: start;

    & > .content-wrapper {
        width: calc(70% - 1rem);
        margin-left: 1rem;
        margin-top: 1rem;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        
        & > .skeleton {
            z-index: 500;
        }
        
        & > .data {
            z-index: 501;
        }
    }

    @media ${({theme}) => theme.device.mobile} {
        flex-direction: column;
        margin: 1rem 1rem 0 1rem;
        
        & > .content-wrapper {
            width: 100%;
            margin-left: 0;
        }
    }
`

export const InnerContentWrapper = styled.div`
    grid-column: 1;
    grid-row: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media ${({ theme }) => theme.device.mobile} {
        width: 100%;
        margin-left: 0;
    }
`

export const TextTitle = styled.span`
    width: 30%;
    font-weight: bolder;
    font-size: 3vmax;
    position: sticky;
    top: 6.5rem;
    z-index: 100;
    margin-top: 1rem;
    transition: color 0.5s ease;
    
    @media ${({ theme }) => theme.device.mobile} {
        width: 100%;
        position: relative;
        font-size: xxx-large;
        margin-top: 0;
        top: 0;
    }
`

export default Noticeboard;
