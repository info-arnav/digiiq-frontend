import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAC1nOdm32pgXmUyk9_gSYXaCep1mf8ulA",
  authDomain: "my-ai-project-b3079.firebaseapp.com",
  projectId: "my-ai-project-b3079",
  storageBucket: "my-ai-project-b3079.appspot.com",
  messagingSenderId: "1087502684002",
  appId: "1:1087502684002:web:e890cfd242b56f2197e63b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);      // Firestore instance
export const storage = getStorage(app);   // Storage instance
