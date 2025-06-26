// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKiEnoYJlmF5kI-p24p3N9PjaihUUYwWI",
  authDomain: "neurosync-ec6ea.firebaseapp.com",
  projectId: "neurosync-ec6ea",
  storageBucket: "neurosync-ec6ea.firebasestorage.app",
  messagingSenderId: "677353155879",
  appId: "1:677353155879:web:e4fbba908e0e779d00cd02",
  measurementId: "G-PWY67TFPHD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);