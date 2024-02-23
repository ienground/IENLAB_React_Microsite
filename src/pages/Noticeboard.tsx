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
export default function Noticeboard({darkMode, setDarkMode}: AppProps) {
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

    // return (
    //     <>
    //
    //         <ContentWrapper>
    //             <TextTitle>공지사항</TextTitle>
    //             <div className={"content-wrapper"}>
    //                 <Fade className={"skeleton"} in={!noticeList} addEndListener={() => { setIsPrepared(true); } }>
    //                     <InnerContentWrapper>
    //                         <NoticePostSkeleton />
    //                         <NoticePostSkeleton />
    //                         <NoticePostSkeleton />
    //                     </InnerContentWrapper>
    //                 </Fade>
    //                 <Fade className={"data"} in={isPrepared && noticeList?.length !== 0}>
    //                     <InnerContentWrapper>
    //                         {noticeList?.map((post) => (
    //                             <NoticePost item={post} />
    //                         ))}
    //                     </InnerContentWrapper>
    //                 </Fade>
    //             </div>
    //         </ContentWrapper>

    //     </>
    // );

    useEffect(() => {
        console.log("isPrepared:" + (isPrepared ? "true" : "false"));
        console.log("noticeList:" + noticeList);
    }, [isPrepared, noticeList]);

    return (
        <Wrapper>
            <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} darkMode={darkMode} setDarkMode={setDarkMode}/>
            <div id="wrap">
                <div className="content">
                    <div className="title">
                        공지사항
                    </div>
                    <div className="content-wrapper">
                        <Fade className={"skeleton"} in={!noticeList} addEndListener={() => { setIsPrepared(true); } }>
                            <div>
                                <NoticePostSkeleton />
                                <NoticePostSkeleton />
                                <NoticePostSkeleton />
                            </div>
                        </Fade>
                        <Fade className={"data"} in={isPrepared && noticeList?.length !== 0}>
                            <div>
                                {noticeList?.map((post) => (
                                    <NoticePost item={post} />
                                ))}
                            </div>
                        </Fade>
                    </div>
                </div>
            </div>
            <Footer />
            <ButtonToTop />
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    & > #wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        animation: Mount-animation 0.5s ease;
        
        & > .content {
            max-width: 1440px;
            width: 100%;
            height: 20rem;
            display: flex;
            flex-direction: row;
            gap: 1rem;
            
            & > .title {
                width: 20%;
                position: sticky;
                top: 6.5rem;
                z-index: 100;
                font-weight: 800;
                font-size: xxx-large;
                transition: color 0.5s ease;
            }
            
            & > .content-wrapper {
                width: 80%;
                display: grid;
                grid-template-columns: 1fr;
                grid-template-rows: 1fr;
                
                & > div {
                    grid-row: 1;
                    grid-column: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                
                & > .skeleton {
                    z-index: 501;
                }
                
                & > .data {
                    z-index: 500;
                }
            }

            @media ${({ theme }) => theme.device.pc} {
                width: calc(100% - 2rem);
                padding: 0 1rem;
            }

            @media ${({ theme }) => theme.device.tablet} {
                flex-direction: column;
                
                & > .title {
                    width: 100%;
                    position: initial;
                }
                
                & > .content-wrapper {
                    width: 100%;
                }
            }
        }
    }
`
