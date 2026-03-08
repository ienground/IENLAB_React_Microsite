import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "./locales/i18n";
import {browserLocalPersistence, setPersistence} from "firebase/auth";
import {fbAuth} from "@/constant/FirebaseConfig.ts";

setPersistence(fbAuth, browserLocalPersistence).then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
});