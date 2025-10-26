import {type DevProject, DocToDevProject} from "../../../../data/project/DevProject.ts";
import {create} from "zustand/react";
import {collection, onSnapshot, orderBy, query, where} from "firebase/firestore";
import {fbFirestore} from "../../../../constant/FirebaseConfig.ts";
import {FirestorePath} from "../../../../constant/FirestorePath.ts";

interface FeaturedInfoStateListProps {
  itemList?: DevProject[];
  isInitialized: boolean;
}

export class FeaturedInfoStateList {
  itemList: DevProject[] = [];
  isInitialized: boolean;

  constructor(props: FeaturedInfoStateListProps) {
    const { itemList = [], isInitialized } = props;

    this.itemList = itemList;
    this.isInitialized = isInitialized;
  }
}

interface IntroViewModel {
  infoStateList: FeaturedInfoStateList;
  unsubscribe: (() => void) | null;

  setData: (infoStateList: FeaturedInfoStateList) => void;

  startListening: () => void;
  stopListening: () => void;
}

export const useIntroViewModel = create<IntroViewModel>((set, get) => ({
  infoStateList: new FeaturedInfoStateList({ isInitialized: false }),
  unsubscribe: null,

  setData: (data) => set({ infoStateList: data }),
  startListening: () => {
    if (get().unsubscribe) return;

    const q = query(
      collection(fbFirestore, FirestorePath.DEV_PROJECT),
      where(FirestorePath.DELETE, "!=", true),
      where(FirestorePath.DevProject.IS_PRIMARY, "==", true),
      orderBy(FirestorePath.DevProject.START_AT, "desc")
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const itemList = snapshot.docs.map((doc) => DocToDevProject(doc));
      get().setData(new FeaturedInfoStateList({
        itemList: itemList,
        isInitialized: true
      }));
    });

    set({ unsubscribe: unsubscribe});
  },
  stopListening: () => {
    if (get().unsubscribe) {
      get().unsubscribe!();
      set({ unsubscribe: null });
    }
  }
}));