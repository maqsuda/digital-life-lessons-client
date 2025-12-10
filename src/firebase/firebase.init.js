// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBNsPZPrqw_dBKi7-Du0XXGqVBKDf7h7ls",
//   authDomain: "digital-life-lessons-c6cff.firebaseapp.com",
//   projectId: "digital-life-lessons-c6cff",
//   storageBucket: "digital-life-lessons-c6cff.firebasestorage.app",
//   messagingSenderId: "203792000602",
//   appId: "1:203792000602:web:afb05b0aacefec2f251a63",
// };

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
