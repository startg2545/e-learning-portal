// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJ52qSpg8qF4QWxU7wfq-atDxd-_gQglw",
  authDomain: "auth-7629b.firebaseapp.com",
  projectId: "auth-7629b",
  storageBucket: "auth-7629b.appspot.com",
  messagingSenderId: "90002126849",
  appId: "1:90002126849:web:b62c642881dfd4537da800",
  measurementId: "G-31CC08EGZW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);