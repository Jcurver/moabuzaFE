import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import firebase from 'firebase/compat/app'

const config = {
  apiKey: 'AIzaSyCGo8nqq7bA-zv87IqQNOS1y9xUJ2t4m1I',
  authDomain: 'moabuza.firebaseapp.com',
  projectId: 'moabuza',
  storageBucket: 'moabuza.appspot.com',
  messagingSenderId: '702007017171',
  appId: '1:702007017171:web:3584da8cde95f03eedde26',
  measurementId: 'G-3PZP7TQ54Y',
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
} else {
  firebase.app()
}


// const app = initializeApp(config)
const messaging = getMessaging()

// 토큰값 얻기
getToken(messaging, {
  vapidKey:process.env.REACT_APP_VAPID_KEY,
})
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
      console.log('currentToken:::', currentToken)
    } else {
      // Show permission request UI
      console.log(
        'No registration token available. Request permission to generate one.',
      )
      // ...
    }
  })
  .catch((err) => {
    console.log('An error occurred while retrieving token. ', err)
    // ...
  })

// 포그라운드 메시지 수신
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload)
  // ...
})
