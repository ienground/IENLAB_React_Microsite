import DefaultLayout from "../../../../utils/layout/DefaultLayout.tsx";
import {CommonWrapper} from "../../../../utils/layout/CommonWrapper.tsx";
import {LockLaminatedIcon} from "@phosphor-icons/react";
import styled from "styled-components";
import {Card, CardBody, CardHeader, Divider, Spacer} from "@heroui/react";
import {getCompleteWord, useElementRefs, useVisibleAnimation} from "../../../../utils/utils.ts";
import {useEffect, useState} from "react";

export default function PrivacyScreen() {
  const company = "아이엔랩 ienlab";
  const companyKor = "아이엔랩";
  const connectWord = getCompleteWord(companyKor, "은", "는");
  const connectWord2 = getCompleteWord(companyKor, "이", "가");

  const [currentAnchors, setCurrentAnchors] = useState<Set<string>>(new Set());
  const addAnchors = (newValue: string) => {
    setCurrentAnchors(prevAnchors => new Set(prevAnchors).add(newValue));
  };
  const removeAnchors = (newValue: string) => {
    setCurrentAnchors(prevAnchors => {
      const newSet = new Set(prevAnchors);
      newSet.delete(newValue);
      return newSet;
    });
  };

  const content = [
    {
      id: "privacy-service",
      title: "적용되는 서비스 범위",
      content: <div className="content">
        dd
      </div>
    },
    {
      id: "privacy-purpose",
      title: "개인정보 처리 목적",
      content: <div className="content">
        <div>상기 적용되는 범위의 서비스를 운영하고 있는 <b>{company}</b>{connectWord} 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</div>
        <Card className="callout">
          <CardBody className="body">
            <li>고객 가입의사 확인, 고객에 대한 서비스 제공에 따른 본인 식별 · 인증, 회원자격 유지 · 관리, 물품 또는 서비스 공급에 따른 금액 결제, 물품 또는 서비스의 공급 · 배송 등</li>
          </CardBody>
        </Card>
      </div>
    },
    {
      id: "privacy-process-date",
      title: "개인정보의 처리 및 보유 기간",
      content: <div className="content">
        <ol>
          <li>
            <b>{company}</b>{connectWord} 법령에 따른 개인정보 보유 · 이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유 · 이용기간 내에서 개인정보를 처리 · 보유합니다.
          </li>
          <li>
            각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
            <div className="box">

            </div>
            <Card className="callout">
              <CardBody className="body">
                <ul>
                  <li>고객 가입 및 관리 : 카카오싱크를 통한 회원가입 및 카카오채널을 통한 관리</li>
                  <li>보유 기간 : 카카오채널 탈퇴 시, 즉시 삭제</li>
                </ul>
              </CardBody>
            </Card>
          </li>
        </ol>
      </div>
    },
    {
      id: "privacy-content-detail",
      title: "처리하는 개인정보의 항목",
      content: <div className="content">
        <div><b>{company}</b>{connectWord} 다음의 개인정보 항목을 처리하고 있습니다.</div>
        <Card className="callout">
          <CardBody className="body">
            <h3>Google 로그인 제3자 제공 동의</h3>
            <h5>아래는 회원 가입 시(Google 계정을 통한 간편 가입 시) 제공 동의를 해주시는 자동 수집 항목입니다.</h5>

            <li>필수항목 : 프로필 정보(닉네임/프로필 사진), Google 계정(이메일), 성별</li>
            <li>선택항목 : 생일, 출생연도</li>
            <li>수집목적 : 서비스 이용</li>
            <li>보유기간 : Google 탈퇴 또는 동의 철회 시 지체 없이 파기</li>
          </CardBody>
        </Card>
      </div>
    },
    {
      id: "privacy-delete-how",
      title: "개인정보의 파기 절차 및 파기 방법",
      content: <div className="content">
        <ol>
          <li><b>{company}</b>{connectWord} 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.</li>
          <li>
            정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.
            {/*<Card className="callout">*/}
            {/*  <CardBody className="body">*/}
            {/*    <ul>*/}
            {/*      <li>법령 근거 :</li>*/}
            {/*      <li>보존하는 개인정보 항목 : 계좌정보, 거래날짜</li>*/}
            {/*    </ul>*/}
            {/*  </CardBody>*/}
            {/*</Card>*/}
          </li>

          <li>
            개인정보 파기의 절차 및 방법은 다음과 같습니다.
            <Card className="callout">
              <CardBody className="body">
                <ul>
                  <li>파기절차 : <b>{company}</b>{connectWord} 파기 사유가 발생한 개인정보를 선정하고, <b>{company}</b>의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.
                  </li>
                  <li>파기방법 : 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.</li>
                </ul>
              </CardBody>
            </Card>
          </li>
        </ol>
      </div>
    },
    {
      id: "privacy-rights",
      title: "정보주체와 법정대리인의 권리 · 의무 및 그 행사방법에 관한 사항",
      content: <div className="content">
        <div>정보주체와 법정대리인은 다음과 같은 권리 · 의무를 행사할 수 있습니다.</div>
        <Card className="callout">
          <CardBody className="body">
            <ol>
              <li>정보주체는 <b>{company}</b>에 대해 언제든지 개인정보 열람 · 정정 · 삭제 · 처리정지 요구 등의 권리를 행사할 수 있습니다.</li>
              <li>제1항에 따른 권리 행사는 <b>{company}</b>에 대해 「개인정보 보호법」 시행령 제41조 제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 <b>{company}</b>{connectWord} 이에 대해 지체 없이 조치하겠습니다.
              </li>
              <li>제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.</li>
              <li>개인정보 열람 및 처리정지 요구는 「개인정보보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한될 수 있습니다.</li>
              <li>개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.</li>
              <li>
                <b>{company}</b>{connectWord} 정보주체 권리에 따른 열람의 요구, 정정 · 삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.
              </li>
            </ol>
          </CardBody>
        </Card>
      </div>
    },
    {
      id: "privacy-safe",
      title: "개인정보의 안전성 확보조치에 관한 사항",
      content: <div className="content">
        <div><b>{company}</b>{connectWord} 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</div>
        <Card className="callout">
          <CardBody className="body">
            <ol>
              <li>내부관리 계획의 수립 및 시행 : 개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.</li>
              <li>개인정보에 대한 접근 제한 : 개인정보를 처리하는 데이터베이스 시스템에 대한 접근권한의 부여, 변경, 말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단 시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.
              </li>
              <li>비인가자에 대한 출입 통제 : 개인정보를 보관하고 있는 물리적 보관 장소를 별도로 두고 이에 대해 출입통제 절차를 수립, 운영하고 있습니다.</li>
            </ol>
          </CardBody>
        </Card>
      </div>
    },
    {
      id: "privacy-auto-get",
      title: "개인정보를 자동으로 수집하는 장치의 설치 · 운영 및 그 거부에 관한 사항",
      content: <div className="content">
        <ol>
          <li><b>{company}</b>{connectWord} 이용자에게 개별적인 맞춤 서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.</li>
          <li>
            쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터 내의 하드디스크에 저장되기도 합니다.
            <Card className="callout">
              <CardBody className="body">
                <ol>
                  <li>쿠키의 사용 목적 : 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.</li>
                  <li>쿠키의 설치 · 운영 및 거부 : 웹 브라우저 상단의 도구 &gt; 인터넷 옵션 &gt; 개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다. (브라우저마다 다를 수 있음)</li>
                  <li>쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.</li>
                </ol>
              </CardBody>
            </Card>
          </li>
        </ol>
      </div>
    },
    {
      id: "privacy-life-info",
      title: "행태정보의 수집 · 이용 · 제공 및 거부 등에 관한 사항",
      content: <div className="content">
        <div><b>{company}</b>{connectWord} 온라인 맞춤형 광고 등을 위한 행태정보를 수집 · 이용 · 제공하지 않습니다.</div>
      </div>
    },
    {
      id: "privacy-additional",
      title: "추가적인 이용 · 제공 판단기준",
      content: <div className="content">
        <div>
          <b>{company}</b>{connectWord} ｢개인정보보호법｣ 제15조 제3항 및 제17조 제4항에 따라 ｢개인정보 보호법 시행령｣ 제14조의2에 따른 사항을 고려하여 정보주체의 동의 없이 개인정보를 추가적으로 이용 · 제공할 수 있습니다. 이에 따라 <b>{company}</b>{connectWord2} 정보주체의 동의 없이 추가적인 이용·제공을 하기 위해서 다음과 같은 사항을 고려하였습니다.
        </div>
        <Card className="callout">
          <CardBody className="body">
            <ul>
              <li>개인정보를 추가적으로 이용 · 제공하려는 목적이 당초 수집 목적과 관련성이 있는지 여부</li>
              <li>개인정보를 수집한 정황 또는 처리 관행에 비추어 볼 때 추가적인 이용 · 제공에 대한 예측 가능성이 있는지 여부</li>
              <li>개인정보의 추가적인 이용 · 제공이 정보주체의 이익을 부당하게 침해하는지 여부</li>
              <li>가명처리 또는 암호화 등 안전성 확보에 필요한 조치를 하였는지 여부</li>
              <li>추가적인 이용 · 제공 시 고려사항에 대한 판단기준은 사업자/단체 스스로 자율적으로 판단하여 작성 · 공개함</li>
            </ul>
          </CardBody>
        </Card>
      </div>
    },
    {
      id: "privacy-manager",
      title: "개인정보 보호책임자에 관한 사항",
      content: <div className="content">
        <div>
          <ul>
            <li><b>{company}</b>{connectWord} 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</li>
            <li>정보주체께서는 <b>{company}</b>의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. <b>{company}</b>{connectWord} 정보주체의 문의에 대해 지체 없이 답변 및 처리해드리겠습니다.</li>
          </ul>
        </div>
        <Card className="callout">
          <CardBody className="body">
            <ul>
              <h3>개인정보 보호책임자</h3>
              <li>성명 : 이현우</li>
              <li>직책 : 대표 개발자</li>
              <li>직급 : 대표</li>
              <li>연락처 : my@ien.zone</li>
            </ul>
          </CardBody>
        </Card>
      </div>
    },
    {
      id: "privacy-department",
      title: "개인정보의 열람청구를 접수 · 처리하는 부서",
      content: <div className="content">
        <div>정보주체는 ｢개인정보보호법｣ 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있습니다. <b>{company}</b>{connectWord} 정보주체의 개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다.
        </div>
        <Card className="callout">
          <CardBody className="body">
            <ul>
              <h3>개인정보 열람청구 접수 · 처리 부서</h3>
              <li>담당자 : 이현우</li>
              <li>연락처 : my@ien.zone</li>
            </ul>
          </CardBody>
        </Card>
      </div>
    },
    {
      id: "privacy-savior",
      title: "정보주체의 권익침해에 대한 구제방법",
      content: <div className="content">
        <div>정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.</div>
        <Card className="callout">
          <CardBody className="body">
            <ol>
              <li>개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)</li>
              <li>개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)</li>
              <li>대검찰청 : (국번없이) 1301 (www.spo.go.kr)</li>
              <li>경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)</li>
            </ol>
          </CardBody>
        </Card>
        <div>「개인정보보호법」 제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.</div>
        <div>※ 행정심판에 대해 자세한 사항은 중앙행정심판위원회(www.simpan.go.kr) 홈페이지를 참고하시기 바랍니다.</div>
      </div>
    },
    {
      id: "privacy-change",
      title: "개인정보처리방침 변경",
      content: <div className="content">
        <div>이 개인정보 처리방침은 2024년 2월 22일부터 적용됩니다.</div>
      </div>
    }
  ];

  useEffect(() => {
    const anchors = document.querySelectorAll('.content-chapter[id]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 뷰포트에 들어온 요소의 ID를 activeId로 설정
            addAnchors(entry.target.id);
          } else {
            removeAnchors(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0px 0px -50% 0px",
        // 요소가 0%, 25%, 50%, 75%, 100% 보일 때마다 감지
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    // 각 앵커를 관찰 대상에 추가
    anchors.forEach((anchor) => {
      observer.observe(anchor);
    });

    // 컴포넌트가 언마운트될 때 옵저버 연결 해제
    return () => {
      anchors.forEach((anchor) => {
        observer.unobserve(anchor);
      });
    };
  }, []);

  const [visibleAnimationRefs, addToVisibleAnimationRefs, refCount] = useElementRefs<HTMLDivElement>();
  useVisibleAnimation(visibleAnimationRefs, "start", refCount);

  return (
    <DefaultLayout>
      <CommonWrapper>
        <div className="header">
          <LockLaminatedIcon size={48} weight="bold" />
          <div>개인정보처리방침</div>
        </div>
        <ContentWrapper>
          <Card className="left-side visible-animation d1" ref={addToVisibleAnimationRefs}>
            <CardHeader className="header">
              <h2>목차</h2>
            </CardHeader>
            <CardBody className="body">
              {
                content.map((item) => (
                  <div key={item.id} className={"chapter" + (currentAnchors.has(item.id) ? " active" : "")}>
                    <a href={`#${item.id}`}>{item.title}</a>
                  </div>
                ))
              }
            </CardBody>
          </Card>
          <Divider
            orientation="vertical"
            style={{height: "initial"}}
          />
          <div className="content visible-animation d2" ref={addToVisibleAnimationRefs}>
            {
              content.map((item) => (
                <div id={item.id} className={"content-chapter"}>
                  <div className="header">{item.title}</div>
                  {item.content}
                </div>
              ))
            }
            <Spacer
              style={{ height: "50vh" }}
            />
          </div>
        </ContentWrapper>
      </CommonWrapper>
    </DefaultLayout>
  );
}

const ContentWrapper = styled.div`
  flex-grow: 1;
  width: 100%;
  margin-top: 1rem;

  display: flex;
  flex-direction: row;
  gap: 1rem;

  ol {
    list-style: decimal outside;
    padding-left: 1em;
  }

  ul {
    list-style: disc outside;
    padding-left: 1em;
  }

  & > .left-side {
    flex-grow: 1;
    flex-basis: 0;

    height: min-content;

    position: sticky;
    top: 6rem; /* 헤더 아래에 고정될 위치 */
    
    counter-reset: summary-counter -1;
    
    & > .header {
      padding: 1rem;
      
      word-break: keep-all;
      
      & > h2 {
        font-size: x-large;
        font-weight: bold;
      }
    }
    
    & > .body {
      //padding: 0 0 0.5rem 0;
      padding: 0 1rem 1rem 1rem;

      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      & > .chapter {
        counter-increment: summary-counter;
        padding-left: 1.8em;
        text-indent: -1.8em;  /* 텍스트를 왼쪽으로 이동 */
        word-break: keep-all;
        
        transition: color 0.3s ease-in-out;
        
        &::before {
          content: counter(summary-counter, decimal-leading-zero) ". ";
          font-variant-numeric: tabular-nums;
        }

        &.active {
          color: ${'hsl(var(--heroui-primary))'};
        }
      }
    }
    
  }

  & > .content {
    flex-grow: 3;
    flex-basis: 0;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    counter-reset: header-counter -1;

    & > .content-chapter {
      & > .header {
        font-size: x-large;
        font-weight: bold;

        counter-increment: header-counter;

        &::before {
          content: counter(header-counter, decimal-leading-zero) ". ";
          font-variant-numeric: tabular-nums;
        }
      }

      & > .content {
        margin-top: 0.5rem;
        
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .callout {
        margin-top: 0.5rem;

        & > .body {
          padding: 1rem;
          list-style-position: inside;
        }
        
        h3 {
          font-size: large;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
      }
    }
  }
`;