const config = {
  apiKey: "AIzaSyB_8kdH3Byjlw6Wpr_-o4HrzEdPoiWkgRE",
  authDomain: "fastbuy-2a634.firebaseapp.com",
  projectId: "fastbuy-2a634",
  storageBucket: "fastbuy-2a634.appspot.com",
  messagingSenderId: "221263576397",
  appId: "1:221263576397:web:2be6fdd1e9cddbc7650b04",
  measurementId: "G-JQXSM0Z3C9",
};
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp(config);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
// const messaging = firebase.messaging();

// messaging.setBackgroundMessageHandler((payload) => {
//   console.log(
//     '[firebase-messaging-sw.js] Received background message ',
//     payload
//   );
// })
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

self.addEventListener('push',function(event){
  console.log("jhgfdsdfghji876r",event)
  var serverData=event.data.json();
  if(serverData){
    console.log(serverData)
      var notifiBody=serverData.body;
     // var imageIcon=serverData.imageUrl;
      var rUrl=serverData.redirectUrl;
      self.registration.showNotification(serverData?.notification?.title,{
          body : serverData?.notification?.body,
       
      });
  }else{
      console.log("There is no data to be displayed.");
  }
});

const channel = new BroadcastChannel('notificationChannel');

self.addEventListener('notificationclick', function(event) {

  

  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    })
    .then(function(clientList) {
      console.log("mhgfder5678",event)
      event.notification.close();
      const eventData = {
        action: "customAction1",
        data: {body:event.notification.body,title:event.notification.title}
        // Include any other relevant data from the event object here.
      };
     
     
      // Check if any client is already open with the same URL
      for (var i = 0; i < clientList.length; i++) {
        
        var client = clientList[i];
        // client.postMessage({ data:event.notification,action:"customAction1" });
        console.log(client.url)
        if (client?.url?.includes('https://redux-next-2.vercel.app/') ||client?.url?.includes("http://localhost:3000/") && 'focus' in client) {
        //  const channel = new BroadcastChannel('notificationChannel');

          // Send a message to the client code.
         setTimeout(() => {
          channel.postMessage(eventData);
         }, 100);
          return client.focus();
        }
      }
      // If no existing client is open with the same URL, open a new window
      if (clients.openWindow) {

        const channel1 = new BroadcastChannel('notificationChannel');
        setTimeout(() => {
          channel1.postMessage(eventData);
          channel1.close()
         }, 1000);
      //  setTimeout(() => {
      //   const channel = new BroadcastChannel('notificationChannel1');
      //   channel.postMessage(eventData);
      //  }, 800);
        // Send a message to the client code.
      //  setTimeout(() => {
      //   console.log("kjhgf")
      //   channel.postMessage(eventData);
      //   // channel.close()
      //  }, 800);
        return clients.openWindow('https://redux-next-2.vercel.app/');
      }
    })
  );
});
