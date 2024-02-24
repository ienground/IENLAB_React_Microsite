import {AppProps} from "../App";
import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import RecentProject from "../components/Intro/RecentProject";
import AboutMe from "../components/Intro/AboutMe";
import TechStack from "../components/Intro/TechStack";
import Contact from "../components/Intro/Contact";
import {Spacer, TitleBox} from "../components/Component";
import ButtonToTop from "../components/ButtonToTop";
import LastEdit from "../components/LastEdit";
import {useLocation, useNavigate} from "react-router-dom";
import imgProfile from "../assets/image/img_ienground_profile.jpg";
import LoremIpsum from "react-lorem-ipsum";
import patternColor from "../assets/brand/pattern_color.png";
import patternBlack from "../assets/brand/pattern_black.png";
import icAndroid from "../assets/icon/ic_android.svg";
import icKotlin from "../assets/icon/ic_kotlin.svg";
import icFirebase from "../assets/icon/ic_firebase.svg";
import icGoogleCloud from "../assets/icon/ic_google_cloud.svg";
import icWeb from "../assets/icon/ic_web.png";
import icReact from "../assets/icon/ic_react.svg";
import icHtml from "../assets/icon/ic_html.svg";
import icHtmlDark from "../assets/icon/ic_html_dark.svg";
import icCss from "../assets/icon/ic_css.svg";
import icCssDark from "../assets/icon/ic_css_dark.svg";
import icTypescript from "../assets/icon/ic_typescript.svg";
import icCall from "../assets/icon/ic_call.svg";
import icMail from "../assets/icon/ic_mail.svg";
import icGitHub from "../assets/icon/ic_github.svg";
import icGitHubDark from "../assets/icon/ic_github_dark.svg";
import icBehance from "../assets/icon/ic_behance.svg";
import icTistory from "../assets/icon/ic_tistory_orange.svg";
import icInstagram from "../assets/icon/ic_instagram.svg";
import icFacebook from "../assets/icon/ic_facebook.svg";
import {ImgIcon} from "../components/Intro/CommonComponent/CommonComponent";
import icPhotoshop from "../assets/icon/ic_photoshop.svg";
import icIllustrator from "../assets/icon/ic_illustrator.svg";
import icFigma from "../assets/icon/ic_figma.svg";
import icSogang from "../assets/icon/ic_sogang_univ.svg";
import {appList} from "../data/CommonData";
import {Icon, TextField} from "@mui/material";
import Ripples from "react-ripples";
import emailjs from "@emailjs/browser";
import icPlayStore from "../assets/icon/ic_google_play.svg";
import icIosStore from "../assets/icon/ic_ios_store.svg";

export default function Intro({darkMode, setDarkMode}: AppProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const form = useRef(null);
    const [errorName, setErrorName] = useState(false);
    const [name, setName] = useState("");
    const [errorEmail, setErrorEmail] = useState(false);
    const [email, setEmail] = useState("");
    const [errorTitle, setErrorTitle] = useState(false);
    const [title, setTitle] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [sendError, setSendError] = useState(false);

    const techStackList = [
        {
            icon: icAndroid,
            title: "Android",
            content: [
                {
                    icons: [icKotlin],
                    title: "Kotlin",
                    content: "코틀린 설명"
                },
                {
                    icons: [icFirebase],
                    title: "Firebase",
                    content: "파베 설명"
                },
                {
                    icons: [icGoogleCloud],
                    title: "Google Cloud",
                    content: "구글 클라우드 설명"
                },
            ]
        },
        {
            icon: icWeb,
            title: "Web",
            content: [
                {
                    icons: [icReact],
                    title: "React",
                    content: "React 설명"
                },
                {
                    icons: [darkMode ? icHtmlDark : icHtml, darkMode ? icCssDark : icCss],
                    title: "HTML·CSS",
                    content: "HTML 설명"
                },
                {
                    icons: [icTypescript],
                    title: "Typescript",
                    content: "Typescript 설명"
                },
            ]
        },
    ];

    const contactList = [
        { icon: icCall, title: "전화", content: "010-4815-7296", link: "tel:01048157296" },
        { icon: icMail, title: "메일", content: "my@ien.zone", link: "mailto:my@ien.zone"},
        { icon: darkMode ? icGitHubDark : icGitHub, title: "GitHub", content: "github.com/ienground", link: "https://github.com/ienground" },
        { icon: icBehance, title: "Behance", content: "behance.net/ericanorhee", link: "https://behance.net/ericanorhee" },
        { icon: icTistory, title: "티스토리", content: "blog.ien.zone", link: "https://blog.ien.zone" },
        { icon: icInstagram, title: "Instagram", content: "@ienlab", link: "https://www.instagram.com/ienlab" },
        { icon: icFacebook, title: "Facebook", content: "@ienlab", link: "https://fb.com/ienlab" },
    ];

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();

        if (name !== "" && email !== "" && title !== "" && message !== "") {
            let emailTextStatus = document.getElementById("email-text-status");

            // @ts-ignore
            emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, form.current, process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
                .then((result) => {
                    setName("");
                    setEmail("");
                    setTitle("");
                    setMessage("");
                }, (error) => {
                    setSendError(true);
                })
                .finally(() => {
                    emailTextStatus?.classList.add("visible");
                    setTimeout(() => {
                        emailTextStatus?.classList.remove("visible");
                    }, 3000);
                });
        } else {
            setErrorName(name === "");
            setErrorEmail(email === "");
            setErrorTitle(title === "");
            setErrorMessage(message === "");
        }
    };

    return (
        <Wrapper>
            <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} darkMode={darkMode} setDarkMode={setDarkMode}/>
            <div id="wrap">
                <TitleBox className={"title-wrapper" + (darkMode ? " dark" : "")}>
                    <div>
                        <img src={imgProfile}/>
                        <div>
                            <h1>안녕하세요👋<br /><span>아이엔 IENGROUND</span> 입니다.</h1>
                            <span><span className={"bold black"}>저</span>와 <span className={"bold black"}>다른 사람</span>이 <span className={"bold black"}>필요한 것</span>에 관심을 가지고 <span className={"red underline bold"}>만드는 것</span>을 좋아합니다. <span className={"red underline bold"}>간단한 것</span>이 최고라는 마음 아래, 생활 속 불편함을 해결하기 위한 다양한 시도를 하고 있습니다.</span>
                            <div className={"bio"}>
                                <div>이현우</div>
                                <a href={"tel:010-4815-7296"}>010-4815-7296</a>
                                <a href={"mailto:my@ien.zone"}>my@ien.zone</a>
                            </div>
                            <div className={"skill"}>
                                <div>
                                    <div>
                                        <img src={icAndroid}/>
                                    </div>
                                    <span className="title">Android 개발</span>
                                    <span className="description">2017년부터</span>
                                </div>
                                <div>
                                    <div>
                                        <img src={icPhotoshop}/>
                                        <img src={icIllustrator}/>
                                        <img src={icFigma}/>
                                    </div>
                                    <span className="title">그래픽, UI·UX 디자인</span>
                                    <span className="description">2016년부터</span>
                                </div>
                                <div>
                                    <div>
                                        <img src={icSogang}/>
                                    </div>
                                    <span className="title">서강대학교 <span className={"small"}>아트&테크놀로지학과</span></span>
                                    <span className="description">2020학년도 입학 / 컴퓨터공학과 복수전공</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </TitleBox>
                <div className="content-wrapper">
                    <div className="title">기술 스택</div>
                    <div className="content">
                        {techStackList.map((category) => (
                            <div className={"sub-wrapper"}>
                                <div className="title">
                                    <img src={category.icon}/>
                                    <div>{category.title}</div>
                                </div>
                                <div className="content">
                                    {category.content.map((content) => (
                                        <div>
                                            <div className="icons">
                                                {content.icons.map((icon) => (
                                                    <img src={icon}/>
                                                ))}
                                            </div>
                                            <div className={"info"}>
                                                <div className="title">{content.title}</div>
                                                <div className="content">{content.content}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="content-wrapper">
                    <div className="title">프로젝트</div>
                    <div className="content">
                        {appList.map((category) => (
                            <div className={"sub-wrapper"}>
                                <div className="title">
                                    <img src={category.icon} />
                                    <div>{category.title}</div>
                                </div>
                                <div className="content no-grid">
                                    {category.content.map((app) => (
                                        app.showIntro ? <div className={"app-page"} onClick={() => navigate(app.page)}>
                                            <img src={app.background} />
                                            <div>
                                                <div className={"info"}>
                                                    <img src={app.icon} />
                                                    <div className="title">{app.title}</div>
                                                    <div className="content">{app.content}</div>
                                                </div>
                                                <div className={"buttons"}>
                                                    <Ripples placeholder={"web"}><button onClick={() => navigate("/calarm")}><Icon baseClassName={"material-icons-round"}>language</Icon></button></Ripples>
                                                    {app.aosLink !== "" ? <Ripples placeholder={"store"}><button onClick={() => window.location.href=`https://play.google.com/store/apps/details?id=${app.aosLink}`} style={{backgroundImage: `url(${icPlayStore})`}} /></Ripples> : <></>}
                                                    {app.iosLink !== "" ? <Ripples placeholder={"store"}><button onClick={() => window.location.href=`https://apps.apple.com/kr/app/${app.iosLink}`} style={{backgroundImage: `url(${icIosStore})`}} /></Ripples> : <></>}
                                                </div>
                                            </div>
                                        </div> : <></>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="content-wrapper">
                    <div className="title">연락처</div>
                    <div className="content">
                        <div className="sub-wrapper">
                            <div className="title">
                                <img src={icCall} />
                                <div>연락처</div>
                            </div>
                            <div className="content">
                                {contactList.map((contact) => (
                                    <div onClick={() => { window.location.href = contact.link; }}>
                                        <img src={contact.icon} />
                                        <div className={"info"}>
                                            <div className="title">{contact.title}</div>
                                            <div className="content">{contact.content}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="sub-wrapper">
                            <div className="title">
                                <img src={icMail} />
                                <div>메일 보내기</div>
                            </div>
                            <div className="content no-grid">
                                <EmailJsForm ref={form} onSubmit={sendEmail}>
                                    <TextField label={"이름"} variant={"filled"} type={"text"} error={errorName} name={"user_name"} id={"textfield-user-name"} value={name} onChange={(e) => { setName(e.target.value); }}/>
                                    <Spacer orientation={"vertical"} size={"1rem"} />
                                    <TextField label={"이메일"} variant={"filled"} type={"email"} error={errorEmail} name={"user_email"} id={"textfield-email"} value={email} onChange={(e) => { setEmail(e.target.value); }}/>
                                    <Spacer orientation={"vertical"} size={"1rem"} />
                                    <TextField label={"제목"} variant={"filled"} type={"text"} error={errorTitle} name={"title"} id={"textfield-title"} value={title} onChange={(e) => { setTitle(e.target.value); }}/>
                                    <Spacer orientation={"vertical"} size={"1rem"} />
                                    <TextField className="text-area" label={"내용"} variant={"filled"} type={"message"} error={errorMessage} name={"message"} minRows={2} multiline={true} id={"textfield-message"} value={message} onChange={(e) => { setMessage(e.target.value); }}/>
                                    <div className={"button-wrapper"}>
                                        <div id={"email-text-status"} className={sendError ? "error" : ""}>
                                            {sendError ? "오류가 발생했습니다!" : "메일을 보냈습니다!"}
                                        </div>
                                        <div className="button">
                                            <Ripples placeholder={"web"}><button onClick={() => {}}><Icon baseClassName={"material-icons-round"}>send</Icon></button></Ripples>
                                        </div>
                                    </div>
                                </EmailJsForm>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <LastEdit link={location.pathname} />
            <ButtonToTop />
            <Footer />
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
            //background-image: url(${patternColor});
            background-color: ${props => props.theme.colors.colorSurfaceReverse};
            transition: background-image 0.5s ease, background-color 0.5s ease;
            
            &.dark {
                //background-image: url(${patternBlack});
            }
            
            & > div {
                max-width: 1440px;
                width: 100%;
                height: calc(100% - 2rem);
                display: flex;
                flex-direction: row;
                gap: 1rem;
                padding: 1rem 0;
                backdrop-filter: blur(10px);
                overflow: hidden;
                
                & > img {
                    border-radius: 1rem;
                    height: 100%;
                }
                
                & > div {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    
                    & > h1 {
                        font-weight: 700;
                        font-size: xxx-large;
                        word-break: break-all;
                        color: ${props => props.theme.colors.colorOnSurfaceVariantReverse};
                        transition: color 0.5s ease;

                        & > span {
                            padding: 0 0.5rem;
                            box-decoration-break: clone;
                            -webkit-box-decoration-break: clone;
                            line-height: 1.4;
                            color: ${props => props.theme.colors.colorOnSurface};
                            background-color: ${props => props.theme.colors.colorSurface};
                            transition: background-color 0.5s ease;
                        }
                    }
                    
                    & > span {
                        margin-top: 1rem;
                        font-size: xx-large;
                        line-height: 1.3;
                        color: ${props => props.theme.colors.colorOnSurfaceVariantReverse};
                        transition: color 0.5s ease;
                        
                        & > span {
                            transition: color 0.5s ease;
                        }
                        
                        & > .bold {
                            font-weight: 700;
                        }
                        
                        & > .black {
                            color: ${props => props.theme.colors.colorSurface};
                        }
                        
                        & > .red {
                            color: ${props => props.theme.colors.colorRed};
                        }
                        
                        & > .underline {
                            text-decoration: underline;
                            text-underline-position: under;
                        }
                    }
                    
                    & > div.bio {
                        color: ${props => props.theme.colors.colorOnSurfaceReverse};
                        transition: color 0.5s ease;
                        margin-top: auto;
                        
                        & > a {
                            display: block;
                            position: relative;
                            padding: 0 0 0.2rem 0;
                            text-decoration: none;
                            overflow: hidden;
                            width: fit-content;
                            block-size: fit-content;

                            &::after {
                                content: '';
                                position: absolute;
                                bottom: 0;
                                left: 0;
                                width: 100%;
                                height: 0.2em;
                                background-color: ${props => props.theme.colors.colorOnSurface};
                                transition: opacity 300ms, transform 300ms;
                                opacity: 1;
                                transform: translate3d(-100%, 0, 0);
                            }

                            &:focus::after {
                                transform: translate3d(0, 0, 0);
                            }

                            @media (hover: hover) and (pointer: fine) {
                                &:hover::after {
                                    transition: translate3d(0, 0, 0);
                                }
                            }
                        }
                    }
                    
                    & > div.skill {
                        display: flex;
                        flex-direction: row;
                        gap: 1rem;
                        margin-top: 1rem;
                        
                        & > div {
                            display: flex;
                            flex-direction: column;
                            padding: 1rem;
                            border-radius: 1rem;
                            background-color: ${props => props.theme.colors.colorSurfaceVariantReverse};
                            transition: background-color 0.5s ease;
                            
                            & > div {
                                display: flex;
                                flex-direction: row;
                                gap: 1rem;
                                
                                & > img {
                                    height: 2rem;
                                }
                            }
                            
                            & > span {
                                color: ${props => props.theme.colors.colorOnSurfaceReverse};
                                transition: color 0.5s ease;
                            }
                            
                            & > span.title {
                                margin-top: 0.5rem;
                                font-weight: 700;
                                font-size: x-large;
                                
                                & > span.small {
                                    font-size: smaller;
                                }
                            }
                            
                            & > span.description {
                                
                            }
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
            animation: Mount-animation 0.5s ease;
            
            & > .title {
                width: 30%;
                height: fit-content;
                position: sticky;
                top: 5.5rem;
                font-size: xxx-large;
                font-weight: 800;
                overflow: hidden;
                color: ${props => props.theme.colors.colorOnSurface};
                transition: color 0.5s ease;
            }
            
            & > .content {
                width: 70%;
                display: flex;
                flex-direction: column;
                gap: 1rem;
                
                & > .sub-wrapper {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    gap: 1rem;
                    
                    & > .title {
                        width: calc(200% / 7);
                        height: fit-content;
                        position: sticky;
                        top: 5.5rem;
                        overflow: hidden;
                        color: ${props => props.theme.colors.colorOnSurface};
                        transition: color 0.5s ease;
                        
                        & > img {
                            width: 30%;
                        }
                        
                        & > div {
                            margin-top: 1rem;
                            font-size: xxx-large;
                            font-weight: 700;
                        }
                    }
                    
                    & > .content {
                        width: calc(500% / 7);
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        grid-auto-rows: 1fr;
                        column-gap: 1rem;
                        row-gap: 1rem;
                        overflow: hidden;
                        
                        & > div {
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            padding: 1rem;
                            border-radius: 1rem;
                            overflow: hidden;
                            background-color: ${props => props.theme.colors.colorSurfaceVariant};
                            transition: background-color 0.5s ease;
                            
                            & > .icons {
                                display: flex;
                                flex-direction: row;
                                gap: 1rem;
                            }
                            
                            & img {
                                max-width: 4rem;
                                max-height: 4rem;
                                width: 4rem;
                            }
                            
                            & > .info {
                                & > .title {
                                    margin-top: 1rem;
                                    font-size: xx-large;
                                    font-weight: 700;
                                    color: ${props => props.theme.colors.colorOnSurface};
                                    transition: color 0.5s ease;
                                }

                                & > .content {
                                    margin-top: 0.5rem;
                                    font-size: medium;
                                    font-weight: 400;
                                    color: ${props => props.theme.colors.colorOnSurface};
                                    transition: color 0.5s ease;
                                }
                            }
                            
                            &.app-page {
                                display: flex;
                                flex-direction: column;
                                padding: 0;
                                
                                & img {
                                    max-width: none;
                                    max-height: none;
                                }
                                
                                & > img {
                                    width: 100%;
                                }
                                
                                & > div {
                                    display: flex;
                                    flex-direction: row;
                                    justify-content: space-between;
                                    padding: 1rem;
                                    
                                    & > .info {
                                        
                                        & > img {
                                            width: 4rem;
                                        }
                                        
                                        & > .title {
                                            margin-top: 1rem;
                                            font-weight: 700;
                                            font-size: xx-large;
                                            color: ${props => props.theme.colors.colorOnSurface};
                                            transition: color 0.5s ease;
                                        }
                                        
                                        & > .content {
                                            margin-top: 0.5rem;
                                            font-size: medium;
                                            font-weight: 400;
                                            color: ${props => props.theme.colors.colorOnSurface};
                                            transition: color 0.5s ease;
                                        }
                                    }
                                    
                                    & > .buttons {
                                        height: fit-content;
                                        display: flex;
                                        flex-direction: row;
                                        margin-top: auto;
                                        
                                        & > div {
                                            border-radius: 5rem;
                                            transition: background-color 0.5s ease;

                                            @media (hover: hover) and (pointer: fine) {
                                                &:hover {
                                                    background-color: rgba(0, 0, 0, 0.1);
                                                }
                                            }
                                            
                                            & > button {
                                                width: 2rem;
                                                height: 2rem;
                                                position: relative;
                                                margin: 1rem;
                                                background-color: transparent;
                                                background-size: contain;
                                                background-position: center;
                                                background-repeat: no-repeat;

                                                & > span {
                                                    position: absolute;
                                                    top: 0;
                                                    left: 0;
                                                    font-size: 2rem;
                                                    transition: color 0.5s ease;
                                                    color: ${props => props.theme.colors.colorOnSurface};
                                                }

                                                @media ${({ theme }) => theme.device.mobile} {
                                                    width: 1.5rem;
                                                    height: 1.5rem;

                                                    & > span {
                                                        font-size: 1.5rem;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        
                        &.no-grid {
                            display: flex;
                            flex-direction: column;
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

const EmailJsForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    
    & > div.MuiTextField-root {
        & > label {
            font-family: Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            color: ${props => props.theme.name === "light" ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.6)" };
            
            &.Mui-focused {
                color: ${props => props.theme.colors.colorPrimary };
            }
            
            &.Mui-error {
                color: ${props => props.theme.colors.colorError};
            }
        }
        & > div.MuiFilledInput-root {
            font-family: Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            background-color: ${props => props.theme.name === "light" ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.06)" };
            border-radius: 0.5rem 0.5rem 0 0;
        }
        
        &:has(:-webkit-autofill) > label {
            color: #000000;
            &.Mui-focused {
                color: ${props => props.theme.colors.colorPrimary };
            }
        }

        & > div.MuiFilledInput-root > input, textarea {
            transition: background-color 0.5s ease, color 0.5s ease !important;
            color: ${props => props.theme.colors.colorOnSurface };
            
            &:-webkit-autofill,
            &:-webkit-autofill:hover,
            &:-webkit-autofill:focus,
            &:-webkit-autofill:active {
                animation-name: none;
                //background-color: transparent !important;
                // background-color:  ${props => props.theme.colors.colorSurfaceVariant} !important;
                // -webkit-box-shadow: 0 0 0 30px ${props => props.theme.colors.colorSurfaceVariant} inset !important;
            }
        }
        
        & > p {
            color: ${props => props.theme.colors.colorOnSurface};
            &.Mui-error {
                color: ${props => props.theme.colors.colorError};
            }
        }
    }
    
    & > div.MuiTextField-root > div.MuiFilledInput-root {
        &::before {
            border-bottom-color: ${props => props.theme.name === "light" ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.42)" };

            &:invalid {
                //background-color: red;
            }
        }
        
        &::after {
            border-bottom-color: ${props => props.theme.colors.colorPrimary };
        }

        &.Mui-error::before {
            border-bottom-color: ${props => props.theme.colors.colorError};
        }

        &.Mui-error::after {
            border-bottom-color: ${props => props.theme.colors.colorError};
        }
    }
    
    & > .button-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-top: 1rem;
        
        & > #email-text-status {
            font-weight: 500;
            visibility: hidden;
            opacity: 0;
            transition: visibility 0.5s ease, opacity 0.5s ease;
            
            &.visible {
                visibility: visible;
                opacity: 1;
            }
            
            &.error {
                color: ${props => props.theme.colors.colorError};
            }
        }
        
        & > .button {
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
            overflow: hidden;
            
            & > div {
                transition: background-color 0.5s ease;

                @media (hover: hover) and (pointer: fine) {
                    &:hover {
                        background-color: rgba(0, 0, 0, 0.1);
                    }
                }
                
                & > button {
                    width: 2rem;
                    height: 2rem;
                    position: relative;
                    margin: 1rem;
                    background-color: transparent;
                    background-size: contain;
                    background-position: center;
                    background-repeat: no-repeat;
                    
                    & > span {
                        position: absolute;
                        top: 0;
                        left: 0;
                        font-size: 2rem;
                        transition: color 0.5s ease;
                        color: ${props => props.theme.colors.colorOnSurface};
                    }

                    @media ${({ theme }) => theme.device.mobile} {
                        width: 1.5rem;
                        height: 1.5rem;
                        margin: 0.5rem;

                        & > span {
                            font-size: 1.5rem;
                        }
                    }
                }
            }
        }
    }
`
