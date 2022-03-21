// // import firebase from 'firebase/compat/app'

// import firebase from 'firebase/compat/app'
// import 'firebase/compat/database'

// // 프로젝트 버전 확인

// const self = this

// // eslint-disable-next-line no-undef
// importScripts('https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js')

// // eslint-disable-next-line no-undef
// importScripts('https://www.gstatic.com/firebasejs/9.6.9/firebase-messaging.js')

// const config = {
//   apiKey: 'AIzaSyCGo8nqq7bA-zv87IqQNOS1y9xUJ2t4m1I',
//   authDomain: 'moabuza.firebaseapp.com',
//   projectId: 'moabuza',
//   storageBucket: 'moabuza.appspot.com',
//   messagingSenderId: '702007017171',
//   appId: '1:702007017171:web:3584da8cde95f03eedde26',
//   measurementId: 'G-3PZP7TQ54Y',
// }

// // Initialize Firebase
// // eslint-disable-next-line no-undef

// firebase.initializeApp(config)

// // eslint-disable-next-line no-undef

// const messaging = firebase.messaging()

// // 백그라운드 서비스워커 설정

// messaging.onBackgroundMessage(messaging, (payload) => {
//   console.log(
//     '[firebase-messaging-sw.js] Received background message ',
//     payload,
//   )

//   // Customize notification here
//   const notificationTitle = 'Background Message Title'
//   const notificationOptions = {
//     body: payload,
//     icon: '/firebase-logo.png',
//   }

//   self.registration.showNotification(notificationTitle, notificationOptions)
// })

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('message', event)
    self.skipWaiting()
  }
})

// Any other custom service worker logic can go here.
self.addEventListener('push', function (event) {
  console.log(event)
  console.log(event.data)
  console.log(event.data.json())
  console.log(event.data.json().notification)
  const {title} = event.data.json().notification
  console.log(title)

  const options = {
    body: event.data.json().notification.body,
    icon: 'favicon.ico',
  }
  console.log(options.body)

  event.waitUntil(self.registration.showNotification(title, options)) // showNotification을 통해 푸시 알림을 생성, Promise가 반환되며 waitUntil을 통해 이벤트를 연장 시켜야함
})

self.addEventListener('notificationclick', function (event) {
  console.log('notificationclick', event)

  event.notification.close()
  event.waitUntil(
    self.clients.openWindow('https://zzzapp.co.kr'), // 예시로 일단 로컬호스트로 링크 누르면 가지는걸로 해놨다.
  )
})