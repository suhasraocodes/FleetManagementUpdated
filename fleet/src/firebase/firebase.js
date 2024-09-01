// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAjbWUXx5Pa39vgy3tb1rdAo-P2vYKzVkU",
  authDomain: "fleet-management-e9716.firebaseapp.com",
  projectId: "fleet-management-e9716",
  storageBucket: "fleet-management-e9716.appspot.com",
  messagingSenderId: "180255920415",
  appId: "1:180255920415:web:332ec6c8dc3acd5b61602a",
  measurementId: "G-8RR50V9C8F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Firebase Authentication and get a reference to the service

export { app, analytics, auth }; // Export the initialized services
