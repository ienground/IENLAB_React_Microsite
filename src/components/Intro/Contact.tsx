import styled from "styled-components";
import {ContentWrapper, ImgIcon, ImgTitleIcon, InnerBoxWrapper, InnerContentWrapper, InnerTitleWrapper, InnerWrapper, TextContentContent, TextContentTitle, TextTitle} from "./CommonComponent/CommonComponent";
import emailjs from '@emailjs/browser';
import React, {useRef, useState} from "react";
import {TextFieldsRounded} from "@mui/icons-material";
import {Icon, TextField} from "@mui/material";
import {FilledInput} from "@mui/material-next";
import {Spacer} from "../Component";
import icAndroid from "../../assets/ic_android.svg";
import icCall from "../../assets/ic_call.svg";
import icMail from "../../assets/ic_mail.svg";
import icInstagram from "../../assets/ic_instagram.svg";
import icGitHub from "../../assets/ic_github.svg";
import icFacebook from "../../assets/ic_facebook.svg";
import icNaverBlog from "../../assets/ic_naver_blog.svg"
import icTistory from "../../assets/ic_tistory.svg"
import icBehance from "../../assets/ic_behance.svg"
import Ripples from "react-ripples";
import icAppCalarm from "../../assets/ic_app_calarm.png";

function Contact() {
    const form = useRef(null)
    const [errorName, setErrorName] = useState(false);
    const [name, setName] = useState("");
    const [errorEmail, setErrorEmail] = useState(false);
    const [email, setEmail] = useState("");
    const [errorTitle, setErrorTitle] = useState(false);
    const [title, setTitle] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [sendError, setSendError] = useState(false);

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();

        if (name !== "" && email !== "" && title !== "" && message !== "") {
            let emailTextStatus = document.getElementById("email-text-status");

            // @ts-ignore
            emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, form.current, process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
                .then((result) => {
                    console.log(result.text);
                    setName("");
                    setEmail("");
                    setTitle("");
                    setMessage("");
                }, (error) => {
                    console.log(error.text);
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
            setErrorEmail(name === "");
            setErrorTitle(name === "");
            setErrorMessage(name === "");
        }
    };

    return (
        <ContactWrapper>
            <TextTitle>연락처</TextTitle>
            <ContentWrapper>
                <InnerWrapper>
                    <InnerTitleWrapper>
                        <ImgTitleIcon src={icCall} />
                        <Spacer orientation={"vertical"} size={"1rem"} />
                        <TextContentTitle className={"black xxx-large"} fontWeight={"600"}>Mail</TextContentTitle>
                    </InnerTitleWrapper>
                    <GridContentWrapper>
                        <InnerBoxWrapper onClick={() => {}}>
                            <ImgIcon src={icCall} />
                            <Spacer orientation={"vertical"} size={"1rem"} />
                            <TextContentTitle className={"black background"}>전화</TextContentTitle><br />
                            <TextContentContent fontWeight={"normal"} className={"black medium"}>010-4815-7296</TextContentContent>
                        </InnerBoxWrapper>
                        <InnerBoxWrapper>
                            <ImgIcon src={icMail} />
                            <Spacer orientation={"vertical"} size={"1rem"} />
                            <TextContentTitle className={"black background"}>메일</TextContentTitle><br />
                            <TextContentContent fontWeight={"normal"} className={"black medium"}>my@ien.zone</TextContentContent>
                        </InnerBoxWrapper>
                        <InnerBoxWrapper>
                            <ImgIcon src={icGitHub} />
                            <Spacer orientation={"vertical"} size={"1rem"} />
                            <TextContentTitle className={"black background"}>캘람</TextContentTitle><br />
                            <TextContentContent fontWeight={"normal"} className={"black medium"}>내 일정을 아는 똑똑한 알람</TextContentContent>
                        </InnerBoxWrapper>
                        <InnerBoxWrapper>
                            <ImgIcon src={icBehance} />
                            <Spacer orientation={"vertical"} size={"1rem"} />
                            <TextContentTitle className={"black background"}>캘람</TextContentTitle><br />
                            <TextContentContent fontWeight={"normal"} className={"black medium"}>내 일정을 아는 똑똑한 알람</TextContentContent>
                        </InnerBoxWrapper>
                        <InnerBoxWrapper>
                            <ImgIcon src={icTistory} />
                            <Spacer orientation={"vertical"} size={"1rem"} />
                            <TextContentTitle className={"black background"}>캘람</TextContentTitle><br />
                            <TextContentContent fontWeight={"normal"} className={"black medium"}>내 일정을 아는 똑똑한 알람</TextContentContent>
                        </InnerBoxWrapper>
                        <InnerBoxWrapper>
                            <ImgIcon src={icNaverBlog} />
                            <Spacer orientation={"vertical"} size={"1rem"} />
                            <TextContentTitle className={"black background"}>캘람</TextContentTitle><br />
                            <TextContentContent fontWeight={"normal"} className={"black medium"}>내 일정을 아는 똑똑한 알람</TextContentContent>
                        </InnerBoxWrapper>
                        <InnerBoxWrapper>
                            <ImgIcon src={icInstagram} />
                            <Spacer orientation={"vertical"} size={"1rem"} />
                            <TextContentTitle className={"black background"}>캘람</TextContentTitle><br />
                            <TextContentContent fontWeight={"normal"} className={"black medium"}>내 일정을 아는 똑똑한 알람</TextContentContent>
                        </InnerBoxWrapper>
                        <InnerBoxWrapper>
                            <ImgIcon src={icFacebook} />
                            <Spacer orientation={"vertical"} size={"1rem"} />
                            <TextContentTitle className={"black background"}>캘람</TextContentTitle><br />
                            <TextContentContent fontWeight={"normal"} className={"black medium"}>내 일정을 아는 똑똑한 알람</TextContentContent>
                        </InnerBoxWrapper>
                    </GridContentWrapper>
                </InnerWrapper>
                <InnerWrapper>
                    <InnerTitleWrapper>
                        <ImgTitleIcon src={icMail} />
                        <Spacer orientation={"vertical"} size={"1rem"} />
                        <TextContentTitle className={"black xxx-large"} fontWeight={"600"}>Mail</TextContentTitle>
                    </InnerTitleWrapper>
                    <InnerContentWrapper>
                        <EmailJsForm ref={form} onSubmit={sendEmail}>
                            <TextField label={"이름"} variant={"filled"} type={"text"} error={errorName} name={"user_name"} id={"textfield-user-name"} value={name} onChange={(e) => { setName(e.target.value); }}/>
                            <Spacer orientation={"vertical"} size={"1rem"} />
                            <TextField label={"이메일"} variant={"filled"} type={"email"} error={errorEmail} name={"user_email"} id={"textfield-email"} value={email} onChange={(e) => { setEmail(e.target.value); }}/>
                            <Spacer orientation={"vertical"} size={"1rem"} />
                            <TextField label={"제목"} variant={"filled"} type={"text"} error={errorTitle} name={"title"} id={"textfield-title"} value={title} onChange={(e) => { setTitle(e.target.value); }}/>
                            <Spacer orientation={"vertical"} size={"1rem"} />
                            <TextField className="text-area" label={"내용"} variant={"filled"} type={"message"} error={errorMessage} name={"message"} minRows={2} multiline={true} id={"textfield-message"} value={message} onChange={(e) => { setMessage(e.target.value); }}/>
                            <Spacer orientation={"vertical"} size={"1rem"} />
                            <EmailStatusButtonWrapper>
                                <TextStatus id={"email-text-status"} className={sendError ? "error" : ""}>{sendError ? "오류가 발생했습니다!" : "메일을 보냈습니다!"}</TextStatus>
                                <ButtonWrapper>
                                    <Ripples placeholder={"web"}><ImgButton onClick={() => {}}><Icon baseClassName={"material-icons-round"}>send</Icon></ImgButton></Ripples>
                                </ButtonWrapper>
                            </EmailStatusButtonWrapper>
                        </EmailJsForm>
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

    @media ${({theme}) => theme.device.mobile} {
        flex-direction: column;
        margin: 1rem 1rem 0 1rem;
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
    
`

const ImgButton = styled.button`
    width: 2rem;
    height: 2rem;
    position: relative;
    background-color: transparent;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${props => props.style?.backgroundImage});
    margin: 1rem;

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
`

const ButtonWrapper = styled.div`
    border-radius: 5rem;
    overflow: hidden;
    width: 4rem;
    height: 4rem;

    & > div {
        transition: background-color 0.5s ease;
        &:hover {
            background-color: rgba(0, 0, 0, 0.1);
        }
    }
`

const TextStatus = styled.span`
    visibility: hidden;
    opacity: 0;
    font-weight: bold;
    transition: visibility 0.5s ease, opacity 0.5s ease;
    
    &.visible {
        visibility: visible;
        opacity: 1;
    }
    
    &.error {
        color: ${props => props.theme.colors.colorError};
    }
`

const EmailStatusButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const GridContentWrapper = styled.div`
    width: calc(70% - 2rem);
    margin-left: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 2rem;
    row-gap: 2rem;
    
    @media ${({ theme }) => theme.device.mobile} {
        width: 100%;
        margin-left: 0;
        grid-template-columns: 1fr;
        column-gap: 1rem;
        row-gap: 1rem;
    }
`

export default Contact;
