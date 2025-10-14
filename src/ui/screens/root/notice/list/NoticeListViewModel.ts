import {create} from "zustand/react";
import {collection, onSnapshot, query, where, orderBy} from "firebase/firestore";
import {fbFirestore} from "../../../../../constant/FirebaseConfig.ts";
import {FirestorePath} from "../../../../../constant/FirestorePath.ts";
import {
  DocToNotice,
  DocToNoticeCategory,
  type Notice,
  type NoticeCategory
} from "../../../../../data/notice/Notice.tsx";
import {useState} from "react";
import {fetchItems} from "../../../../utils/utils.ts";

interface NoticeInfoStateListProps {
  itemList?: Notice[];
  isInitialized: boolean;
}

export class NoticeInfoStateList {
  itemList: Notice[] = [];
  isInitialized: boolean;

  constructor(props: NoticeInfoStateListProps) {
    const { itemList = [], isInitialized } = props;

    this.itemList = itemList;
    this.isInitialized = isInitialized;
  }
}

interface NoticeListViewModel {
  infoStateList: NoticeInfoStateList;
  unsubscribe: (() => void) | null;

  setData: (infoStateList: NoticeInfoStateList) => void;

  startListening: () => void;
  stopListening: () => void;
}

const categoryCache = new Map<string, NoticeCategory>();

export const useNoticeListViewModel = create<NoticeListViewModel>((set, get) => ({
  infoStateList: new NoticeInfoStateList({ isInitialized: false}),
  unsubscribe: null,

  setData: (data) => set({ infoStateList: data }),
  startListening: () => {
    if (get().unsubscribe) return;

    const q = query(
      collection(fbFirestore, FirestorePath.NOTICE),
      where(FirestorePath.DELETE, "==", false),
      orderBy(FirestorePath.Notice.FIXED, "desc")
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const itemList = snapshot.docs.map((doc) => DocToNotice(doc));
      console.log("Real-time data update received:", itemList.length);

      await fetchItems(fbFirestore, FirestorePath.NOTICE_CATEGORY, DocToNoticeCategory, categoryCache, [...new Set(itemList.map(item => item.categoryId))]);

      get().setData(new NoticeInfoStateList({
        itemList: itemList.map(item => ({...item, category: categoryCache.get(item.categoryId)})),
        isInitialized: true
      }));
    });

    set({ unsubscribe: unsubscribe });
  },
  stopListening: () => {
    if (get().unsubscribe) {
      get().unsubscribe!();
      set({ unsubscribe: null });
      console.log("Firestore 리스너가 Zustand를 통해 해제되었습니다.");
    }
  }
}));