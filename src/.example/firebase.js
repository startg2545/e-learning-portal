// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getDocs, getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvwi9JTj6ydQij9ncv2gNcx48dcPgyAps",
  authDomain: "calendar-2c245.firebaseapp.com",
  projectId: "calendar-2c245",
  storageBucket: "calendar-2c245.appspot.com",
  messagingSenderId: "166403214879",
  appId: "1:166403214879:web:8dbd0bfc76224698698f2a",
  measurementId: "G-G6117MN4KG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
