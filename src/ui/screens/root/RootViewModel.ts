import {
  type Estimate, estimateBudget,
  EstimateToHashmap,
} from "../../../data/estimate/Estimate.ts";
import {addDoc, collection} from "firebase/firestore";
import {firestore} from "../../../constant/FirebaseConfig.ts";
import {FirestorePath} from "../../../constant/FirestorePath.ts";
import {useState} from "react";
import {platformType} from "../../../data/common/PlatformType.ts";

export default function useRootViewModel() {
  const [uiState, setUiState] = useState(new RootUiState());
  const updateUiState = (item: Partial<RootDetails>) => {
    setUiState(prevState => new RootUiState({...prevState.item, ...item}));
  };

  const uploadEstimate = async (item: Estimate) => {
    updateUiState({isEstimateUploading: true});
    const ref = collection(firestore, FirestorePath.ESTIMATE);
    await addDoc(ref, EstimateToHashmap(item));
    updateUiState({
      isEstimateUploading: false,
      formData: {
        name: "",
        company: "",
        email: "",
        type: "",
        platform: [platformType.ANDROID.toString(), platformType.IOS.toString()],
        budget: estimateBudget.BET_300_500,
        description: ""
      }
    });
  };

  return { uiState, updateUiState, uploadEstimate };
}

class RootUiState {
  item;

  constructor(item: RootDetails = new RootDetails()) {
    this.item = item;
  }
}

class RootDetails {
  isEstimateUploading: boolean = false;

  formData: {
    name: string,
    company: string,
    email: string,
    type: string,
    platform: string[],
    budget: string,
    description: string,
  } = {
    name: "",
    company: "",
    email: "",
    type: "",
    platform: [platformType.ANDROID.toString(), platformType.IOS.toString()],
    budget: estimateBudget.BET_300_500,
    description: ""
  }
}