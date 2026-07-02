import {useEffect, useMemo, useState} from "react"
import {SectionHeader} from "@/components/custom/shared/SectionHeader.tsx"
import {useTranslation} from "react-i18next"
import {Separator} from "@/components/ui/separator.tsx"
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx"
import {
  RiApps2AiFill,
  RiCookieFill,
  RiFlowChart, RiInformationFill,
  RiShieldCheckFill,
  RiUser3Fill
} from "@remixicon/react"
import {cn} from "@/lib/utils.ts"
import { Seo } from "@ienlab/react-library"
import {hasLastConsonant} from "@ienlab/react-library"

export default function PrivacyScreen() {
  const { t } = useTranslation()
  return (
    <>
      <Seo
        title={`${t("strings:privacy_policy.label")} - ${t("strings:app_name")}`}
        description={t("strings:privacy_policy.desc")}
      />
      <ScreenBody />
    </>
  )
}

function ScreenBody() {
  const [activeId, setActiveId] = useState("")
  const { t } = useTranslation()

  const companyName = "아이엔랩"
  const connectWord = hasLastConsonant(companyName) ? "은" : "는"
  const connectWord2 = hasLastConsonant(companyName) ? "이" : "가"

  const summary = `${companyName}(이하 "회사")${connectWord} 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다. 이에 「개인정보 보호법」 제30조에 따라 정보주체에게 개인정보의 처리와 보호에 관한 절차 및 기준을 안내하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보 처리방침을 수립·공개합니다.`
  const content = useMemo(() => [
    {
      id: "service",
      label: "적용되는 서비스 범위",
      title: "어떤 서비스에 적용되나요?",
      content: (
        <div className="flex flex-col gap-y-4">
          <p>이 개인정보처리방침은 아이엔랩이 운영하는 서비스에 적용됩니다.</p>
          <Alert>
            <RiApps2AiFill />
            <AlertTitle>적용 서비스</AlertTitle>
            <AlertDescription>
              <ul className="custom-list list-inside">
                <li>아이엔랩 외주 관리</li>
                <li>아텍 미디어오피스</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      )
    },
    {
      id: "purpose",
      label: "개인정보 처리 목적",
      title: "내 정보를 어떤 용도로 사용하나요?",
      content: (
        <div className="flex flex-col gap-y-4">
          <p>회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 아래 목적 이외의 용도로 이용되지 않으며, 이용 목적이 변경되는 경우에는 관련 법령에 따라 필요한 조치를 이행합니다.</p>
          <Alert>
            <RiFlowChart />
            <AlertTitle>처리 목적</AlertTitle>
            <AlertDescription>
              <ul className="custom-list list-inside">
                <li>회원가입 의사 확인 및 관리자 승인</li>
                <li>회원 식별 및 본인 확인</li>
                <li>회원자격 유지 및 계정 관리</li>
                <li>외주 프로젝트 관련 커뮤니케이션</li>
                <li>견적 및 문의 응대</li>
                <li>수정 요청 접수 및 처리</li>
                <li>회사 요청 자료의 접수 및 관리</li>
                <li>서비스 운영, 보안, 접속 이력 및 이용 현황 관리</li>
                <li>이메일 발송 및 고객 응대</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      )
    },
    {
      id: "retention",
      label: "개인정보의 처리 및 보유 기간",
      title: "내 정보는 언제까지 보관되나요?",
      content: (
        <div className="flex flex-col gap-y-4">
          <p>회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시 동의받은 기간 내에서 개인정보를 처리·보유합니다.</p>
          <Alert>
            <RiFlowChart />
            <AlertTitle>보유 기간</AlertTitle>
            <AlertDescription>
              <ul className="custom-list list-inside">
                <li>회원가입 정보 및 계정 정보: 회원 탈퇴 시까지 보관</li>
                <li>탈퇴한 회원의 정보: 탈퇴 후 2년간 보관 후 파기</li>
                <li>서비스 이용 과정에서 생성된 정보: 처리 목적 달성 시까지 보관, 다만 관련 법령에 따라 별도 보관될 수 있음</li>
              </ul>
            </AlertDescription>
          </Alert>
          <p>다만, 관계 법령에 따라 보존할 필요가 있는 경우 해당 법령에서 정한 기간 동안 개인정보를 별도로 보관할 수 있습니다.</p>
          <Alert>
            <RiInformationFill />
            <AlertTitle>법령에 따른 보관</AlertTitle>
            <AlertDescription>
              <ul className="custom-list list-inside">
                <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
                <li>접속 로그 등 통신사실확인자료: 3개월</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      )
    },
    {
      id: "items",
      label: "처리하는 개인정보의 항목",
      title: "어떤 정보들을 수집하나요?",
      content: (
        <div className="flex flex-col gap-y-4">
          <p>회사는 다음의 개인정보 항목을 처리하고 있습니다.</p>
          <Alert>
            <RiUser3Fill />
            <AlertTitle>회원가입 및 계정 승인 시</AlertTitle>
            <AlertDescription>
              <ul className="custom-list list-inside">
                <li>필수항목: 이름, 회사 정보, 이메일, 휴대폰 번호, 프로필 이미지</li>
                <li>수집목적: 회원가입, 관리자 승인, 회원 식별, 계정 관리, 외주 관련 커뮤니케이션</li>
                <li>보유기간: 회원 탈퇴 시까지, 탈퇴 후 2년 보관 후 파기</li>
              </ul>
            </AlertDescription>
          </Alert>
          <Alert>
            <RiUser3Fill />
            <AlertTitle>소셜 로그인 이용 시</AlertTitle>
            <AlertDescription>
              <ul className="custom-list list-inside">
                <li>로그인 제공자: Google, 네이버, 카카오</li>
                <li>처리 항목: 로그인 제공자로부터 전달받는 식별 정보, 이메일, 프로필 정보 등 서비스 이용에 필요한 범위의 정보</li>
                <li>수집목적: 로그인 연동, 회원 식별 및 인증, 계정 관리</li>
                <li>보유기간: 회원 탈퇴 시까지, 탈퇴 후 2년 보관 후 파기</li>
              </ul>
            </AlertDescription>
          </Alert>
          <Alert>
            <RiUser3Fill />
            <AlertTitle>서비스 이용 과정에서 자동으로 생성·수집될 수 있는 항목</AlertTitle>
            <AlertDescription>
              <ul className="custom-list list-inside">
                <li>IP 주소</li>
                <li>쿠키</li>
                <li>서비스 이용 기록</li>
                <li>접속 기록</li>
                <li>기기 정보</li>
                <li>브라우저 및 OS 정보</li>
                <li>불량 이용 기록</li>
              </ul>
            </AlertDescription>
          </Alert>
          <Alert>
            <RiUser3Fill />
            <AlertTitle>업무 진행 과정에서 처리될 수 있는 정보</AlertTitle>
            <AlertDescription>
              <ul className="custom-list list-inside">
                <li>수정 요청 정보</li>
                <li>문의 및 응대 이력</li>
                <li>회사가 요청한 자료 및 첨부 파일</li>
                <li>업무 진행 및 커뮤니케이션 이력</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      )
    },
    {
      id: "third-party-provision",
      label: "개인정보의 제3자 제공",
      title: "내 정보를 다른 곳에 넘기기도 하나요?",
      content: (
        <div className="flex flex-col gap-y-4">
          <p>회사는 정보주체의 개인정보를 원칙적으로 제3자에게 제공하지 않습니다. 다만, 정보주체의 별도 동의가 있거나 법령에 특별한 규정이 있는 경우에는 예외적으로 제공될 수 있습니다.</p>
        </div>
      )
    },
    {
      id: "outsourcing",
      label: "개인정보 처리업무의 위탁",
      title: "외부 업체에 처리를 맡기기도 하나요?",
      content: (
        <div className="flex flex-col gap-y-4">
          <p>회사는 원활한 서비스 제공을 위하여 일부 개인정보 처리업무를 외부 서비스 제공자에게 위탁하거나 해당 서비스를 이용할 수 있습니다.</p>
          <Alert>
            <RiInformationFill />
            <AlertTitle>주요 외부 서비스</AlertTitle>
            <AlertDescription>
              <ul className="custom-list list-inside">
                <li>Google Firebase Authentication: 회원 인증 및 로그인 처리</li>
                <li>Google Firebase Firestore: 서비스 데이터 저장 및 관리</li>
                <li>Google Firebase Storage: 파일 저장</li>
                <li>Google Firebase Functions: 서버 기능 처리</li>
                <li>이메일 발송 서비스: 서비스 안내, 문의 응답, 업무 관련 메일 발송</li>
              </ul>
            </AlertDescription>
          </Alert>
          <p>회사는 관련 법령에 따라 위탁계약 체결 시 개인정보 보호에 필요한 사항을 문서로 정하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독합니다.</p>
        </div>
      )
    },
    {
      id: "international-transfer",
      label: "개인정보의 국외 이전",
      title: "내 정보가 해외로 전송되기도 하나요?",
      content: (
        <div className="flex flex-col gap-y-4">
          <p>회사는 Firebase 등 해외 클라우드 서비스 이용에 따라 개인정보가 국외에서 저장되거나 처리될 수 있습니다.</p>
          <p>국외 이전이 발생하는 경우 회사는 관련 법령 및 작성지침에 따라 이전되는 개인정보 항목, 이전 국가, 이전 시기와 방법, 이전받는 자, 이용 목적, 보유 및 이용 기간, 이전 거부 방법 및 그 효과 등을 공개합니다.</p>
        </div>
      )
    },
    {
      id: "delete-how",
      label: "개인정보의 파기 절차 및 방법",
      title: "목적이 끝난 정보는 어떻게 지우나요?",
      content: (
        <div className="flex flex-col gap-y-4">
          <p>회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.</p>
          <p>다만 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.</p>
          <Alert>
            <RiInformationFill />
            <AlertTitle>파기 절차 및 방법</AlertTitle>
            <AlertDescription>
              <ul className="custom-list list-inside">
                <li>파기절차: 파기 사유가 발생한 개인정보를 선정하고, 내부 기준에 따라 파기합니다.</li>
                <li>파기방법: 전자적 파일 형태는 복구 또는 재생이 불가능한 방법으로 삭제하며, 종이 문서는 분쇄 또는 소각합니다.</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      )
    },
    {
      id: "rights",
      label: "정보주체의 권리·의무 및 행사방법",
      title: "내 정보에 대해 어떤 권리를 요구할 수 있나요?",
      content: (
        <div className="flex flex-col gap-y-4">
          <p>정보주체는 회사에 대해 언제든지 개인정보 열람, 정정, 삭제, 처리정지, 동의 철회 등을 요구할 수 있습니다.</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>권리 행사는 서면, 전자우편 등을 통하여 하실 수 있으며 회사는 지체 없이 조치합니다.</li>
            <li>권리 행사는 법정대리인 또는 위임을 받은 대리인을 통하여 할 수 있습니다.</li>
            <li>회사는 권리 행사를 요청한 자가 본인 또는 정당한 대리인인지 확인할 수 있습니다.</li>
            <li>다른 법령에서 그 개인정보가 수집 대상으로 명시된 경우에는 삭제 요구가 제한될 수 있습니다.</li>
          </ol>
        </div>
      )
    },
    {
      id: "security",
      label: "개인정보의 안전성 확보조치",
      title: "내 정보를 안전하게 지키기 위해 무엇을 하나요?",
      content: (
        <div className="flex flex-col gap-y-4">
          <p>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>개인정보 보호를 위한 내부관리계획 수립 및 시행</li>
            <li>개인정보 접근 권한 관리 및 접근 통제</li>
            <li>개인정보의 저장 및 전송 시 보호조치 적용</li>
            <li>암호화가 필요한 자료의 암호화 업로드 처리</li>
            <li>보안 점검 및 접속 기록 관리</li>
          </ol>
        </div>
      )
    },
    {
      id: "cookies",
      label: "자동 수집 장치의 설치·운영 및 거부",
      title: "쿠키(Cookie)가 무엇이고, 어떻게 거부하나요?",
      content: (
        <div className="flex flex-col gap-y-4">
          <p>회사는 이용자에게 보다 편리한 서비스를 제공하기 위해 쿠키를 사용할 수 있습니다.</p>
          <Alert>
            <RiCookieFill />
            <AlertTitle>쿠키 안내</AlertTitle>
            <AlertDescription>
              <ul className="custom-list list-inside">
                <li>사용 목적: 로그인 상태 유지, 보안 확인, 서비스 이용 현황 분석, 이용자 편의 제공</li>
                <li>거부 방법: 이용자는 웹 브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다.</li>
                <li>거부 효과: 쿠키 저장을 거부할 경우 일부 로그인 또는 맞춤형 기능 이용이 제한될 수 있습니다.</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      )
    },
    {
      id: "behavioral-info",
      label: "행태정보의 수집·이용·제공 및 거부",
      title: "맞춤형 광고를 위해 행동 데이터를 수집하나요?",
      content: (
        <div className="flex flex-col gap-y-4">
          <p>회사는 온라인 맞춤형 광고를 위한 행태정보를 수집·이용·제공하지 않습니다.</p>
        </div>
      )
    },
    {
      id: "additional-use",
      label: "추가적인 이용·제공 판단기준",
      title: "동의 없이 정보를 더 사용할 수 있는 기준은 무엇인가요?",
      content: (
        <div className="flex flex-col gap-y-4">
          <p>회사는 관련 법령에 따라 정보주체의 동의 없이 개인정보를 추가적으로 이용·제공하는 경우, 당초 수집 목적과의 관련성, 정보주체의 예측 가능성, 정보주체의 이익 침해 여부, 안전성 확보 조치 여부 등을 종합적으로 고려합니다.</p>
        </div>
      )
    },
    {
      id: "adult-only",
      label: "성인 대상 서비스",
      title: "누가 가입할 수 있나요?",
      content: (
        <div className="flex flex-col gap-y-4">
          <p>아이엔랩 외주 관리는 성인을 대상으로 제공되는 서비스입니다.</p>
          <p>회사는 만 19세 미만을 대상으로 회원가입을 받지 않습니다.</p>
        </div>
      )
    },
    {
      id: "privacy-officer",
      label: "개인정보 보호책임자에 관한 사항",
      title: "개인정보 관련 문의는 어디로 하면 되나요?",
      content: (
        <div className="flex flex-col gap-y-4">
          <p>회사는 개인정보 처리에 관한 업무를 총괄하고 개인정보 관련 문의를 처리하기 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
          <Alert>
            <RiShieldCheckFill />
            <AlertTitle>개인정보 보호책임자</AlertTitle>
            <AlertDescription>
              <ul className="custom-list list-inside">
                <li>성명: 이현우</li>
                <li>직책: 대표</li>
                <li>연락처: my@ien.zone</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      )
    },
    {
      id: "access-request",
      label: "개인정보 열람청구 접수·처리",
      title: "내 정보를 직접 확인하고 싶을 땐 어디로 연락하나요?",
      content: (
        <div className="flex flex-col gap-y-4">
          <p>정보주체는 개인정보 열람청구를 아래 연락처로 신청할 수 있으며, 회사는 신속하게 처리하도록 노력합니다.</p>
          <Alert>
            <RiShieldCheckFill />
            <AlertTitle>열람청구 접수처</AlertTitle>
            <AlertDescription>
              <ul className="custom-list list-inside">
                <li>담당자: 이현우</li>
                <li>연락처: my@ien.zone</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      )
    },
    {
      id: "remedy",
      label: "정보주체의 권익침해 구제방법",
      title: "피해가 발생했을 때 도움받을 수 있는 기관이 있나요?",
      content: (
        <div className="flex flex-col gap-y-4">
          <p>정보주체는 개인정보침해로 인한 구제를 받기 위하여 아래 기관에 상담 또는 분쟁조정을 신청할 수 있습니다.</p>
          <Alert>
            <RiInformationFill />
            <AlertTitle>관련 기관 안내</AlertTitle>
            <AlertDescription>
              <ul className="custom-list list-inside">
                <li>개인정보분쟁조정위원회: (국번없이) 1833-6972 (www.kopico.go.kr)</li>
                <li>개인정보침해신고센터: (국번없이) 118 (privacy.kisa.or.kr)</li>
                <li>대검찰청: (국번없이) 1301 (www.spo.go.kr)</li>
                <li>경찰청: (국번없이) 182 (ecrm.cyber.go.kr)</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      )
    },
    {
      id: "changes",
      label: "개인정보처리방침 변경",
      title: "이 방침은 언제부터 적용되고 어떻게 바뀌나요?",
      content: (
        <div className="flex flex-col gap-y-4">
          <p>이 개인정보처리방침은 2026년 6월 24일부터 적용됩니다.</p>
          <p>회사는 관련 법령, 서비스 내용 또는 개인정보 처리 내용의 변경이 있는 경우 이를 반영하여 개인정보처리방침을 수정할 수 있으며, 중요한 변경사항은 적용 전에 공지합니다.</p>
        </div>
      )
    }
  ], [t])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }, {
        // 화면 상단에서 20%~80% 사이에 위치할 때 감지
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    )

    // 각 섹션 요소들을 옵저버에 등록
    content.forEach(item => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="w-full flex flex-col">
      <div className="px-4 sm:px-6 md:px-8"><Separator className="bg-foreground" /></div>

      <div className="site-section-tight site-grid">
        <aside className="col-span-12 xl:col-span-2">
          <SectionHeader index={0} label={t("strings:privacy_policy.label")} />
        </aside>
        <div className="col-span-12 xl:col-span-10">
          <h1 className="large-text-title">{t("strings:privacy_policy.label")}</h1>
          <p className="content-description mt-16 md:mt-24 xl:mt-32">{summary}</p>
        </div>
      </div>
      <div className="grid w-full grid-cols-12 gap-y-10 px-4 sm:px-6 md:px-8 max-xl:flex max-xl:row">
        <aside className="h-fit sticky top-16 md:top-24 col-span-2 flex flex-row gap-x-4 max-xl:hidden">
          <Separator orientation="vertical" className="bg-foreground" />
          <div className="flex flex-col gap-y-2">
            {content.map((item, index) => (
              <SectionHeader
                index={index + 1} label={item.label}
                className={cn(
                  "cursor-pointer",
                  item.id === activeId ? "text-foreground" : "text-muted-foreground"
                )}
                onClick={() => scrollToSection(item.id)}
              />
            ))}
          </div>
        </aside>

        <main className="flex-1 col-span-10 flex flex-col">
          <Separator className="bg-foreground" />
          <div className="flex flex-col gap-y-16">
            {content.map((item, index) => (
              <div
                key={item.id}
                id={item.id}
                className="grid grid-cols-9 gap-x-4 max-md:flex max-md:flex-col scroll-mt-16 md:scroll-mt-24"
              >
                <div
                  className="col-span-2"
                ><SectionHeader index={index + 1} label={item.label} className="py-4" /></div>
                <div
                  className="col-span-7"
                >
                  <h2 className={cn(
                    "py-2 text-[48px] font-medium tracking-tighter break-keep",
                    "max-md:text-[36px]"
                  )}>{item.title}</h2>
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </main>
        <div className="h-4" />
      </div>
    </div>
  )
}
