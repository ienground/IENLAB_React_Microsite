/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />


import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {connectFunctionsEmulator, getFunctions} from "firebase/functions";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const fbAuth = getAuth(app);
export const fbFirestore = getFirestore(app);
export const fbStorage = getStorage(app);
export const fbFunctions = getFunctions(app);

if (location.hostname === "localhost") {
  connectFunctionsEmulator(fbFunctions, "127.0.0.1", 5001);
}