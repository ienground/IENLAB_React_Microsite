import {
  DocToNotice,
  DocToNoticeCategory,
  type Notice,
} from "../../../../../data/notice/Notice.tsx";
import {create} from "zustand/react";
import {doc, onSnapshot, getDoc} from "firebase/firestore";
import {fbFirestore} from "../../../../../constant/FirebaseConfig.ts";
import {FirestorePath} from "../../../../../constant/FirestorePath.ts";

interface NoticeDetailInfoStateProps {
  item?: Notice | undefined;
  isInitialized: boolean;
}

export class NoticeDetailInfoState {
  item: Notice | undefined;
  isInitialized: boolean;

  constructor(props: NoticeDetailInfoStateProps) {
    const { item, isInitialized } = props;

    this.item = item;
    this.isInitialized = isInitialized;
  }
}

interface NoticeDetailViewModel {
  infoState: NoticeDetailInfoState;
  unsubscribe: (() => void) | null;

  itemId: string | null;
  setItemId: (id: string | null) => void;
  setData: (infoState: NoticeDetailInfoState) => void;

  startListening: () => void;
  stopListening: () => void;
}

export const useNoticeDetailViewModel = create<NoticeDetailViewModel>((set, get) => ({
  infoState: new NoticeDetailInfoState({ isInitialized: false }),
  unsubscribe: null,

  itemId: null,
  setItemId: (id) => set({ itemId: id }),
  setData: (data) => set({ infoState: data }),
  startListening: () => {
    const itemId = get().itemId;
    if (!itemId || get().unsubscribe) return;

    const docRef = doc(fbFirestore, FirestorePath.NOTICE, itemId);

    const unsubscribe = onSnapshot(docRef, async (snapshot) => {
      if (snapshot.exists()) {
        const item = DocToNotice(snapshot);
        const category = await getDoc(item.categoryRef).then((res) => DocToNoticeCategory(res));

        get().setData(new NoticeDetailInfoState({
          item: {...item, category: category},
          isInitialized: true
        }));
      }
    });

    set({ unsubscribe: unsubscribe });
  },
  stopListening: () => {
    if (get().unsubscribe) {
      get().unsubscribe!();
      set({ unsubscribe: null, infoState: new NoticeDetailInfoState({ item: undefined, isInitialized: false }) });
    }
  }
}));