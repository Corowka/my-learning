// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbqn8ukO_4oZR1HzlYDBI_SCibwbyGKm0",
  authDomain: "coderpg-6aff6.firebaseapp.com",
  projectId: "coderpg-6aff6",
  storageBucket: "coderpg-6aff6.appspot.com",
  messagingSenderId: "967615277577",
  appId: "1:967615277577:web:73f86c4aeb49ba7de566d8",
  measurementId: "G-3H9KG8CNS3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { app, auth, db };
