import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * 라우트 변경 시 페이지를 맨 위로 스크롤합니다.
 */
export function useScrollToTop() {
  // 현재 URL 경로 정보를 가져옵니다.
  const { pathname } = useLocation()

  useEffect(() => {
    // 페이지 이동 시 즉시 맨 위로 스크롤
    window.scrollTo(0, 0)
  }, [pathname]) // 💡 pathname을 의존성 배열에 넣어 URL 변경을 감지합니다.
}
