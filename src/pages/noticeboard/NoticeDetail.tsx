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

function NoticeDetail({darkMode, setDarkMode}: AppProps) {
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

    return (
        <>
            <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
            <ContentWrapper>
                <AreaTitle backgroundImage={darkMode ? patternBlack : patternColor}>
                    <div className={"title-wrapper"}>
                        <Fade className={"skeleton"} in={!noticeItem} addEndListener={() => { setIsPrepared(true); } }>
                            <FadeTitleWrapper>
                                <TitleSkeleton />
                            </FadeTitleWrapper>
                        </Fade>
                        <Fade className={"data"} in={(isPrepared && noticeItem !== undefined)}>
                            <FadeTitleWrapper>
                                <div className={"category"}>{noticeItem?.category}</div>
                                <h3 className={"timestamp"}><span>{noticeItem?.create_time?.toLocaleString()}</span></h3>
                                <h1 className={"title"}><span>{noticeItem?.title}</span></h1>
                            </FadeTitleWrapper>
                        </Fade>
                    </div>
                </AreaTitle>
                <InnerContentWrapper>
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
                </InnerContentWrapper>
            </ContentWrapper>
            <Footer />
            <ButtonToTop />
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} darkMode={darkMode} setDarkMode={setDarkMode}/>
        </>
    );
}

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 1rem 0 1rem;
    animation: Mount-animation 0.5s ease;
    align-items: start;

    @media ${({theme}) => theme.device.mobile} {
        flex-direction: column;
        margin: 1rem 1rem 0 1rem;
    }
`

const AreaTitle = styled.div<{backgroundImage: string}>`
    width: calc(100% - 2rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    aspect-ratio: 32 / 9;
    border-radius: 1rem;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${props => props.backgroundImage});
    transition: background-image 0.5s ease;

    & > .title-wrapper {
        margin-top: auto;
        display: grid;
        width: 60%;
        grid-template-rows: 1fr;
        grid-template-columns: 1fr;

        & > .skeleton {
            z-index: 500;
        }

        & > .data {
            z-index: 501;
        }

        @media ${({theme}) => theme.device.mobile} {
            width: 100%;
        }
    }
`

const FadeTitleWrapper = styled.div`
    grid-row: 1;
    grid-column: 1;
    margin-bottom: -0.5rem;
    
    & > div.category {
        width: fit-content;
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        background-color: ${props => props.theme.colors.colorSurface}80;
        color: ${props => props.theme.colors.colorOnSurface};
        transition: background-color 0.5s ease, color 0.5s ease;
    }

    & > h1.title {
        width: 100%;
        font-weight: bolder;
        font-size: 3vmax;
        word-break: break-all;
        transition: color 0.5s ease;

        span {
            background-color: ${props => props.theme.colors.colorOnSurface};
            color: ${props => props.theme.colors.colorSurface};
            padding: 0.5rem;
            box-decoration-break: clone;
            -webkit-box-decoration-break: clone;
            line-height: 2;
            transition: background-color 0.5s ease, color 0.5s ease;
        }

        @media ${({theme}) => theme.device.mobile} {
            font-size: x-large;
            
            span {
                padding: 0.25rem;
            }
        }
    }

    & > h3.timestamp {
        width: 100%;
        margin-top: 1rem;

        span {
            background-color: ${props => props.theme.colors.colorOnSurface};
            color: ${props => props.theme.colors.colorSurface};
            padding: 0.5rem;
            box-decoration-break: clone;
            -webkit-box-decoration-break: clone;
            line-height: 2;
            transition: background-color 0.5s ease, color 0.5s ease;
        }

        @media ${({theme}) => theme.device.mobile} {
            font-size: small;
            
            span {
                padding: 0.25rem;
            }
        }
    }
`

const ButtonBack = () => {
    const navigate = useNavigate();
    return (
        <Ripples placeholder={""}><button onClick={() => { navigate(-1); }}>
            <Icon baseClassName={"material-icons-round"}>arrow_back</Icon>
        </button></Ripples>
    );
}

const InnerContentWrapper = styled.div`
    width: calc(100% - 2rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    transition: background-color 0.5s ease;

    & > div {
        width: 100%;
    }
    
    & > .content-wrapper {
        width: 60%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        
        & > div {
            grid-row: 1;
            grid-column: 1;
        }

        & > .skeleton {
            z-index: 500;
        }

        & > .data {
            z-index: 501;
        }
    }

    @media ${({ theme }) => theme.device.mobile} {
        width: 100%;
        margin-left: 0;
        padding: 1rem 0 0 0;

        & > .content-wrapper {
            width: 100%;
        }
    }
`

export default NoticeDetail;
