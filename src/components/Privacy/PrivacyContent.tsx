import {Link} from "react-scroll";
import React from "react";
import styled from "styled-components";

function PrivacyContent() {
    const chapter = [
        "개인정보 처리 목적", "개인정보의 처리 및 보유기간", "처리하는 개인정보의 항목", "개인정보의 파기절차 및 파기방법", "정보주체와 법정대리인의 권리 · 의무 및 그 행사방법에 관한 사항", "개인정보의 안전성 확보조치에 관한 사항",
        "개인정보를 자동으로 수집하는 장치의 설치 · 운영 및 그 거부에 관한 사항", "행태정보의 수집 · 이용 · 제공 및 거부 등에 관한 사항", "추가적인 이용 · 제공 판단기준", "개인정보 보호책임자에 관한 사항", "개인정보의 열람청구를 접수 · 처리하는 부서",
        "정보주체의 권익침해에 대한 구제방법", "개인정보 처리방침 변경"
    ];

    return (
        <ContentWrapper>
            <div className="wrapper">
                <div className="title">목차</div>
                <div className="content indices">
                    {chapter.map((item, index) => (
                        <Link to={`chapter_${index + 1}`} smooth={true} offset={-90}><div className="number">{(index + 1).toLocaleString('en-US', {minimumIntegerDigits: 2})}.</div>{item}</Link>
                    ))}
                </div>
            </div>
            <div className="wrapper" id={"chapter_1"}>
                <div className="title">01. {chapter[0]}</div>
                <span className="content">
                        <div>상기 적용되는 범위의 서비스를 운영하고 있는 <b>아이엔랩 ienlab</b>은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</div>
                        <div className={"box"}>
                            <li>고객 가입의사 확인, 고객에 대한 서비스 제공에 따른 본인 식별 · 인증, 회원자격 유지 · 관리, 물품 또는 서비스 공급에 따른 금액 결제, 물품 또는 서비스의 공급 · 배송 등</li>
                        </div>
                    </span>
            </div>
            <div className="wrapper" id="chapter_2">
                <div className="title">02. {chapter[1]}</div>
                <span className="content">
                        <li><b>아이엔랩 ienlab</b>은 법령에 따른 개인정보 보유 · 이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유 · 이용기간 내에서 개인정보를 처리 · 보유합니다.</li>
                        <li>
                            각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
                            <div className="box">
                                <li>고객 가입 및 관리 : 카카오싱크를 통한 회원가입 및 카카오채널을 통한 관리</li>
                                <li>보유 기간 : 카카오채널 탈퇴 시, 즉시 삭제</li>
                            </div>
                        </li>
                    </span>
            </div>
            <div className="wrapper" id="chapter_3">
                <div className="title">03. {chapter[2]}</div>
                <span className="content">
                        <div><b>아이엔랩 ienlab</b>은 다음의 개인정보 항목을 처리하고 있습니다.</div>
                        <div className="box">
                            <h3>Google 로그인 제3자 제공 동의</h3>
                            <h5>아래는 회원 가입 시(Google 계정을 통한 간편 가입 시) 제공 동의를 해주시는 자동 수집 항목입니다.</h5>

                            <li>필수항목 : 프로필 정보(닉네임/프로필 사진), Google 계정(이메일), 성별</li>
                            <li>선택항목 : 생일, 출생연도</li>
                            <li>수집목적 : 서비스 이용</li>
                            <li>보유기간 : Google 탈퇴 또는 동의철회 시 지체 없이 파기</li>
                        </div>
                    </span>
            </div>
            <div className="wrapper" id="chapter_4">
                <div className="title">04. {chapter[3]}</div>
                <span className="content">
                        <li><b>아이엔랩 ienlab</b>은 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.</li>
                        <li>
                            정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.
                            <div className="box number">
                                <li>법령 근거 :</li>
                                <li>보존하는 개인정보 항목 : 계좌정보, 거래날짜</li>
                            </div>
                        </li>

                        <li>
                            개인정보 파기의 절차 및 방법은 다음과 같습니다.
                            <div className="box number">
                                <li>파기절차 : <b>아이엔랩 ienlab</b>은 파기 사유가 발생한 개인정보를 선정하고, <b>아이엔랩 ienlab</b>의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.</li>
                                <li>파기방법 : 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.</li>
                            </div>
                        </li>
                    </span>
            </div>
            <div className="wrapper" id="chapter_5">
                <div className="title">05. {chapter[4]}</div>
                <span className="content">
                        <div>정보주체와 법정대리인은 다음과 같은 권리 · 의무를 행사할 수 있습니다.</div>
                        <div className="box number">
                            <li>정보주체는 <b>아이엔랩 ienlab</b>에 대해 언제든지 개인정보 열람 · 정정 · 삭제 · 처리정지 요구 등의 권리를 행사할 수 있습니다.</li>
                            <li>제1항에 따른 권리 행사는 <b>아이엔랩 ienlab</b>에 대해 「개인정보 보호법」 시행령 제41조 제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 <b>아이엔랩 ienlab</b>은 이에 대해 지체 없이 조치하겠습니다.</li>
                            <li>제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.</li>
                            <li>개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한될 수 있습니다.</li>
                            <li>개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.</li>
                            <li><b>아이엔랩 ienlab</b>은 정보주체 권리에 따른 열람의 요구, 정정 · 삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.</li>
                        </div>
                    </span>
            </div>
            <div className="wrapper" id="chapter_6">
                <div className="title">06. {chapter[5]}</div>
                <span className="content">
                        <div><b>아이엔랩 ienlab</b>은 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</div>
                        <div className="box number">
                            <li>내부관리 계획의 수립 및 시행<br/>개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.</li>
                            <li>개인정보에 대한 접근 제한<br/>개인정보를 처리하는 데이터베이스 시스템에 대한 접근권한의 부여, 변경, 말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단 시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.</li>
                            <li>비인가자에 대한 출입 통제<br/>개인정보를 보관하고 있는 물리적 보관 장소를 별도로 두고 이에 대해 출입통제 절차를 수립, 운영하고 있습니다.</li>
                        </div>
                    </span>
            </div>
            <div className="wrapper" id="chapter_7">
                <div className="title">07. {chapter[6]}</div>
                <span className="content">
                        <li><b>아이엔랩 ienlab</b>은 이용자에게 개별적인 맞춤 서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.</li>
                        <li>
                            쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터 내의 하드디스크에 저장되기도 합니다.
                            <div className="box korean">
                                <li>쿠키의 사용 목적 : 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.</li>
                                <li>쿠키의 설치 · 운영 및 거부 : 웹브라우저 상단의 도구&gt;인터넷 옵션&gt;개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다.</li>
                                <li>쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.</li>
                            </div>
                        </li>
                    </span>
            </div>
            <div className="wrapper" id="chapter_8">
                <div className="title">08. {chapter[7]}</div>
                <span className="content">
                        <div><b>아이엔랩 ienlab</b>은 온라인 맞춤형 광고 등을 위한 행태정보를 수집 · 이용 · 제공하지 않습니다.</div>
                    </span>
            </div>
            <div className="wrapper" id="chapter_9">
                <div className="title">09. {chapter[8]}</div>
                <span className="content">
                        <div><b>아이엔랩 ienlab</b>은 ｢개인정보 보호법｣ 제15조 제3항 및 제17조 제4항에 따라 ｢개인정보 보호법 시행령｣ 제14조의2에 따른 사항을 고려하여 정보주체의 동의 없이 개인정보를 추가적으로 이용·제공할 수 있습니다.이에 따라 <b>아이엔랩 ienlab</b>이 정보주체의 동의 없이 추가적인 이용·제공을 하기 위해서 다음과 같은 사항을 고려하였습니다.</div>
                        <div className="box">
                            <li>개인정보를 추가적으로 이용 · 제공하려는 목적이 당초 수집 목적과 관련성이 있는지 여부</li>
                            <li>개인정보를 수집한 정황 또는 처리 관행에 비추어 볼 때 추가적인 이용 · 제공에 대한 예측 가능성이 있는지 여부</li>
                            <li>개인정보의 추가적인 이용 · 제공이 정보주체의 이익을 부당하게 침해하는지 여부</li>
                            <li>가명처리 또는 암호화 등 안전성 확보에 필요한 조치를 하였는지 여부</li>
                            <li>※ 추가적인 이용·제공 시 고려사항에 대한 판단기준은 사업자/단체 스스로 자율적으로 판단하여 작성 · 공개함</li>
                        </div>
                    </span>
            </div>
            <div className="wrapper" id="chapter_10">
                <div className="title">10. {chapter[9]}</div>
                <span className="content">
                        <li>
                            <b>아이엔랩 ienlab</b>은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
                            <div className="box">
                                <h3>개인정보 보호책임자</h3>
                                <li>성명 : 이현우</li>
                                <li>직책 : 개발자 / 디자이너</li>
                                <li>직급 : 개발자 / 디자이너</li>
                                <li>연락처 : my@ien.zone</li>
                            </div>
                        </li>
                        <li>정보주체께서는 <b>아이엔랩 ienlab</b>의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. <b>아이엔랩 ienlab</b>은 정보주체의 문의에 대해 지체 없이 답변 및 처리해 드릴 것입니다.</li>
                    </span>
            </div>
            <div className="wrapper" id="chapter_11">
                <div className="title">11. {chapter[10]}</div>
                <span className="content">
                        <div>정보주체는 ｢개인정보 보호법｣ 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있습니다. <b>아이엔랩 ienlab</b>은 정보주체의 개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다.</div>
                        <div className="box">
                                <h3>개인정보 열람청구 접수 · 처리 부서</h3>
                                <li>부서명 : 아이엔랩 ienlab</li>
                                <li>담당자 : 이현우</li>
                                <li>연락처 : my@ien.zone</li>
                            </div>
                    </span>
            </div>
            <div className="wrapper" id="chapter_12">
                <div className="title">12. {chapter[11]}</div>
                <span className="content">
                        <div>정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.</div>
                        <div className="box number">
                            <li>개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)</li>
                            <li>개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)</li>
                            <li>대검찰청 : (국번없이) 1301 (www.spo.go.kr)</li>
                            <li>경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)</li>
                        </div>
                        <div>「개인정보보호법」제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.<br /><br />※ 행정심판에 대해 자세한 사항은 중앙행정심판위원회(www.simpan.go.kr) 홈페이지를 참고하시기 바랍니다.</div>
                    </span>
            </div>
            <div className="wrapper" id="chapter_13">
                <div className="title">13. {chapter[12]}</div>
                <span className="content">
                        <div>이 개인정보 처리방침은 2024년 2월 22일부터 적용됩니다.</div>
                    </span>
            </div>
        </ContentWrapper>
    );
}

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    animation: Mount-animation 0.5s ease;

    & > .wrapper {
        width: 60%;
        display: flex;
        flex-direction: column;
        margin-top: 2rem;

        @media ${({ theme }) => theme.device.tablet} {
            width: 100%;
        }

        & > .title {
            width: 100%;
            font-weight: bolder;
            font-size: xx-large;
            word-break: keep-all;
            transition: color 0.5s ease;

            @media ${({ theme }) => theme.device.mobile} {
                width: 100%;
                position: relative;
                font-size: xxx-large;
                word-break: break-all;
                top: 0;
            }
        }

        & > .content {
            width: 100%;
            margin-top: 1rem;
            word-break: keep-all;
            
            @media ${({ theme }) => theme.device.tablet} {
                width: 100%;
                margin-left: 0;
                word-break: break-all;
            }
            
            & > div {
                transition: color 0.5s ease;
            }
        }
        
        & > span.content {
            line-height: 1.5;
            font-size: large;
            counter-reset: circle 0;

            & > li {
                position: relative;
                list-style: decimal;
                padding-left: 20px;
                text-indent: -20px;
                transition: color 0.5s ease;
            }
            
            .box {
                background-color: ${props => props.theme.colors.colorSurfaceVariant};
                list-style: disc;
                padding: 1rem;
                border-radius: 1rem;
                margin: 1rem 0;
                transition: background-color 0.5s ease;
                
                & > li {
                    padding-left: 24px;
                    text-indent: -24px;
                    margin-bottom: 0.5rem;
                    transition: color 0.5s ease;
                    
                    &:last-child {
                        margin-bottom: 0;
                    }
                }

                & > h3 {
                    padding-left: 0;
                    text-indent: 0;
                    font-size: larger;
                    font-weight: 700;
                }

                & > h5 {
                    padding-left: 0;
                    text-indent: 0;
                    font-size: smaller;
                    margin-bottom: 1rem;
                }
            }
            
            .number {
                list-style: decimal;
                
                & > li {
                    padding-left: 20px;
                    text-indent: -20px;
                }
            }
            
            .korean {
                & > li:nth-child(1)::marker { content: '가. '; }
                & > li:nth-child(2)::marker { content: '나. '; }
                & > li:nth-child(3)::marker { content: '다. '; }
                & > li:nth-child(4)::marker { content: '라. '; }
                & > li:nth-child(5)::marker { content: '마. '; }
                & > li:nth-child(6)::marker { content: '바. '; }
                & > li:nth-child(7)::marker { content: '사. '; }
                & > li:nth-child(8)::marker { content: '아. '; }
                & > li:nth-child(9)::marker { content: '자. '; }
                & > li:nth-child(10)::marker { content: '차. '; }
                & > li:nth-child(11)::marker { content: '카. '; }
                & > li:nth-child(12)::marker { content: '타. '; }
                & > li:nth-child(13)::marker { content: '파. '; }
                & > li:nth-child(14)::marker { content: '하. '; }
            }
            
            b {
                font-weight: 700;
            }
            
            & > :last-child {
                margin-bottom: 0;
            }
        }

        & > .indices {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            column-gap: 1rem;
            grid-auto-rows: 1fr;
            row-gap: 1rem;

            & > a {
                background-color: ${props => props.theme.colors.colorSurfaceVariant};
                padding: 1rem;
                border-radius: 1rem;
                font-weight: 500;
                word-break: keep-all;
                transition: background-color 0.5s ease, color 0.5s ease;

                & > .number {
                    font-weight: 700;
                    font-size: xx-large;
                    margin-bottom: 1rem;
                }
            }

            @media ${({ theme }) => theme.device.laptop} {
                grid-template-columns: repeat(3, 1fr);
            }

            @media ${({ theme }) => theme.device.mobile} {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    }
`

export default PrivacyContent;
