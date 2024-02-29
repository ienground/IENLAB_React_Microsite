import {AppProps} from "../App";
import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ButtonToTop from "../components/ButtonToTop";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import patternColor from "../assets/brand/pattern_color.png";
import patternBlack from "../assets/brand/pattern_black.png";
import icGoogle from "../assets/icon/ic_google.svg";
import {TitleBox} from "../components/Component";
import {LastEditData} from "../data/LastEditData";
import {initializeApp} from "firebase/app";
import {getFirestore, collection, doc, DocumentData, Firestore, getDoc, getDocs, updateDoc, Timestamp} from "firebase/firestore";
import {getAuth, signInWithPopup, GoogleAuthProvider, setPersistence, browserSessionPersistence} from "firebase/auth";
import {addNoticeItem, deleteNoticeItem, getNoticeboards, getNoticeItem, updateNoticeItem} from "../utils/FirebaseData";
import {Fade, Icon, TextField} from "@mui/material";
import NoticePostSkeleton from "../components/Noticeboard/NoticePostSkeleton";
import * as NoticePostWrapper from "../components/Noticeboard/NoticePost";
import {NoticePostProps} from "./Noticeboard";
import {useNavigate} from "react-router-dom";
import Markdown from "../components/Markdown";

export default function Management({darkMode, setDarkMode}: AppProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [noticeList, setNoticeList] = useState<{ id: string, title: string, content: string, create_time: Date, edit_time: Date, category: string }[]>();
    const [isPrepared, setIsPrepared] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const [contentId, setContentId] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");

    const date = new Date();
    const data = LastEditData.get("/version");

    if (data !== undefined) {
        date.setFullYear(data[0], data[1] - 1, data[2]);
        date.setHours(data[3], data[4], 0);
    }

    window.document.title = `관리 | 아이엔랩 ienlab`;

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
    const auth = getAuth(app);

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((data) => {
                let login = window.document.getElementById("login");
                if (login !== null) {
                    login.innerText = "Google 계정에서 로그아웃";
                    setIsLogin(true);
                    processing();
                }
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const processing = async () => {
        let result = await getNoticeboards(firestore);
        result.sort((a, b) => (a.create_time > b.create_time) ? -1 : (a.create_time === b.create_time) ? 0 : 1);
        setNoticeList(result);
    };

    const saveData = async() => {
        if (contentId === "-") {
            addNoticeItem(firestore, title, content, category)
                .then(() => {
                    let saveMessage = window.document.getElementById("save_message");
                    if (saveMessage !== null) {
                        // @ts-ignore
                        saveMessage.innerText = "저장되었습니다.";
                        saveMessage?.classList.add("visible");
                        setTimeout(() => {
                            saveMessage?.classList.remove("visible");
                        }, 3000);
                    }
                })
                .catch((err) => {

                })
                .finally(() => {
                    processing();
                });
        } else if (contentId !== "") {
            updateNoticeItem(firestore, contentId, title, content, category)
                .then(() => {
                    let saveMessage = window.document.getElementById("save_message");
                    if (saveMessage !== null) {
                        // @ts-ignore
                        saveMessage.innerText = "저장되었습니다.";
                        saveMessage?.classList.add("visible");
                        setTimeout(() => {
                            saveMessage?.classList.remove("visible");
                        }, 3000);
                    }
                })
                .catch((err) => {

                })
                .finally(() => {
                    processing();
                });
        }
    };

    const deleteData = async() => {
        deleteNoticeItem(firestore, contentId)
            .then(() => {
                let saveMessage = window.document.getElementById("save_message");
                if (saveMessage !== null) {
                    // @ts-ignore
                    saveMessage.innerText = "삭제되었습니다.";
                    saveMessage?.classList.add("visible");
                    setTimeout(() => {
                        saveMessage?.classList.remove("visible");
                    }, 3000);
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                processing();
                setContentId("");
            });
    };

    useEffect(() => {
        const getContent = async() => {
            if (contentId !== "" && contentId !== "-") {
                await getNoticeItem(firestore, contentId)
                    .then((result) => {
                        setTitle(result.title);
                        setContent(result.content);
                        setCategory(result.category);
                    })
            } else if (contentId === "-") {
                setTitle("");
                setContent("");
                setCategory("");
            }
        };
        getContent();
    }, [contentId]);

    return (
        <Wrapper>
            <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} darkMode={darkMode} setDarkMode={setDarkMode}/>
            <div id="wrap">
                <TitleBox className={"title-wrapper"} style={{backgroundImage: `url(${darkMode ? patternBlack : patternColor})`}}>
                    <div>
                        <div className={"button"}>
                            <button onClick={loginWithGoogle}>
                                <img src={icGoogle}/>
                                <div id={"login"}>Google 계정으로 로그인</div>
                            </button>
                        </div>
                        <div className={"title"}>
                            <h3 className="timestamp"><span>{process.env.REACT_APP_VERSION} / {date.toLocaleString()}</span></h3>
                            <h1 className="title"><span>웹사이트 관리</span></h1>
                        </div>
                    </div>
                </TitleBox>
                <div className="content-wrapper top">
                    <div className={"buttons"}>
                        <Fade className={"add"} in={isLogin && (contentId === "")}>
                            <div>
                                <button onClick={() => { setContentId("-") }}>
                                    <Icon baseClassName={"material-icons-round"}>add</Icon>
                                </button>
                            </div>
                        </Fade>
                        <Fade className={"back"} in={contentId !== ""}>
                            <div>
                                <button onClick={() => { setContentId("") }}>
                                    <Icon baseClassName={"material-icons-round"}>arrow_back</Icon>
                                </button>
                                <button onClick={deleteData}>
                                    <Icon baseClassName={"material-icons-round"}>delete</Icon>
                                </button>
                            </div>
                        </Fade>
                    </div>
                    <div className={"content"}>
                        <Fade in={contentId === ""}>
                            <div className="list">
                                <Fade className={"skeleton"} in={isLogin && !noticeList} addEndListener={() => {
                                    setIsPrepared(true);
                                }}>
                                    <div>
                                        <NoticePostSkeleton/>
                                        <NoticePostSkeleton/>
                                        <NoticePostSkeleton/>
                                    </div>
                                </Fade>
                                <Fade className={"data"} in={isPrepared && noticeList?.length !== 0}>
                                    <div>
                                        {noticeList?.map((post) => (
                                            <NoticePost item={post} setContentId={setContentId}/>
                                        ))}
                                    </div>
                                </Fade>
                            </div>
                        </Fade>
                        <Fade in={contentId !== ""}>
                            <div className="editor">
                                <div className={"title"}>
                                    <TextField className="text-area" label={"카테고리"} variant={"filled"} fullWidth={true} type={"message"} name={"category"} minRows={1} multiline={true} id={"textfield-category"} value={category} onChange={(e) => {
                                        setCategory(e.target.value);
                                    }}/>
                                    <TextField className="text-area" label={"제목"} variant={"filled"} fullWidth={true} type={"message"} name={"title"} minRows={1} multiline={true} id={"textfield-title"} value={title} onChange={(e) => {
                                        setTitle(e.target.value);
                                    }}/>
                                </div>
                                <div className={"content"}>
                                    <TextField className="text-area" label={"내용"} variant={"filled"} type={"message"} name={"message"} minRows={10} multiline={true} id={"textfield-message"} value={content} onChange={(e) => {
                                        setContent(e.target.value);
                                    }}/>
                                    <Markdown text={content}/>
                                </div>
                                <div className={"save"}>
                                    <div id={"save_message"}>저장되었습니다.</div>
                                    <button onClick={saveData}>
                                        <Icon baseClassName={"material-icons-round"}>save</Icon>
                                        <div>저장</div>
                                    </button>
                                </div>
                            </div>
                        </Fade>
                    </div>
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
        animation: Mount-animation 0.5s ease;

        & > .title-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-color: ${props => props.theme.colors.common.darkBlue};
            z-index: 985;
            transition: background-color 0.5s ease;

            & > div {
                max-width: 1440px;
                width: 100%;
                height: 100%;
                display: grid;
                grid-template-rows: 1fr 1fr;
                padding: 1rem 0;

                & > div.button {
                    & > button {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        gap: 1rem;
                        padding: 1rem;
                        border-radius: 1rem;
                        background-color: ${props => props.theme.colors.colorSurfaceVariant};
                        transition: background-color 0.5s ease;
                        
                        & > div {
                            color: ${props => props.theme.colors.colorOnSurface};
                            transition: color 0.5s ease;
                        }
                    }
                }
                
                & > div.title {
                    display: flex;
                    flex-direction: column;
                    
                    & > h1.title {
                        margin-bottom: -0.5rem;
                        font-weight: 800;
                        font-size: xxx-large;
                        word-break: keep-all;
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
                        margin-top: auto;
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
                            transition: background-color 0.5s ease;
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
            display: flex;
            flex-direction: row;
            gap: 1rem;
            margin-top: 1rem;
            
            &.top {
                margin-top: 2rem;
            }
            
            & > .buttons {
                width: 20%;
                display: grid;
                grid-template-rows: 1fr;
                grid-template-columns: 1fr;
                
                & > div {
                    grid-row: 1;
                    grid-column: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;

                    & > button {
                        width: 4rem;
                        aspect-ratio: 1;
                        border-radius: 1rem;
                        background-color: ${props => props.theme.colors.colorSurfaceVariant};
                        transition: background-color 0.5s ease;

                        & > span {
                            transition: color 0.5s ease;
                        }
                    }
                }
            }
            
            & > .content {
                width: 80%;
                display: grid;
                grid-template-columns: 1fr;
                grid-template-rows: 1fr;
                
                & > .list {
                    grid-row: 1;
                    grid-column: 1;
                    width: 100%;
                    display: grid;
                    grid-template-columns: 1fr;
                    grid-template-rows: 1fr;

                    & > div {
                        grid-row: 1;
                        grid-column: 1;
                        height: fit-content;
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        grid-auto-rows: 1fr;
                        column-gap: 1rem;
                        row-gap: 1rem;

                        @media ${({ theme }) => theme.device.tablet} {
                            grid-template-columns: 1fr;
                            grid-auto-rows: initial;
                        }
                    }

                    & > .skeleton {
                        z-index: 501;
                    }

                    & > .data {
                        z-index: 500;
                    }
                }
                
                & > .editor {
                    grid-row: 1;
                    grid-column: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    
                    & > .title {
                        display: flex;
                        flex-direction: column;
                        gap: 1rem;
                    }
                    
                    & > .content {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        column-gap: 1rem;
                    }
                    
                    & > .save {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        margin-top: 1rem;
                        
                        & > div {
                            visibility: hidden;
                            opacity: 0;
                            transition: visibility 0.5s ease, opacity 0.5s ease;
                            
                            &.visible {
                                visibility: visible;
                                opacity: 1;
                            }
                        }
                        
                        & > button {
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            gap: 1rem;
                            background-color: transparent;
                        }
                    }
                }
            }
            
            @media ${({ theme }) => theme.device.pc} {
                width: calc(100% - 2rem);
                padding: 0 1rem;
            }
        }
        
    }
`

interface EditProps {
    setContentId: React.Dispatch<React.SetStateAction<string>>
}

function NoticePost({item, setContentId}: NoticePostProps & EditProps) {
    const navigate = useNavigate();

    return (
        <NoticePostWrapper.Wrapper onClick={() => { setContentId(item.id) }}>
            <div className={"category"}>{item.category}</div>
            <div className={"title"}>{item.title}</div>
            <div className={"create_time"}>{item.create_time.toLocaleString()}</div>
        </NoticePostWrapper.Wrapper>
    );
}
