// /* eslint-disable vars-on-top */
// // Scripts for firebase and firebase messaging
// importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js')
// importScripts(
//   'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js',
// )

// // Initialize the Firebase app in the service worker by passing the generated config
// // eslint-disable-next-line no-var
// var firebaseConfig = {
//   apiKey: 'AIzaSyCGo8nqq7bA-zv87IqQNOS1y9xUJ2t4m1I',
//   authDomain: 'moabuza.firebaseapp.com',
//   projectId: 'moabuza',
//   storageBucket: 'moabuza.appspot.com',
//   messagingSenderId: '702007017171',
//   appId: '1:702007017171:web:3584da8cde95f03eedde26',
//   measurementId: 'G-3PZP7TQ54Y',
// }

// firebase.initializeApp(firebaseConfig)

// // Retrieve firebase messaging
// const messaging = firebase.messaging()

// // eslint-disable-next-line func-names
// messaging.onBackgroundMessage(function (payload) {
//   console.log('Received background message ', payload)

//   const notificationTitle = payload.notification.title
//   const notificationOptions = {
//     body: payload.notification.body,
//   }

//   self.registration.showNotification(notificationTitle, notificationOptions)
// })
