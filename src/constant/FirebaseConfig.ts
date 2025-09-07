import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyASwy8CgVne7wTYIB0hthpym9gfDjHEJ2c",
  authDomain: "ienlab-ienground.firebaseapp.com",
  projectId: "ienlab-ienground",
  storageBucket: "ienlab-ienground.appspot.com",
  messagingSenderId: "576605496665",
  appId: "1:576605496665:web:d74f77822e2fd3f85cd848",
  measurementId: "G-V8XHSV24QC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);