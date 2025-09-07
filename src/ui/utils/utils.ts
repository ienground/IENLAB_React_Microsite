import {useEffect, useState} from "react";
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

export async function fetchItems<T extends Item>(firestore: Firestore, colName: string, changeMethod: ((snapshot: QueryDocumentSnapshot | DocumentSnapshot) => T), cache: Map<string, T>, setCache: React.Dispatch<React.SetStateAction<Map<string, T>>>, ids: string[]) {
  const cached = ids.map(id => cache.get(id)).filter(item => item !== undefined);
  const cachedIds = new Set(cached.map(item => item.id));
  const missingIds = ids.filter(id => !cachedIds.has(id));
  const result = new Map<string, T>();
  cached.forEach(item => result.set(item.id, item));

  const chunkSize = 30;
  for (let i = 0; i < missingIds.length; i += chunkSize) {
    const chunk = missingIds.slice(i, i + chunkSize);
    const q = query(
      collection(firestore, colName),
      where(documentId(), "in", chunk)
    );

    const docs = await getDocs(q);
    docs.forEach(snapshot => {
      const item = changeMethod(snapshot);
      setCache((prev) => { return prev.set(item.id, item); })
      result.set(item.id, item);
    })
  }

  return result;
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