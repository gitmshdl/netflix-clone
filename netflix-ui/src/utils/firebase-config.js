import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAdMuzRxAQ2Sl9vxVIih-1EQhV4S69nnLU",
  authDomain: "netflix-clone-f7a9e.firebaseapp.com",
  projectId: "netflix-clone-f7a9e",
  storageBucket: "netflix-clone-f7a9e.appspot.com",
  messagingSenderId: "822602110670",
  appId: "1:822602110670:web:1e0ed41136f26a5386229f",
  measurementId: "G-0BSSF78VB9",
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
