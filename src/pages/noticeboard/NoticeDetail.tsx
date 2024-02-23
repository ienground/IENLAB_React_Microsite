import {AppProps} from "../../App";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getNoticeboards, getNoticeItem} from "../../utils/FirebaseData";
import Header from "../../components/Header";
import NoticePost from "../../components/Noticeboard/NoticePost";
import LastEdit from "../../components/LastEdit";
import Footer from "../../components/Footer";
import ButtonToTop from "../../components/ButtonToTop";
import Sidebar from "../../components/Sidebar";
import styled, {useTheme} from "styled-components";
import {Fade, Icon, Skeleton} from "@mui/material";
import Ripples from "react-ripples";
import remarkGfm from "remark-gfm";
import Markdown from "../../components/Markdown";
import patternColor from "../../assets/brand/pattern_color.png";
import patternBlack from "../../assets/brand/pattern_black.png";
import LoremIpsum from "react-lorem-ipsum";
import TitleSkeleton from "../../components/Noticeboard/NoticeDetail/TitleSkeleton";
import {TitleBox} from "../../components/Component";

export default function NoticeDetail({darkMode, setDarkMode}: AppProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [noticeItem, setNoticeItem] = useState<{ id: string, title: string, content: string, create_time: Date, edit_time: Date, category: string }>();
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
            if (id !== null) {
                let result = await getNoticeItem(firestore, id);
                setNoticeItem(result);
            }
        };
        processing();
    }, []);

    // return (
    //     <>
    //         <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} darkMode={darkMode} setDarkMode={setDarkMode}/>
    //         <ContentWrapper>
    //             <AreaTitle backgroundImage={darkMode ? patternBlack : patternColor}>
    //                 <div className={"title-wrapper"}>
    //                     <Fade className={"skeleton"} in={!noticeItem} addEndListener={() => { setIsPrepared(true); } }>
    //                         <FadeTitleWrapper>
    //                             <TitleSkeleton />
    //                         </FadeTitleWrapper>
    //                     </Fade>
    //                     <Fade className={"data"} in={(isPrepared && noticeItem !== undefined)}>
    //                         <FadeTitleWrapper>
    //                             <div className={"category"}>{noticeItem?.category}</div>
    //                             <h3 className={"timestamp"}><span>{noticeItem?.create_time?.toLocaleString()}</span></h3>
    //                             <h1 className={"title"}><span>{noticeItem?.title}</span></h1>
    //                         </FadeTitleWrapper>
    //                     </Fade>
    //                 </div>
    //             </AreaTitle>
    //             <InnerContentWrapper>
    //                 <div className="content-wrapper">
    //                     <Fade className={"skeleton"} in={!noticeItem}>
    //                         <div>
    //                             <Skeleton variant={"text"} sx={{fontSize: "x-large"}}/>
    //                             <Skeleton variant={"text"} sx={{fontSize: "x-large"}}/>
    //                             <Skeleton variant={"text"} sx={{fontSize: "x-large"}}/>
    //                             <Skeleton variant={"text"} sx={{fontSize: "x-large"}}/>
    //                             <Skeleton variant={"text"} sx={{fontSize: "x-large"}}/>
    //                         </div>
    //                     </Fade>
    //                     <Fade className={"data"} in={isPrepared && noticeItem !== undefined}>
    //                         <div>
    //                             <Markdown text={noticeItem?.content ? noticeItem.content : ""}/>
    //                         </div>
    //                     </Fade>
    //                 </div>
    //             </InnerContentWrapper>
    //         </ContentWrapper>
    //         <Footer />
    //         <ButtonToTop />
    //         <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
    //     </>
    // );

    return (
        <Wrapper>
            <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} darkMode={darkMode} setDarkMode={setDarkMode}/>
            <div id="wrap">
                <TitleBox className={"title-wrapper"} style={{backgroundImage: `url(${darkMode ? patternBlack : patternBlack})`}}>
                    <div>
                        <Fade className={"skeleton"} in={!noticeItem} addEndListener={() => setIsPrepared(true)}>
                            <div>
                                <TitleSkeleton />
                            </div>
                        </Fade>
                        <Fade className={"data"} in={(isPrepared && noticeItem !== undefined)}>
                            <div>
                                <div className="category">{noticeItem?.category}</div>
                                <h3 className="timestamp"><span>{noticeItem?.create_time?.toLocaleString()}</span></h3>
                                <h1 className="title"><span>{noticeItem?.title}</span></h1>
                            </div>
                        </Fade>
                    </div>
                </TitleBox>
                <div className="content-wrapper">
                    <Fade className={"skeleton"} in={!noticeItem}>
                        <div>
                            <Skeleton variant={"text"} sx={{fontSize: "x-large"}}/>
                            <Skeleton variant={"text"} sx={{fontSize: "x-large"}}/>
                            <Skeleton variant={"text"} sx={{fontSize: "x-large"}}/>
                            <Skeleton variant={"text"} sx={{fontSize: "x-large"}}/>
                            <Skeleton variant={"text"} sx={{fontSize: "x-large"}}/>
                        </div>
                    </Fade>
                    <Fade className={"data"} in={isPrepared && noticeItem !== undefined}>
                        <div>
                            <Markdown text={noticeItem?.content ? noticeItem.content : ""}/>
                        </div>
                    </Fade>
                </div>
            </div>
            <Footer/>
            <ButtonToTop/>
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    & > #wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        & > .title-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            transition: background-image 0.5s ease;
            
            & > div {
                max-width: 1440px;
                width: 100%;
                height: calc(100% - 2rem);
                display: grid;
                grid-template-columns: 1fr;
                grid-template-rows: 1fr;
                padding: 1rem 0;
                
                & > .skeleton {
                    z-index: 501;
                }
                
                & > .data {
                    z-index: 500;
                }
                
                & > div {
                    grid-row: 1;
                    grid-column: 1;
                    display: flex;
                    flex-direction: column;
                    
                    & > :first-child {
                        margin-top: auto;
                    }
                    
                    & > div.category {
                        width: fit-content;
                        padding: 0.5rem 1rem;
                        margin-bottom: 1rem;
                        border-radius: 1rem;
                        background-color: ${props => props.theme.colors.colorSurface}80;
                        color: ${props => props.theme.colors.colorOnSurface};
                        transition: background-color 0.5s ease, color 0.5s ease;
                    }
                    
                    & > h1.title {
                        margin-bottom: -0.5rem;
                        font-weight: 800;
                        font-size: xxx-large;
                        word-break: break-all;
                        color: ${props => props.theme.colors.colorSurface};
                        transition: color 0.5s ease;
                        
                        & > span {
                            padding: 0.5rem;
                            box-decoration-break: clone;
                            -webkit-box-decoration-break: clone;
                            line-height: 2;
                            background-color: ${props => props.theme.colors.colorOnSurface};
                            
                            transition: background-color 0.5s ease;
                        }

                        @media ${({ theme }) => theme.device.tablet} {
                            font-size: xx-large;
                        }
                    }
                    
                    & > h3.timestamp {
                        font-weight: 500;
                        font-size: medium;
                        word-break: break-all;
                        color: ${props => props.theme.colors.colorSurface};
                        transition: color 0.5s ease;

                        & > span {
                            padding: 0.5rem;
                            box-decoration-break: clone;
                            -webkit-box-decoration-break: clone;
                            line-height: 2;
                            background-color: ${props => props.theme.colors.colorOnSurface};
                        }
                    }
                }

                @media ${({ theme }) => theme.device.pc} {
                    width: calc(100% - 2rem);
                    padding: 1rem;
                }
            }
        }
        
        & > .content-wrapper {
            max-width: 1440px;
            width: 100%;
            display: grid;
            grid-template-rows: 1fr;
            grid-template-columns: 1fr;
            margin-top: 1rem;
            
            & > .skeleton {
                z-index: 501;
            }
            
            & > .data {
                z-index: 500;
            }
            
            & > div {
                grid-row: 1;
                grid-column: 1;
            }

            @media ${({ theme }) => theme.device.pc} {
                width: calc(100% - 2rem);
                padding: 0 1rem;
            }
        }
    }
`
