// Your web app's Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAA54vudpO9eP3UCNd7Ehe1iltA7AP1TbA",
    authDomain: "jobapplytracker.firebaseapp.com",
    projectId: "jobapplytracker",
    storageBucket: "jobapplytracker.appspot.com",
    messagingSenderId: "648058361738",
    appId: "1:648058361738:web:2b924b5e5d239beda01a73",
    measurementId: "G-23H7FST4KJ"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
