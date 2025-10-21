import {create} from "zustand/react";
import {collection, getDocs, query, where, and} from "firebase/firestore";
import {fbFirestore} from "../../../../../constant/FirebaseConfig.ts";
import {FirestorePath} from "../../../../../constant/FirestorePath.ts";

export type EstimateSearchDetails = {
  query?: string;
  name?: string;
  isSearching?: boolean;
  errorCode?: string | null;
}

interface EstimateSearchUiStateProps {
  item?: EstimateSearchDetails | undefined;
}

export class EstimateSearchUiState {
  item: EstimateSearchDetails;

  constructor(props: EstimateSearchUiStateProps) {
    const { item = { query: "", name: "" } } = props;

    this.item = item;
  }
}

interface EstimateSearchViewModel {
  uiState: EstimateSearchUiState;
  onItemValueChanged: (item: Partial<EstimateSearchDetails>) => void;

  searchQuote: (onSuccess: (id: string) => void, onFailure: (err: string) => void) => void;
  onDispose: () => void;
}

export const useEstimateSearchViewModel = create<EstimateSearchViewModel>((set, get) => ({
  uiState: new EstimateSearchUiState({ item: { query: "", name: "", errorCode: null } }),
  onItemValueChanged: (item: Partial<EstimateSearchDetails>) => set({ uiState: new EstimateSearchUiState({ item: {...get().uiState.item, ...item} }) }),
  searchQuote: (onSuccess, onFailure) => {
    get().onItemValueChanged({isSearching: true, errorCode: null});

    const q = query(
      collection(fbFirestore, FirestorePath.ESTIMATE),
      and(
        where(FirestorePath.DELETE, "!=", true),
        where(FirestorePath.Estimate.IDENTIFIER, "==", get().uiState.item.query),
        where(FirestorePath.Estimate.NAME, "==", get().uiState.item.name)
      )
    );

    getDocs(q)
      .then((res) => {
        console.log(res);
        if (res.empty) {
          onFailure("EMPTY");
        } else {
          onSuccess(res.docs[0].id);
        }
        get().onItemValueChanged({isSearching: false});
      })
      .catch((err) => {
        console.error(err);
        onFailure(err);
      })
    ;
  },
  onDispose: () => {
    get().onItemValueChanged({query: "", name: "", errorCode: null});
  }
}));