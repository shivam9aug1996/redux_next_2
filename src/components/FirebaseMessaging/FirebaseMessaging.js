"use client";
import { getApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import "../../firebase/firebase";
// import { auth } from "@/firebase/firebase";
// import { getApp } from "firebase/app";
// import { getMessaging, getToken, isSupported, onMessage } from "firebase/messaging";
// import { messaging } from "@/firebase/firebase";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";



// import { useEffect } from "react";
// import firebase from "firebase/app";

const FirebaseMessaging = () => {
  const router = useRouter();
  // useEffect(()=>{

  //   let  loadData=async()=> {
  //    await import("../../firebase/firebase");
  //   console.log("hiii")

  //   }

  //  setTimeout(() => {
  //   loadData();
  //  }, 2000);
  // },[])


  useEffect(() => {
    // // Add an event listener to receive messages from the service worker.
    // navigator.serviceWorker.addEventListener('message', function(event) {
    //   console.log(event)
    //   // Handle the message from the service worker.
    //   if (event.data.action) {
    //     // Perform actions based on the custom action received.
    //     if (event.data.action === 'customAction1') {
    //       console.log("clicked in client",event.data.data)
    //       // Handle custom action 1.
    //     } else if (event.data.action === 'customAction2') {
    //       // Handle custom action 2.
    //     }
    //     // Add more conditions as needed for different actions.
    //   }
    // });
    const channel = new BroadcastChannel('notificationChannel');

// Add an event listener to handle messages from the service worker.
channel.addEventListener('message', function(event) {
  console.log(event)
  // Handle the message from the service worker.
  if (event.data.action) {
    // Perform actions based on the custom action received.
    if (event.data.action === 'customAction1') {
      console.log(event.data.data)
      router.push("/terms")
      // Handle custom action 1.
    } else if (event.data.action === 'customAction2') {
      // Handle custom action 2.
    }
    // Add more conditions as needed for different actions.
  }
});

   
  }, []);


  useEffect(() => {
    // let messaging = getMessaging(getApp());
    const messaging = getMessaging();

    console.log("jhgfdfghjkl;", messaging);
    // onMessage(messaging,(payload)=>{
    //   console.log("gfdfghjkl",payload)
    // })
    const onMessageListener = () => {
      return new Promise((resolve) => {
        onMessage(messaging, (payload) => {
         // alert("hi");
         console.log("foreground",payload)
        //  self.registration.showNotification('Push Notification',{
        //   body: "ghjkl",
        // })
          resolve(payload);
        });
      });
    };
    

   setTimeout(() => {
    getToken(messaging, {
      vapidKey:
        "BAhLJwKuP6u9vmZ7EUI3Mov0KU9HAYyLMMIrHZ51NWfcmT2IeSSFK36txXFrsG2syM1sfvn7m_Oa5_a8wwNITPs",
    })
      .then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          console.log("Registration token:", currentToken);
          const channel = new BroadcastChannel('background-messages');
channel.onmessage = (event) => {
 
      console.log('Payload:', event);

  // You can process the payload or take other actions in your main code
};
          // navigator.serviceWorker.addEventListener('message', (event) => {
          //   console.log(event)
          //   //const { message, payload } = event.data;
          //   console.log(event?.data);
          //   console.log('Payload:', event?.data?.notification);
            
          //   // You can process the payload or take other actions in your main code
          // });

         //onMessageListener();
        } else {
          // Show permission request UI
          console.log(
            "No registration token available. Request permission to generate one."
          );
          // ...
        }
      })
      .catch((err) => {
        console.error("An error occurred while retrieving the token: ", err);
        // ...
      });
   }, 3000);
  }, []);

  // useEffect(() => {
  //   let messaging = getMessaging(getApp());
  //   // console.log("u7654edfghjkjhgfd",firebase.getApp())

  // }, []);

  return null;
};

export default FirebaseMessaging;
