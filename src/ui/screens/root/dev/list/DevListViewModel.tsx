import {type DevProject, DocToDevProject} from "../../../../../data/project/DevProject.ts";
import {create} from "zustand/react";
import {collection, onSnapshot, orderBy, query, where} from "firebase/firestore";
import {FirestorePath} from "../../../../../constant/FirestorePath.ts";
import {fbFirestore} from "../../../../../constant/FirebaseConfig.ts";

interface DevInfoStateListProps {
  itemList?: DevProject[];
  isInitialized: boolean;
}

export class DevInfoStateList {
  itemList: DevProject[] = [];
  isInitialized: boolean;

  constructor(props: DevInfoStateListProps) {
    const { itemList = [], isInitialized } = props;

    this.itemList = itemList;
    this.isInitialized = isInitialized;
  }
}

interface DevListViewModel {
  infoStateList: DevInfoStateList;
  unsubscribe: (() => void) | null;

  setData: (infoStateList: DevInfoStateList) => void;

  startListening: () => void;
  stopListening: () => void;
}

export const useDevListViewModel = create<DevListViewModel>((set, get) => ({
  infoStateList: new DevInfoStateList({ isInitialized: false }),
  unsubscribe: null,

  setData: (data) => set({ infoStateList: data }),
  startListening: () => {
    if (get().unsubscribe) return;

    const q = query(
      collection(fbFirestore, FirestorePath.DEV_PROJECT),
      where(FirestorePath.DELETE, "!=", true),
      orderBy(FirestorePath.DevProject.IS_PRIMARY, "desc"),
      orderBy(FirestorePath.DevProject.START_AT, "desc")
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const itemList = snapshot.docs.map((doc) => DocToDevProject(doc));

      get().setData(new DevInfoStateList({
        itemList: itemList,
        isInitialized: true
      }));
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