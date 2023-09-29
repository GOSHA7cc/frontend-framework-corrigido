// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoxBQ1u1wYxlLgtVF34p2BlFJyoBdzV8Y",
  authDomain: "money-wise-cadca.firebaseapp.com",
  projectId: "money-wise-cadca",
  storageBucket: "money-wise-cadca.appspot.com",
  messagingSenderId: "951092102841",
  appId: "1:951092102841:web:4e173099a2a773a3f1fd68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export { app, db, auth }