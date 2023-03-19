// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwe6gmBRVEBfa6iNIP-BUww82DAyvgSbw",
  authDomain: "jobportal-27472.firebaseapp.com",
  projectId: "jobportal-27472",
  storageBucket: "jobportal-27472.appspot.com",
  messagingSenderId: "568226571957",
  appId: "1:568226571957:web:4dee9b07c898b29ca540fc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);
export const storage=getStorage(app);