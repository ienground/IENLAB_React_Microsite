import {create} from "zustand/react";
import {collection, onSnapshot, query, where, orderBy, limit, startAfter, endAt, limitToLast, type DocumentSnapshot} from "firebase/firestore";
import {fbFirestore} from "../../../../../constant/FirebaseConfig.ts";
import {FirestorePath} from "../../../../../constant/FirestorePath.ts";
import {
  DocToNotice,
  DocToNoticeCategory,
  type Notice,
  type NoticeCategory
} from "../../../../../data/notice/Notice.tsx";
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

  lastPage: number;
  currentPage: number;
  firstVisibleDocument: DocumentSnapshot | null;
  lastVisibleDocument: DocumentSnapshot | null;
  hasMore: boolean;

  setPage: (page: number) => void;

  startListening: () => void;
  stopListening: () => void;
}

const categoryCache = new Map<string, NoticeCategory>();

const ITEMS_PER_PAGE = 4;

export const useNoticeListViewModel = create<NoticeListViewModel>((set, get) => ({
  infoStateList: new NoticeInfoStateList({ isInitialized: false }),
  unsubscribe: null,

  lastPage: 1,
  currentPage: 1,
  firstVisibleDocument: null,
  lastVisibleDocument: null,
  hasMore: true,

  setPage: (page) => {
    // 1. 현재 리스너 중지 (페이지 변경 시 리스너를 교체해야 함)
    get().stopListening();

    // 2. 페이지 번호 업데이트 및 리스너 재시작
    set({ lastPage: get().currentPage, currentPage: page });
    get().startListening();
  },

  startListening: () => {
    const { lastPage, currentPage, firstVisibleDocument, lastVisibleDocument } = get();
    if (get().unsubscribe) return;

    let q = query(
      collection(fbFirestore, FirestorePath.NOTICE),
      where(FirestorePath.DELETE, "!=", true),
      orderBy(FirestorePath.Notice.FIXED, "desc"),
      orderBy(FirestorePath.CREATE_AT, "desc"),
    );

    if (currentPage > lastPage) { // 다음 페이지
      q = query(q, limit(ITEMS_PER_PAGE + 1), startAfter(lastVisibleDocument));
    } else if (currentPage < lastPage) { // 이전 페이지
      q = query(q, endAt(firstVisibleDocument), limitToLast(ITEMS_PER_PAGE + 1));
    } else {
      q = query(q, limit(ITEMS_PER_PAGE + 1));
    }

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const hasMore = snapshot.docs.length > ITEMS_PER_PAGE;
      const docsToProcess = hasMore ? snapshot.docs.slice(0, ITEMS_PER_PAGE) : snapshot.docs;

      const newFirstVisibleDocument = docsToProcess.length > 0 ? snapshot.docs[0] : null;
      const newLastVisibleDocument = docsToProcess.length > 0 ? snapshot.docs[docsToProcess.length - 1] : null;

      const itemList = docsToProcess.map((doc) => DocToNotice(doc));
      await fetchItems(fbFirestore, FirestorePath.NOTICE_CATEGORY, DocToNoticeCategory, categoryCache, [...new Set(itemList.map(item => item.categoryRef))]);

      set({
        infoStateList: new NoticeInfoStateList({
          itemList: itemList.map(item => ({...item, category: categoryCache.get(item.categoryRef.id)})),
          isInitialized: true
        }),
        firstVisibleDocument: newFirstVisibleDocument,
        lastVisibleDocument: newLastVisibleDocument,
        hasMore: hasMore
      });
    });

    set({ unsubscribe: unsubscribe });
  },
  stopListening: () => {
    if (get().unsubscribe) {
      get().unsubscribe!();
      set({ unsubscribe: null });
    }
  }
}));