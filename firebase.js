// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGvJkiDAt0QG53iU8boo5vspGqhTiC_Ys",
  authDomain: "nth-quymonquan-bangchien.firebaseapp.com",
  projectId: "nth-quymonquan-bangchien",
  storageBucket: "nth-quymonquan-bangchien.firebasestorage.app",
  messagingSenderId: "329804677556",
  appId: "1:329804677556:web:a83749ae7bf45627fbf2e1",
  measurementId: "G-BQVFFHBMQ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);