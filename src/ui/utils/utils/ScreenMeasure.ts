import {useCallback, useEffect, useState} from "react";

type ComparisonSymbol = "<" | "<=" | ">" | ">=";

export function useScreenMeasure(symbol: ComparisonSymbol, breakpoint: number) {
  const calculateInitialState = useCallback((initialWidth: number) => {
    switch (symbol) {
      case "<":
        return initialWidth < breakpoint;
      case "<=":
        return initialWidth <= breakpoint;
      case ">":
        return initialWidth > breakpoint;
      case ">=":
        return initialWidth >= breakpoint;
      default:
        // TypeScript가 모든 케이스를 잡으므로, default는 방어 코드입니다.
        return false;
    }
  }, [breakpoint, symbol]);

  const [get, set] = useState(calculateInitialState(window.innerWidth));

  useEffect(() => {
    // 렌더링 시점에 window 객체가 존재하는지 확인
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      set(calculateInitialState(window.innerWidth));
    };

    // 초기값 설정
    handleResize();

    // 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint, calculateInitialState]);

  return get;
}