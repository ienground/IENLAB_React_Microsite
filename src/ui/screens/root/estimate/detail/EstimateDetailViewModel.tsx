import {DocToEstimate, type Estimate} from "../../../../../data/estimate/Estimate.ts";
import {create} from "zustand/react";
import {fbFirestore} from "../../../../../constant/FirebaseConfig.ts";
import {FirestorePath} from "../../../../../constant/FirestorePath.ts";
import {doc, onSnapshot} from "firebase/firestore";
import {delay} from "../../../../utils/utils.ts";

interface EstimateDetailInfoStateProps {
  item?: Estimate | undefined;
  isInitialized: boolean;
}

export class EstimateDetailInfoState {
  item: Estimate | undefined;
  isInitialized: boolean;

  constructor(props: EstimateDetailInfoStateProps) {
    const { item, isInitialized } = props;

    this.item = item;
    this.isInitialized = isInitialized;
  }
}

interface EstimateDetailViewModel {
  infoState: EstimateDetailInfoState;
  unsubscribe: (() => void) | null;

  itemId: string | null;
  setItemId: (id: string | null) => void;
  setData: (infoState: EstimateDetailInfoState) => void;

  startListening: () => void;
  stopListening: () => void;
}

export const useEstimateDetailViewModel = create<EstimateDetailViewModel>((set, get) => ({
  infoState: new EstimateDetailInfoState({ isInitialized: false }),
  unsubscribe: null,

  itemId: null,
  setItemId: (id) => set({ itemId: id }),
  setData: (data) => set({ infoState: data }),
  startListening: () => {
    const itemId = get().itemId;
    if (!itemId || get().unsubscribe) return;

    const docRef = doc(fbFirestore, FirestorePath.ESTIMATE, itemId);

    const unsubscribe = onSnapshot(docRef, async (snapshot) => {
      if (snapshot.exists()) {
        const item = DocToEstimate(snapshot);

        delay(3000);
        get().setData(new EstimateDetailInfoState({
          item: item,
          isInitialized: true
        }));
      }
    })

    set({ unsubscribe: unsubscribe });
  },
  stopListening: () => {
    if (get().unsubscribe) {
      get().unsubscribe!();
      set({ unsubscribe: null, infoState: new EstimateDetailInfoState({ item: undefined, isInitialized: false })});
    }
  }
}));