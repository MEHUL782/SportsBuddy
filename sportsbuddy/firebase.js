// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyEXAMPLE-KEY1234567890",
  authDomain: "sports-buddy.firebaseapp.com",
  projectId: "sports-buddy",
  storageBucket: "sports-buddy.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore & Auth references
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
