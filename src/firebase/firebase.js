// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import the authentication module

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_8kdH3Byjlw6Wpr_-o4HrzEdPoiWkgRE",
  authDomain: "fastbuy-2a634.firebaseapp.com",
  projectId: "fastbuy-2a634",
  storageBucket: "fastbuy-2a634.appspot.com",
  messagingSenderId: "221263576397",
  appId: "1:221263576397:web:2be6fdd1e9cddbc7650b04",
  measurementId: "G-JQXSM0Z3C9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



// const analytics = getAnalytics(app);

// Get the authentication instance
export const auth = getAuth(app);

export const messaging = getMessaging(app);





//export auth; // Export the auth instance for use in other parts of your application
