import {type DevProject, DocToDevProject} from "../../../../../data/project/DevProject.ts";
import {create} from "zustand/react";
import {doc, onSnapshot} from "firebase/firestore";
import {fbFirestore} from "../../../../../constant/FirebaseConfig.ts";
import {FirestorePath} from "../../../../../constant/FirestorePath.ts";
import {delay} from "../../../../utils/utils.ts";

interface DevDetailInfoStateProps {
  item?: DevProject | undefined;
  isInitialized: boolean;
}

export class DevDetailInfoState {
  item: DevProject | undefined;
  isInitialized: boolean;

  constructor(props: DevDetailInfoStateProps) {
    const { item, isInitialized } = props;

    this.item = item;
    this.isInitialized = isInitialized;
  }
}

interface DevDetailViewModel {
  infoState: DevDetailInfoState;
  unsubscribe: (() => void) | null;

  itemId: string | null;
  setItemId: (id: string | null) => void;
  setData: (infoState: DevDetailInfoState) => void;

  startListening: () => void;
  stopListening: () => void;
}

export const useDevDetailViewModel = create<DevDetailViewModel>((set, get) => ({
  infoState: new DevDetailInfoState({ isInitialized: false }),
  unsubscribe: null,

  itemId: null,
  setItemId: (id) => set({ itemId: id }),
  setData: (data) => set({ infoState: data }),
  startListening: () => {
    const itemId = get().itemId;
    if (!itemId || get().unsubscribe) return;

    const docRef = doc(fbFirestore, FirestorePath.DEV_PROJECT, itemId);

    const unsubscribe = onSnapshot(docRef, async (snapshot) => {
      if (snapshot.exists()) {
        const item = DocToDevProject(snapshot);

        get().setData(new DevDetailInfoState({
          item: item,
          isInitialized: true
        }));
      }
    });

    set({ unsubscribe: unsubscribe });
  },
  stopListening: () => {
    if (get().unsubscribe) {
      get().unsubscribe!();
      set({ unsubscribe: null, infoState: new DevDetailInfoState({ item: undefined, isInitialized: false }) });
    }
  }
}));