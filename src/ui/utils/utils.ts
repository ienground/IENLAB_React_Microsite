import {type RefObject, useEffect, useRef, useState} from "react";
import { Firestore, QueryDocumentSnapshot, DocumentSnapshot, query, collection, where, documentId, getDocs, type DocumentData } from "firebase/firestore";

export const mapRange = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
  return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
};

export function useDarkmode() {
  const [isDarkmode, setDarkmode] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDarkmode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return isDarkmode;
}

interface Item {
  id: string;
}

export async function fetchItems<T extends Item>(firestore: Firestore, colName: string, changeMethod: ((snapshot: QueryDocumentSnapshot | DocumentSnapshot) => T), cache: Map<string, T>, ids: string[]) {
  const cached: T[] = ids
    .map(id => cache.get(id))
    // 💡 변경된 부분: 명시적인 item !== undefined 대신 Boolean 필터 사용
    .filter(Boolean) as T[];

  const cachedIds = new Set(cached.map(item => item.id));
  const missingIds = ids.filter(id => !cachedIds.has(id));

  const chunkSize = 30;
  for (let i = 0; i < missingIds.length; i += chunkSize) {
    const chunk = missingIds.slice(i, i + chunkSize);
    console.log("chunk", chunk);
    const q = query(
      collection(firestore, colName),
      where(documentId(), "in", chunk)
    );

    const docs = await getDocs(q);
    docs.forEach(snapshot => {
      const item = changeMethod(snapshot as QueryDocumentSnapshot);

      // 3. 💡 인자로 받은 'cache' 객체에 직접 추가합니다.
      cache.set(item.id, item);
    })
  }


  // const cached = ids.map(id => cache.get(id)).filter(item => item !== undefined);
  // const cachedIds = new Set(cached.map(item => item.id));
  // const missingIds = ids.filter(id => !cachedIds.has(id));
  // const result = new Map<string, T>();
  // cached.forEach(item => result.set(item.id, item));
  //
  // const chunkSize = 30;
  // for (let i = 0; i < missingIds.length; i += chunkSize) {
  //   const chunk = missingIds.slice(i, i + chunkSize);
  //   const q = query(
  //     collection(firestore, colName),
  //     where(documentId(), "in", chunk)
  //   );
  //
  //   const docs = await getDocs(q);
  //   docs.forEach(snapshot => {
  //     const item = changeMethod(snapshot);
  //     result.set(item.id, item);
  //   })
  // }
  //
  // return result;
}

export function snapshotToData(snapshot: QueryDocumentSnapshot | DocumentSnapshot): DocumentData {
  if (snapshot instanceof QueryDocumentSnapshot) {
    return {...snapshot.data(), id: snapshot.id};
  } else {
    return {...snapshot.data(), id: snapshot.id};
  }
}
export const getValueAsString = (value: FormDataEntryValue | FormDataEntryValue[]): string => {
  if (Array.isArray(value)) {
    // 배열인 경우 첫 번째 값을 가져오거나, 적절하게 처리
    return String(value[0] || "");
  }
  return String(value); // String()으로 문자열로 변환
};

// export const IconWrapper = ({children, className}) => (
//   <div className={cn(className, "flex items-center rounded-small justify-center w-7 h-7")}>
// {children}
// </div>
// );

export function getCompleteWord(word: string, firstValue: string, secondValue: string) {
  const lastName = word[word.length - 1].charCodeAt(0);
  if (lastName < 0xAC00 || lastName > 0xD7A3) {
    return "";
  } else {
    if ((lastName - 0xAC00) % 28 > 0) {
      return firstValue;
    } else {
      return secondValue;
    }
  }
}

export function useElementRefs<T extends Element>(): [RefObject<T[]>, (el: T | null) => void, number] {
  const elementsRef = useRef<T[]>([]);
  const [trigger, setTrigger] = useState(0);

  const setRef = (el: T | null) => {
    // ⭐️ 새로운 요소가 배열에 포함되지 않은 경우에만 로직 실행
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
      setTrigger(prev => prev + 1); // ⭐️ 올바른 위치
    }
    // 요소가 DOM에서 제거될 때 처리 (선택사항)
    if (!el && elementsRef.current.length > 0) {
      elementsRef.current = elementsRef.current.filter(item => item !== el);
      // setTrigger(prev => prev + 1); // 제거 시에도 트리거할 경우
    }
  };

  return [elementsRef, setRef, trigger];
}

export function useVisibleAnimation(items: RefObject<Element[]>, addTokens: string, trigger: number) {
  useEffect(() => {
    // 1. Ref 객체에서 실제 DOM 요소 배열을 가져옵니다.
    const visibleAnimations = items.current;

    console.log(visibleAnimations);

    // items.current에 요소가 없으면 실행하지 않습니다.
    if (visibleAnimations.length === 0) {
      return;
    }

    // 2. Intersection Observer 객체를 생성합니다.
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(addTokens);
          observer.unobserve(entry.target);
        }
      });
    });

    // 3. 각 요소를 순회하며 초기 상태와 스크롤 시 상태를 처리합니다.
    visibleAnimations.forEach(item => {
      if (!item) return; // 요소가 유효한지 확인

      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        item.classList.add(addTokens);
      } else {
        observer.observe(item);
      }
    });

    // useEffect 클린업 함수: 컴포넌트 언마운트 시 옵저버 해제
    return () => {
      observer.disconnect();
    };
  }, [items, addTokens, trigger]);
}