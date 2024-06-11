import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDYfc5m-vnNDquFLgMsf8bZ7rq1wG7lyp8",
  authDomain: "mm-cozycrochet.firebaseapp.com",
  projectId: "mm-cozycrochet",
  storageBucket: "mm-cozycrochet.appspot.com",
  messagingSenderId: "1027987090260",
  appId: "1:1027987090260:web:c58324d54d592b2e55b6c1",
  measurementId: "G-EESFER9TTN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);