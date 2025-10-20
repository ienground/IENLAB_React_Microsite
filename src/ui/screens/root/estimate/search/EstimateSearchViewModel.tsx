import {create} from "zustand/react";
import {collection, getDocs, query, where} from "firebase/firestore";
import {fbFirestore} from "../../../../../constant/FirebaseConfig.ts";
import {FirestorePath} from "../../../../../constant/FirestorePath.ts";

export type EstimateSearchDetails = {
  query: string;
  isSearching?: boolean;
}

interface EstimateSearchUiStateProps {
  item?: EstimateSearchDetails | undefined;
}

export class EstimateSearchUiState {
  item: EstimateSearchDetails;

  constructor(props: EstimateSearchUiStateProps) {
    const { item = { query: "" } } = props;

    this.item = item;
  }
}

interface EstimateSearchViewModel {
  uiState: EstimateSearchUiState;
  onItemValueChanged: (item: EstimateSearchDetails) => void;

  searchQuote: (onSuccess: (id: string) => void, onFailure: (err: string) => void) => void;
}

export const useEstimateSearchViewModel = create<EstimateSearchViewModel>((set, get) => ({
  uiState: new EstimateSearchUiState({ item: { query: "" } }),
  onItemValueChanged: (item: EstimateSearchDetails) => set({ uiState: new EstimateSearchUiState({ item: item }) }),
  searchQuote: (onSuccess, onFailure) => {
    get().onItemValueChanged({...get().uiState.item, isSearching: true});

    const q = query(
      collection(fbFirestore, FirestorePath.ESTIMATE),
      where(FirestorePath.DELETE, "!=", true),
      where(FirestorePath.Estimate.IDENTIFIER, "==", get().uiState.item.query)
    );

    getDocs(q)
      .then((res) => {
        if (res.empty) {
          onFailure("wrong");
        } else {
          onSuccess(res.docs[0].id);
        }
        get().onItemValueChanged({...get().uiState.item, isSearching: false});
      })
      .catch((err) => {
        console.error(err);
        onFailure(err);
      })
    ;
  }
}));