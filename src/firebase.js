import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzT6-f8gfxJgUyvm0KpCSE0d3n-_D2qLQ",
  authDomain: "all-mac.firebaseapp.com",
  projectId: "all-mac",
  storageBucket: "all-mac.appspot.com",
  messagingSenderId: "66093182520",
  appId: "1:66093182520:web:4beb329b2bb8b8c59a00cd",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
