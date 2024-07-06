// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Dodaj ten import

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAByzHAtM2SvAQYswMfB49yGwCHkBmymH0",
  authDomain: "to-do-list-756bf.firebaseapp.com",
  projectId: "to-do-list-756bf",
  storageBucket: "to-do-list-756bf.appspot.com",
  messagingSenderId: "860756017752",
  appId: "1:860756017752:web:bae7e811b65c4f98d2802d",
  measurementId: "G-E01XNJZRVZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Dodaj tę linię

// Eksportuj zainicjowane usługi
export { db, analytics };
