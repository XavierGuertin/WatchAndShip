// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDzcNuvfEqPQEurSNTgJtDn2WNE0iZDzfc",
    authDomain: "watchandship.firebaseapp.com",
    projectId: "watchandship",
    storageBucket: "watchandship.appspot.com",
    messagingSenderId: "643698374126",
    appId: "1:643698374126:web:a65a0b83ea604037ffcaff",
    measurementId: "G-PV4CC4SR5Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Export the database for components to use.
export const db = getFirestore(app);