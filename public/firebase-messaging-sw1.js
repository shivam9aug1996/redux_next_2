// // Give the service worker access to Firebase Messaging.
// // Note that you can only use Firebase Messaging here. Other Firebase libraries
// // are not available in the service worker.
// importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging.js');

// // Initialize the Firebase app in the service worker by passing in
// // your app's Firebase config object.
// // https://firebase.google.com/docs/web/setup#config-object
// firebase.initializeApp({
//   apiKey: "AIzaSyB_8kdH3Byjlw6Wpr_-o4HrzEdPoiWkgRE",
//   authDomain: "fastbuy-2a634.firebaseapp.com",
//   projectId: "fastbuy-2a634",
//   storageBucket: "fastbuy-2a634.appspot.com",
//   messagingSenderId: "221263576397",
//   appId: "1:221263576397:web:2be6fdd1e9cddbc7650b04",
//   measurementId: "G-JQXSM0Z3C9"
// });


// const messaging = firebase.messaging();



// importScripts('https://www.gstatic.com/firebase/10.5.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebase/10.5.0/firebase-messaging.js');


const config = {
  apiKey: "AIzaSyB_8kdH3Byjlw6Wpr_-o4HrzEdPoiWkgRE",
  authDomain: "fastbuy-2a634.firebaseapp.com",
  projectId: "fastbuy-2a634",
  storageBucket: "fastbuy-2a634.appspot.com",
  messagingSenderId: "221263576397",
  appId: "1:221263576397:web:2be6fdd1e9cddbc7650b04",
  measurementId: "G-JQXSM0Z3C9"
}

// // const firebaseApp = initializeApp(config)
// // getMessaging(firebaseApp)

// importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');
// // importScripts('https://www.gstatic.com/firebase/10.5.0/firebase-app.js');
// // importScripts('https://www.gstatic.com/firebase/10.5.0/firebase-messaging.js');

// firebase.initializeApp(config);

// const isSupported = firebase.messaging.isSupported();
// if (isSupported) {
//     const messaging = firebase.messaging();
//     messaging.onBackgroundMessage(({ notification: { title, body, image } }) => {
//         self.registration.showNotification(title, { body, icon: image || '/assets/icons/icon-72x72.png' });
//     });
// }


// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp(config);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

