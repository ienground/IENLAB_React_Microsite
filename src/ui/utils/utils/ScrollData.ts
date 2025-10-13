import {useEffect, useRef, useState} from 'react';

const SCROLL_THRESHOLD = 5;
type ScrollDirection = 'up' | 'down' | null;

export function useScrollMonitor() {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // 1. 스크롤 이벤트 핸들러 정의
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const lastY = lastScrollY.current;

      console.log(currentScrollY);

      setScrollY(currentScrollY);

      if (currentScrollY <= 0) {
        lastScrollY.current = 0;
        setScrollDirection(null);
        return;
      }

      const newDirection = currentScrollY > lastY ? 'down' : 'up';

      if (newDirection === scrollDirection) {
        lastScrollY.current = currentScrollY;
        return;
      }

      if (Math.abs(currentScrollY - lastY) < SCROLL_THRESHOLD) {
        lastScrollY.current = currentScrollY;
        return;
      }

      setScrollDirection(newDirection);
      lastScrollY.current = currentScrollY;
    };

    // 2. window에 scroll 이벤트를 넣습니다.
    // { passive: true }를 사용하여 스크롤 성능을 최적화합니다.
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 3. 컴포넌트 언마운트 시 클린업 (이벤트 제거)
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

    // callback 함수가 변경될 때마다 이펙트를 다시 실행합니다.
  }, []);

  return { scrollY, scrollDirection };
}