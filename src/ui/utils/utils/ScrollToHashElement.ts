import { useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';

export default function ScrollToHashElement() {
  const location = useLocation();

  useLayoutEffect(() => {
    // 1. URL의 해시값 (예: #contact-info)을 가져옵니다.
    const hash = location.hash;

    // 2. 해시값이 없으면 (일반적인 페이지 이동) 종료합니다.
    if (!hash) {
      // 해시가 없다면 맨 위로 스크롤 (이전 질문에서 구현한 내용)
      window.scrollTo(0, 0);
      return;
    }

    console.log("hash", hash);

    // 3. 해시값과 일치하는 ID를 가진 DOM 요소를 찾습니다.
    const element = document.getElementById(hash.substring(1)); // '#' 제거

    console.log("element", element);

    // 4. 요소가 존재하면 스크롤합니다.
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth', // 부드러운 스크롤 효과
        block: 'start'      // 요소의 시작 지점을 뷰포트 상단에 맞춥니다.
      });
    }
  }, [location.pathname, location.hash]); // pathname과 hash가 변경될 때마다 실행

  return null; // 이 컴포넌트는 UI를 렌더링하지 않습니다.
}