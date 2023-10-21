"use client";
import { auth } from "@/firebase/firebase";
import { getApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";
// import { messaging } from "@/firebase/firebase";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";
import React from "react";
import { useEffect } from "react";

const FirebaseMessaging = () => {
 
  useEffect(() => {
    let messaging = getMessaging(getApp())
    console.log("fghjkl", auth, onMessage,messaging);
    //const messaging1 = getMessaging();
    // Set up an event listener for incoming messages
onMessage(messaging, (payload) => {
  console.log('Message received:', payload);
  // Handle the message
});

    // getToken(messaging, {
    //   vapidKey:
    //     "BAhLJwKuP6u9vmZ7EUI3Mov0KU9HAYyLMMIrHZ51NWfcmT2IeSSFK36txXFrsG2syM1sfvn7m_Oa5_a8wwNITPs",
    // })
    //   .then((currentToken) => {
    //     if (currentToken) {
    //       // Send the token to your server and update the UI if necessary
    //       console.log("Registration token:", currentToken);

    //       // ...
    //     } else {
    //       // Show permission request UI
    //       console.log(
    //         "No registration token available. Request permission to generate one."
    //       );
    //       // ...
    //     }
    //   })
    //   .catch((err) => {
    //     console.error("An error occurred while retrieving the token: ", err);
    //     // ...
    //   });

   
  }, []);

  return null
};

export default FirebaseMessaging;
