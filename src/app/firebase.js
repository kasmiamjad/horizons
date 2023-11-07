// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC77EqvanCPgAvWU7Zj9_xYnv2lm57HmsI",
  authDomain: "horizons-b435d.firebaseapp.com",
  projectId: "horizons-b435d",
  storageBucket: "horizons-b435d.appspot.com",
  messagingSenderId: "920026070029",
  appId: "1:920026070029:web:39f53819bfb068e4d0a944"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 