const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const firebaseConfig = {
    apiKey: "AIzaSyBUfVA_Q3LDDdJ1B5gN4IPQX6rrmqONpiQ",
    authDomain: "myroadapp-1e432.firebaseapp.com",
    databaseURL: "https://myroadapp-1e432-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "myroadapp-1e432",
    storageBucket: "myroadapp-1e432.appspot.com",
    messagingSenderId: "649780212355",
    appId: "1:649780212355:web:d74211ff65758a95f921b6",
    measurementId: "G-BNQ7K7XZH2"
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: firebaseConfig.databaseURL
});

const db = admin.database();

module.exports = db;