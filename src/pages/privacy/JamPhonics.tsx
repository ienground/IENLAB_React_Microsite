import {AppProps} from "../../App";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import Header from "../../components/Header";
import {TitleBox} from "../../components/Component";
import PrivacyContent from "../../components/Privacy/PrivacyContent";
import LastEdit from "../../components/LastEdit";
import Footer from "../../components/Footer";
import ButtonToTop from "../../components/ButtonToTop";
import Sidebar from "../../components/Sidebar";
import {Wrapper} from "../Privacy";
import icJamPhonics from "../../assets/icon/ic_jamphonics.svg";
import imgJamPhonics from "../../assets/image/img_jam_phonics.png";

export default function JamPhonics({darkMode, setDarkMode}: AppProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    window.document.title = "Jam Phonics 개인정보 처리방침 | 아이엔랩 ienlab";

    return (
        <Wrapper>
            <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} darkMode={darkMode} setDarkMode={setDarkMode}/>
            <div id="wrap">
                <TitleBox className="title-wrapper" style={{backgroundImage: `url(${imgJamPhonics})`}}>
                    <div>
                        <h3 className={"description"}><span>Jam Phonics 사용자를 위한</span></h3>
                        <h1 className={"title"}><span>개인정보 처리방침</span></h1>
                    </div>
                </TitleBox>
                <div className="content-wrapper">
                    <div className="title">적용되는 서비스 범위</div>
                    <div className="list">
                        <div>
                            <img src={icJamPhonics} />
                            <div>Jam Phonics</div>
                        </div>
                    </div>
                    <PrivacyContent company={"위더스"} name={"우태린"} email={""} charge={"대표"} level={""} date={{year: 2024, month: 1, day: 22}} processPrivacy={false}/>
                </div>
                <LastEdit link={location.pathname}/>
            </div>
            <Footer/>
            <ButtonToTop/>
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
        </Wrapper>
    );
}
