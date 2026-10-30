// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxKgF6Xwd9klnlFwmFOBRD6HlHwimKtMU",
  authDomain: "netflix-gpt-36dfc.firebaseapp.com",
  projectId: "netflix-gpt-36dfc",
  storageBucket: "netflix-gpt-36dfc.firebasestorage.app",
  messagingSenderId: "776520570236",
  appId: "1:776520570236:web:1eb2f8b00b1655ac0000f9",
  measurementId: "G-WGVFK0BEJ8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
