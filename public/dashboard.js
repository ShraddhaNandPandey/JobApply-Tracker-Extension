import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAA54vudpO9eP3UCNd7Ehe1iltA7AP1TbA",
    authDomain: "jobapplytracker.firebaseapp.com",
    projectId: "jobapplytracker",
    storageBucket: "jobapplytracker.appspot.com",
    messagingSenderId: "648058361738",
    appId: "1:648058361738:web:2b924b5e5d239beda01a73",
    measurementId: "G-23H7FST4KJ"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to fetch username after login and display it
function fetchUsernameAfterLogin() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            const uid = user.uid;
            const userRef = doc(db, "users", uid);

            // Fetch user data from Firestore
            getDoc(userRef)
                .then((doc) => {
                    if (doc.exists()) {
                        const userData = doc.data();
                        const username = userData.username;
                        console.log('Username:', username);
                        // Display the username in the HTML
                        document.getElementById('username-display').innerText = 'Welcome, ' + username + '!';
                    } else {
                        console.error("No such document!");
                    }
                })
                .catch((error) => {
                    console.error("Error getting document:", error);
                });
        } else {
            // User is signed out
            console.log('No user signed in.');
        }
    });
}

// Function to close login
function closeLogin() {
    window.location.href = 'index.html';
}

// Function to handle signup
function signUp() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User signed up:', user);
            alert('User signed up successfully!');

            const userRef = doc(db, "users", user.uid);
            setDoc(userRef, {
                username: username,
                email: email
            });

            closeLogin(); // Close login after successful signup
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.error('Signup error:', errorMessage);
            alert(errorMessage);
        });
}

// Function to initialize the dashboard page
function initDashboard() {
    fetchUsernameAfterLogin(); // Fetch and display username
    document.getElementById('signup-btn').addEventListener('click', signUp); // Attach signup function to signup button
}

// Initialize dashboard when DOM content is loaded
document.addEventListener('DOMContentLoaded', initDashboard);
