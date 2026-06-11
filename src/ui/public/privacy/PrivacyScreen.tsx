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
      content: <div className="flex flex-col gap-y-4">
        <p>이 개인정보처리방침은 회사가 운영하는 모든 서비스에 적용됩니다.</p>
        <Alert>
          <RiApps2AiFill />
          <AlertTitle>서비스</AlertTitle>
          <AlertDescription>
            <ul className="custom-list list-inside">
              <li>아이엔랩 외주 고객 관리 웹사이트</li>
              <li>아텍 미디어오피스</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    },
    {
      id: "purpose",
      label: "개인정보 처리 목적",
      title: "내 정보를 어떤 용도로 사용하나요?",
      content: <div className="flex flex-col gap-y-4">
        <p>회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
        <Alert>
          <RiFlowChart />
          <AlertTitle>개인정보 처리 목적</AlertTitle>
          <AlertDescription>
            <ul className="custom-list list-inside">
              <li>고객 가입 의사 확인</li>
              <li>고객에 대한 서비스 제공에 따른 본인 식별 및 인증</li>
              <li>회원자격 유지 및 관리</li>
              <li>서비스 제공 및 운영</li>
              <li>외주 프로젝트 관리</li>
              <li>추가 기능 요청 접수 및 처리</li>
              <li>고객 문의 대응</li>
              <li>물품 또는 서비스 공급에 따른 금액 결제</li>
              <li>물품 또는 서비스의 공급 및 배송</li>
              <li>접속 이력 및 서비스 이용 현황 관리</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    },
    {
      id: "process-date",
      label: "개인정보의 처리 및 보유 시간",
      title: "내 정보는 언제까지 보관되나요?",
      content: <div className="flex flex-col gap-y-4">
        <p>회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
        <Alert>
          <RiFlowChart />
          <AlertTitle>개인정보 처리 목적</AlertTitle>
          <AlertDescription>
            <ul className="custom-list list-inside">
              <li>Google 로그인 회원정보: 회원 탈퇴 또는 동의 철회 시 지체 없이 파기</li>
              <li>카카오 로그인 회원정보: 회원 탈퇴 또는 동의 철회 시 지체 없이 파기</li>
              <li>외주 고객 관리 웹사이트 회원정보: 회원 탈퇴 시까지 보관 후 지체 없이 파기</li>
              <li>서비스 이용 과정에서 생성된 정보: 서비스 제공 기간 동안 보관 후 목적 달성 시 지체 없이 파기</li>
            </ul>
          </AlertDescription>
        </Alert>
        <p>다만, 관계 법령에 따라 보존할 필요가 있는 경우 해당 법령에서 정한 기간 동안 개인정보를 별도로 보관할 수 있습니다.</p>
        <Alert>
          <RiFlowChart />
          <AlertTitle>개인정보 처리 목적</AlertTitle>
          <AlertDescription>
            <ul className="custom-list list-inside">
              <li>계약 또는 청약철회, 대금결제, 재화 등의 공급기록: 5년</li>
              <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
              <li>접속 로그 등 통신사실확인자료: 3개월</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    },
    {
      id: "content-detail",
      label: "처리하는 개인정보의 항목",
      title: "어떤 정보들을 수집하나요?",
      content: (
        <div className="flex flex-col gap-y-4">
          <p>회사는 다음의 개인정보 항목을 처리하고 있습니다.</p>
          <Alert>
            <RiUser3Fill />
            <AlertTitle>Google 로그인 이용 시</AlertTitle>
            <AlertDescription>
              <ul className="custom-list list-inside">
                <li>필수항목: 프로필 정보(닉네임, 프로필 사진), Google 계정(이메일)</li>
                <li>선택항목: 생일, 출생연도</li>
                <li>수집목적: 서비스 이용, 회원 식별 및 인증, 회원 관리</li>
                <li>보유기간: 회원 탈퇴 또는 동의 철회 시 지체 없이 파기</li>
              </ul>
            </AlertDescription>
          </Alert>
          <Alert>
            <RiUser3Fill />
            <AlertTitle>카카오 로그인 이용 시</AlertTitle>
            <AlertDescription>
              <ul className="custom-list list-inside">
                <li>필수항목: 프로필 정보(닉네임, 프로필 사진), 카카오 계정(이메일)</li>
                <li>선택항목: 생일</li>
                <li>수집목적: 서비스 이용, 회원 식별 및 인증, 회원 관리</li>
                <li>보유기간: 회원 탈퇴 또는 동의 철회 시 지체 없이 파기</li>
              </ul>
            </AlertDescription>
          </Alert>
          <Alert>
            <RiUser3Fill />
            <AlertTitle>외주 고객 관리 웹사이트 회원가입 시</AlertTitle>
            <AlertDescription>
              <ul className="custom-list list-inside">
                <li>필수항목: 이름, 이메일, 휴대전화번호</li>
                <li>서비스 이용 과정에서 생성·수집되는 항목: 회원 ID, 회사 참조값, 회원 등급, 회원 상태, 생성 시각, 수정 시각, 삭제 시각, 최근 방문 시각</li>
                <li>수집목적: 외주 고객 회원가입 및 계정 관리, 외주 프로젝트 관리, 추가 기능 요청 접수 및 처리, 고객사 담당자 식별 및 커뮤니케이션, 서비스 접속 기록 및 운영 이력 관리</li>
                <li>보유기간: 회원 탈퇴 시까지. 단, 관련 법령에 따라 보존이 필요한 경우 해당 기간 동안 별도 보관</li>
              </ul>
            </AlertDescription>
          </Alert>
          <Alert>
            <RiUser3Fill />
            <AlertTitle>서비스 이용 과정에서 자동으로 생성·수집될 수 있는 항목</AlertTitle>
            <AlertDescription>
              <ul className="custom-list list-inside">
                <li>접속 IP 주소</li>
                <li>쿠키</li>
                <li>서비스 이용 기록</li>
                <li>방문 기록</li>
                <li>불량 이용 기록</li>
                <li>기기 정보</li>
                <li>OS 버전</li>
                <li>앱 버전</li>
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
          <p>회사는 정보주체의 개인정보를 제3자에게 제공하지 않습니다. 다만, 법령에 특별한 규정이 있거나 정보주체의 별도 동의가 있는 경우에는 예외적으로 제공될 수 있습니다.</p>
        </div>
      )
    },
    {
      id: "outsourcing",
      label: "개인정보 처리업무의 위탁",
      title: "외부 업체에 처리를 맡기기도 하나요?",
      content: (
        <div className="flex flex-col gap-y-4">
          <p>회사는 원활한 서비스 제공을 위해 일부 개인정보 처리업무를 외부에 위탁할 수 있습니다.</p>
          <p>위탁계약 체결 시 「개인정보 보호법」 제26조에 따라 위탁업무 수행 목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.</p>
          <p>위탁업무의 내용이나 수탁자가 변경될 경우에는 지체 없이 이 개인정보처리방침을 통하여 공개합니다.</p>
        </div>
      )
    },
    {
      id: "international-transfer",
      label: "개인정보의 국외 이전",
      title: "내 정보가 해외로 전송되기도 하나요?",
      content: (
        <div className="flex flex-col gap-y-4">
          <p>회사는 서비스 제공을 위해 국외의 클라우드 서비스 또는 인증 서비스 등을 이용할 수 있습니다.</p>
          <p>실제 국외 이전이 발생하는 경우 회사는 관련 법령과 작성지침에 따라 국외이전의 법적 근거, 이전되는 개인정보 항목, 이전 국가, 시기 및 방법, 이전받는 자, 이용 목적, 보유 및 이용 기간, 이전 거부 방법 및 그 효과 등을 공개합니다.</p>
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
          <p>정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.</p>
          <Alert>
            <RiInformationFill />
            <AlertTitle>파기 절차 및 방법</AlertTitle>
            <AlertDescription>
              <ul className="custom-list list-inside">
                <li>파기절차: 회사는 파기 사유가 발생한 개인정보를 선정하고, 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.</li>
                <li>파기방법: 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하며, 종이 문서에 기록된 개인정보는 분쇄하거나 소각합니다.</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      )
    },
    {
      id: "rights",
      label: "정보주체와 법정대리인의 권리·의무",
      title: "내 정보에 대해 어떤 권리를 요구할 수 있나요?",
      content: (
        <div className="flex flex-col gap-y-4">
          <p>정보주체와 법정대리인은 다음과 같은 권리·의무를 행사할 수 있습니다.</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.</li>
            <li>제1항에 따른 권리 행사는 회사에 대해 「개인정보 보호법」 시행령 제41조 제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체 없이 조치하겠습니다.</li>
            <li>제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 「개인정보 처리 방법에 관한 고시(제2020-7호)」 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.</li>
            <li>개인정보 열람 및 처리정지 요구는 「개인정보보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한될 수 있습니다.</li>
            <li>개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.</li>
            <li>회사는 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.</li>
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
            <li>내부관리 계획의 수립 및 시행: 개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.</li>
            <li>개인정보에 대한 접근 제한: 개인정보를 처리하는 데이터베이스 시스템에 대한 접근권한의 부여, 변경, 말소를 통하여 접근통제를 위한 필요한 조치를 하고 있으며, 침입차단 시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.</li>
            <li>비인가자에 대한 출입 통제: 개인정보를 보관하고 있는 물리적 보관 장소를 별도로 두고 출입통제 절차를 수립·운영하고 있습니다.</li>
            <li>개인정보의 암호화: 개인정보는 저장 및 전송 시 암호화 등 보호조치를 적용할 수 있습니다.</li>
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
          <p>회사는 이용자에게 개별적인 맞춤 서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 쿠키(cookie)를 사용할 수 있습니다.</p>
          <p>쿠키는 웹사이트를 운영하는 데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자의 PC 또는 모바일 기기에 저장될 수 있습니다.</p>
          <Alert>
            <RiCookieFill />
            <AlertTitle>쿠키 안내</AlertTitle>
            <AlertDescription>
              <ul className="custom-list list-inside">
                <li>쿠키의 사용 목적: 이용자가 방문한 각 서비스와 웹사이트에 대한 방문 및 이용형태 파악, 보안접속 여부 확인, 이용자에게 최적화된 정보 제공</li>
                <li>쿠키의 설치·운영 및 거부: 이용자는 웹 브라우저 설정을 통하여 쿠키 저장을 거부할 수 있습니다. 다만 브라우저별 설정 방법은 다를 수 있습니다.</li>
                <li>쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.</li>
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
          <p>회사는 온라인 맞춤형 광고 등을 위한 행태정보를 수집·이용·제공하지 않습니다.</p>
        </div>
      )
    },
    {
      id: "additional-use",
      label: "추가적인 이용·제공 판단기준",
      title: "동의 없이 정보를 더 사용할 수 있는 기준은 무엇인가요?",
      content: (
        <div className="flex flex-col gap-y-4">
          <p>회사는 「개인정보보호법」 제15조 제3항 및 제17조 제4항에 따라 「개인정보 보호법 시행령」 제14조의2에 따른 사항을 고려하여 정보주체의 동의 없이 개인정보를 추가적으로 이용·제공할 수 있습니다.</p>
          <Alert>
            <RiFlowChart />
            <AlertTitle>판단 기준</AlertTitle>
            <AlertDescription>
              <ul className="custom-list list-inside">
                <li>개인정보를 추가적으로 이용·제공하려는 목적이 당초 수집 목적과 관련성이 있는지 여부</li>
                <li>개인정보를 수집한 정황 또는 처리 관행에 비추어 볼 때 추가적인 이용·제공에 대한 예측 가능성이 있는지 여부</li>
                <li>개인정보의 추가적인 이용·제공이 정보주체의 이익을 부당하게 침해하는지 여부</li>
                <li>가명처리 또는 암호화 등 안전성 확보에 필요한 조치를 하였는지 여부</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      )
    },
    {
      id: "privacy-officer",
      label: "개인정보 보호책임자에 관한 사항",
      title: "개인정보 관련 문의는 어디로 하면 되나요?",
      content: (
        <div className="flex flex-col gap-y-4">
          <p>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
          <Alert>
            <RiShieldCheckFill />
            <AlertTitle>개인정보 보호책임자</AlertTitle>
            <AlertDescription>
              <ul className="custom-list list-inside">
                <li>성명: 이현우</li>
                <li>직책: 대표 개발자</li>
                <li>직급: 대표</li>
                <li>연락처: my@ien.zone</li>
              </ul>
            </AlertDescription>
          </Alert>
          <p>정보주체께서는 회사의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있으며 회사는 이에 대해 지체 없이 답변 및 처리해드리겠습니다.</p>
        </div>
      )
    },
    {
      id: "access-request",
      label: "개인정보의 열람청구를 접수·처리 부서",
      title: "내 정보를 직접 확인하고 싶을 땐 어디로 연락하나요?",
      content: (
        <div className="flex flex-col gap-y-4">
          <p>정보주체는 「개인정보보호법」 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있습니다. 회사는 정보주체의 개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다.</p>
          <Alert>
            <RiShieldCheckFill />
            <AlertTitle>개인정보 열람청구 접수·처리 부서</AlertTitle>
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
      label: "정보주체의 권익침해에 대한 구제방법",
      title: "피해가 발생했을 때 도움받을 수 있는 기관이 있나요?",
      content: (
        <div className="flex flex-col gap-y-4">
          <p>정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다.</p>
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
          <p>또한 「개인정보보호법」 제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.</p>
          <p>행정심판에 대해 자세한 사항은 중앙행정심판위원회(www.simpan.go.kr) 홈페이지를 참고하시기 바랍니다.</p>
        </div>
      )
    },
    {
      id: "changes",
      label: "개인정보처리방침 변경",
      title: "이 방침은 언제부터 적용되고 어떻게 바뀌나요?",
      content: (
        <div className="flex flex-col gap-y-4">
          <p>이 개인정보처리방침은 2026년 6월 1일부터 적용됩니다.</p>
          <p>회사는 관련 법령, 서비스 내용 또는 개인정보 처리 내용의 변경이 있는 경우 이를 반영하여 개인정보처리방침을 수정할 수 있으며, 변경사항은 적용 전에 공지합니다.</p>
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
      <div className="px-8"><Separator className="bg-foreground" /></div>

      <div className="w-full grid grid-cols-12 gap-y-10 xl:gap-x-10 p-8">
        <aside className="col-span-12 xl:col-span-2">
          <SectionHeader index={0} label={t("strings:privacy_policy.label")} />
        </aside>
        <div className="col-span-12 xl:col-span-10">
          <div className="large-text-title">{t("strings:privacy_policy.label")}</div>
          <p className="mt-32">{summary}</p>
        </div>
      </div>
      <div className="w-full px-8 grid grid-cols-12 gap-y-10 max-xl:flex max-xl:row">
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
                    "text-[48px] font-medium tracking-[-0.06em] py-2 break-keep",
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