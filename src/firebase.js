// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDrqC_vDpPL5aBRk70ok6zDUX2l0hSKKUQ",
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-26ac0.firebaseapp.com",
  projectId: "mern-auth-26ac0",
  storageBucket: "mern-auth-26ac0.appspot.com",
  messagingSenderId: "932878143272",
  appId: "1:932878143272:web:254363a5a8f33aa9264a1d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
