// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth"; // Import the authentication module
import { getMessaging } from "firebase/messaging";
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

export const messaging = getMessaging(app);

// Initialize Firebase if it hasn't been initialized
// if (!getApps().length) {
//   initializeApp(firebaseConfig);
// }





export const auth = getAuth(app);

// export const messaging = getMessaging(app);



// let auth = null;
// let messaging = null; // Initialize auth and messaging to null

// // Function to initialize auth and messaging and set them when ready
// const initFirebase = () => {
//   auth = getAuth(getApp());
//  // messaging = getMessaging(getApp());
// };

// Call the function to initialize auth and messaging
//initFirebase();

// Export auth and messaging once they're ready
// export { auth };




