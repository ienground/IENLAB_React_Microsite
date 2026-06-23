# 아이엔랩 ienlab 마이크로사이트

공식 마이크로사이트입니다. React 19 + TypeScript + Vite 기반으로 개발되었으며, Firebase를 백엔드로 사용합니다.

## 기술 스택

- **프레임워크:** React 19, TypeScript
- **빌드 도구:** Vite 8, SWC
- **스타일링:** Tailwind CSS v4, shadcn/ui, Radix UI, Base UI
- **백엔드:** Firebase (Auth, Firestore, Storage, Cloud Functions)
- **상태 관리:** Zustand, React Router v8
- **다국어:** i18next, react-i18next
- **애니메이션:** motion, motion-plus
- **테마:** next-themes (시스템/라이트/다크)

## 시작하기

```bash
# 의존성 설치
npm install

# 로컬 개발 서버 실행 (포트 5301)
npm run dev
```

## 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 로컬 개발 서버 실행 (Vite, 포트 5301) |
| `npm run build` | 타입스크립트 컴파일 + Vite 빌드 |
| `npm run preview` | 빌드 결과물 프리뷰 |
| `npm run lint` | ESLint 검사 |

## 주요 기능

- **회사 소개** — 회사/브랜드 소개, 프로젝트 포트폴리오, 공지사항
- **외주 관리 시스템** — 외주 CRUD, 정보 요청, 수정 요청, 작업 로그, 견적 관리
- **사용자 인증** — 이메일 로그인, 카카오 로그인, 네이버 로그인
- **다국어 지원** — 한국어, 영어
- **다크모드** — 시스템/라이트/다크 테마 지원
- **반응형 UI** — 모바일/태블릿/데스크톱 대응

## 페이지 구조

### 공개 영역
`/` — 홈, `/about` — 회사 소개, `/brand` — 브랜드 소개, `/notice` — 공지사항, `/project` — 프로젝트 포트폴리오, `/login` — 로그인, `/signup` — 회원가입

### 클라이언트 영역 (로그인 필요)
`/client/outsource` — 외주 관리, `/client/user` — 사용자 정보 수정

## 환경 변수

`.env` 파일에 Firebase 설정 등 환경 변수를 정의합니다.

## 배포

Firebase Hosting을 통해 배포됩니다. 빌드 후 `firebase deploy` 명령어로 배포할 수 있습니다.
