import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVLIgB7np4kEi76X4xVappSfNK4rfh-TE",
  authDomain: "chaquevoix.firebaseapp.com",
  projectId: "chaquevoix",
  storageBucket: "chaquevoix.appspot.com",
  messagingSenderId: "42107547318",
  appId: "1:42107547318:web:9a0078896d50891fc30017",
  measurementId: "G-LRRLRESJ2R"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
export const db = getFirestore(firebase);
export const auth = getAuth(firebase);