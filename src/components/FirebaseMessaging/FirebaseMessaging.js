"use client";
// import { auth } from "@/firebase/firebase";
// import { getApp } from "firebase/app";
// import { getMessaging, getToken, isSupported, onMessage } from "firebase/messaging";
// import { messaging } from "@/firebase/firebase";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";
import React from "react";
import { useEffect } from "react";


// import { useEffect } from "react";
// import firebase from "firebase/app";

const FirebaseMessaging = () => {

  useEffect(()=>{
   

    let  loadData=async()=> {
     await import("../../firebase/firebase");
    console.log("hiii")
      
    }
  
   setTimeout(() => {
    loadData();
   }, 2000);
  },[])
  // useEffect(() => {
  //   let messaging = getMessaging(getApp());
  //   // console.log("u7654edfghjkjhgfd",firebase.getApp())
  //   getToken(messaging, {
  //     vapidKey:
  //       "BAhLJwKuP6u9vmZ7EUI3Mov0KU9HAYyLMMIrHZ51NWfcmT2IeSSFK36txXFrsG2syM1sfvn7m_Oa5_a8wwNITPs",
  //   })
  //     .then((currentToken) => {
  //       if (currentToken) {
  //         // Send the token to your server and update the UI if necessary
  //         console.log("Registration token:", currentToken);


  //         onMessage(messaging, (payload) => {
  //           console.log("Message received:", payload);
  //           // Handle the message
  //         });


  //        // let messaging = getMessaging(getApp());
  //         //console.log("kjuytfdfghjkhgfghjk",onMessage(messaging))

          
  //         //console.log("jhgfdfghjkghj",getMessaging(getApp()),isSupported().then((res)=>console.log("dfghjk",res)))
  //        // console.log("fghjkl", auth, messaging);
  //         //const messaging1 = getMessaging();
  //         // Set up an event listener for incoming messages
          
  //         // onMessage(messaging, (payload) => {
  //         //   console.log("Message received:", payload);
  //         //   // Handle the message
  //         // });
          

  //         // ...
  //       } else {
  //         // Show permission request UI
  //         console.log(
  //           "No registration token available. Request permission to generate one."
  //         );
  //         // ...
  //       }
  //     })
  //     .catch((err) => {
  //       console.error("An error occurred while retrieving the token: ", err);
  //       // ...
  //     });
  // }, []);

  return null;
};

export default FirebaseMessaging;
