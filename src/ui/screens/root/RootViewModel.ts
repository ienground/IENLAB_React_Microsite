import {type Estimate, estimateDefault, EstimateToHashMap} from "../../../data/estimate/Estimate.ts";
import {create} from "zustand/react";
import {collection, addDoc, type DocumentReference} from "firebase/firestore";
import {fbFirestore} from "../../../constant/FirebaseConfig.ts";
import {FirestorePath} from "../../../constant/FirestorePath.ts";

export type RootDetails = {
  formData: Estimate,
  isEstimateUploading?: boolean;
}

interface RootUiStateProps {
  item?: RootDetails | undefined;
}

export class RootUiState {
  item: RootDetails;

  constructor(props: RootUiStateProps) {
    const { item = { formData: estimateDefault } } = props;

    this.item = item;
  }
}

interface RootViewModel {
  uiState: RootUiState;
  onItemValueChanged: (item: Partial<RootDetails>) => void;

  uploadEstimate: (onSuccess: (res: DocumentReference) => void, onFailure: (err: string) => void) => void;
}

export const useRootViewModel = create<RootViewModel>((set, get) => ({
  uiState: new RootUiState({ item: { formData: estimateDefault }}),
  onItemValueChanged: (item: Partial<RootDetails>) => set({ uiState: new RootUiState({ item: {...get().uiState.item, ...item} }) }),

  uploadEstimate: (onSuccess, onFailure) => {
    get().onItemValueChanged({ isEstimateUploading: true });
    const ref = collection(fbFirestore, FirestorePath.ESTIMATE);
    addDoc(ref, EstimateToHashMap(get().uiState.item.formData))
      .then(onSuccess)
      .catch((err) => { onFailure(err) })
    ;
  }
}));