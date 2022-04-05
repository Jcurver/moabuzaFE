import React, { Suspense, lazy, useState, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Routes, Route } from 'react-router'
import { ReactQueryDevtools } from 'react-query/devtools'
import { getToken, onMessage, getMessaging } from 'firebase/messaging'
import styled from 'styled-components'
import { firebaseApp } from '../utils/firebase'
// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-moabuza.js'
import { setItem } from '../utils/sessionStorage'
import ErrorLog from './ErrorLog'
import Loading from './Loading'
import Fcmprac from './Fcmprac'
import Settings from './Settings'
import Menu from './Menu'
import Modified from './Modified'
import KakaoLogin from '../components/KakaoLogin'
import '../utils/fcm'

const MainPage = lazy(() => import('./MainPage'))
const Alerts = lazy(() => import('./Alerts'))
const AlertsGroup = lazy(() => import('./AlertsGroup'))
const AlertsChallenge = lazy(() => import('./AlertsChallenge'))
const Login = lazy(() => import('./Login'))

const OnedayBuza = lazy(() => import('./OnedayBuza'))
const OnedayPost = lazy(() => import('./OnedayPost'))
const Group = lazy(() => import('./Group'))
const ChallengeBuza = lazy(() => import('./ChallengeBuza'))
const ChallengeBuzaCreate = lazy(() => import('./ChallengeBuzaCreate'))
const ChallengeBuzaDetail = lazy(() => import('./ChallengeBuzaDetail'))

const KakaoAuthHandle = lazy(() => import('../components/KakaoLogin'))
const Friends = lazy(() => import('./Friends'))
const FriendsAdd = lazy(() => import('./FriendsAdd.js'))

const GroupBuza = lazy(() => import('./GroupBuza'))
const GroupBuzaCreate = lazy(() => import('./GroupBuzaCreate'))
const GroupBuzaDetail = lazy(() => import('./GroupBuzaDetail'))

const UserInfo = lazy(() => import('./UserInfo'))
const OnBoarding = lazy(() => import('./OnBoarding'))

function App() {
  // let swRegist = null

  // const [Token, setToken] = useState(null)

  // getToken(messaging, {
  //   vapidKey: process.env.REACT_APP_VAPID_KEY,

  // }).then((token) => {
  //   console.log('token', token)
  //   setToken(token)
  //   swRegist = messaging.swRegistration
  // })

  // // async 를 사용학 위해 메서드로 따로 분리함
  // const firebaseMessageToken = async () => {
  //   const token = await getToken()
  //   console.log('token === ', token)
  // }
  // // 추후 서버에 토큰을 저장하는 기능을 여기에 추가
  // useEffect(() => {
  //   firebaseMessageToken()
  // }, [])

  // importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js')

  // importScripts(
  //   'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js',
  // )

  // const config = {
  //   apiKey: 'AIzaSyCGo8nqq7bA-zv87IqQNOS1y9xUJ2t4m1I',
  //   authDomain: 'moabuza.firebaseapp.com',
  //   projectId: 'moabuza',
  //   storageBucket: 'moabuza.appspot.com',
  //   messagingSenderId: '702007017171',
  //   appId: '1:702007017171:web:3584da8cde95f03eedde26',
  //   measurementId: 'G-3PZP7TQ54Y',
  // }

  // const firebaseApp = initializeApp(config)

  // const messaging = getMessaging(firebaseApp)

  // // 토큰값 얻기
  // getToken(messaging, {
  //   vapidKey: process.env.REACT_APP_VAPID_KEY,
  // })
  //   .then((currentToken) => {
  //     if (currentToken) {
  //       // Send the token to your server and update the UI if necessary
  //       // ...
  //       console.log('FCM User Token 최초 수신:::', currentToken)
  //       setItem('fcmToken', currentToken)
  //     } else {
  //       // Show permission request UI
  //       console.log(
  //         'No registration token available. Request permission to generate one.',
  //       )
  //       // ...
  //     }
  //     return currentToken
  //   })
  //   .catch((err) => {
  //     console.log('An error occurred while retrieving token. ', err)
  //     // ...
  //   })

  // onMessage(messaging, (payload) => {
  //   console.log('Message received. ', payload)
  //   // ...
  // })

  // const firebaseMessaging = getMessaging(firebaseApp)
  // getToken(firebaseMessaging, {
  //   vapidKey: process.env.REACT_APP_VAPID_KEY,
  // })
  //   .then((currentToken) => {
  //     console.log(currentToken)
  //     if (currentToken) {
  //       apis.pushAlarm(currentToken).then((response) => {
  //         console.log(response)
  //       })
  //     } else {
  //       console.log('not alarm registered')
  //     }
  //   })
  //   .catch((error) => console.log(error))

  // onMessage(firebaseMessaging, (payload) => {
  //   console.log('foregroundMessage')
  //   console.log('여기 되면 대박', payload)

  //   const date = new Date()
  //   const now = date.getTime()

  //   if (payload) {
  //     dispatch(
  //       addNotificationList({
  //         title: payload.notification.title,
  //         body: payload.notification.body,
  //         createdAt: now,
  //       }),
  //     )
  //   }
  // })
  // Initialize the Firebase app in the service worker by passing the generated config
  const firebaseConfig = {
    apiKey: 'AIzaSyD0u9HX41rjh3MnO93isinkSuxzLEH22GI',
    authDomain: 'boiler-e3497.firebaseapp.com',
    projectId: 'boiler-e3497',
    storageBucket: 'boiler-e3497.appspot.com',
    messagingSenderId: '128639882477',
    appId: '1:128639882477:web:4e0c086f572ce6b9a468e4',
  }

  firebase.initializeApp(firebaseConfig)

  // Retrieve firebase messaging
  const messaging = firebase.messaging()

  messaging.onBackgroundMessage((payload) => {
    console.log('Received background message ', payload)

    const notificationTitle = payload.notification.title
    const notificationOptions = {
      body: payload.notification.body,
    }

    self.registration.showNotification(notificationTitle, notificationOptions)
  })

  // 토큰값 얻기
  getToken(messaging, {
    vapidKey: process.env.REACT_APP_VAPID_KEY,
  })
    .then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...
        console.log('FCM User Token 최초 수신:::', currentToken)
        setItem('fcmToken', currentToken)
      } else {
        // Show permission request UI
        console.log(
          'No registration token available. Request permission to generate one.',
        )
        // ...
      }
      return currentToken
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err)
      // ...
    })

  // // Notification.requestPermission().then((permission) => {
  // //   if (permission === 'granted') {
  // //     console.log('Notification permission granted.')
  // //   } else {
  // //     console.log('Unable to get permission to notify.')
  // //   }
  // // })

  // 포그라운드 메시지 수신
  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload)
    // ...
  })

  return (
    <ErrorBoundary FallbackComponent={KakaoLogin}>
      <Suspense fallback={<Loading />}>
        <MainDiv>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/fcmprac" element={<Fcmprac />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/alertsgroup" element={<AlertsGroup />} />
            <Route path="/alertschallenge" element={<AlertsChallenge />} />
            <Route path="/onedaybuza" element={<OnedayBuza />} />
            <Route path="/onedaypost" element={<OnedayPost />} />
            <Route path="/group" element={<Group />} />
            <Route path="/challengebuza" element={<ChallengeBuza />} />
            <Route
              path="/challengebuzacreate"
              element={<ChallengeBuzaCreate />}
            />
            <Route
              path="/challengebuzadetail"
              element={<ChallengeBuzaDetail />}
            />
            <Route path="/kakaologin" element={<KakaoLogin />} />
            <Route path="/callback" element={<KakaoAuthHandle />} />

            <Route path="/settings" element={<Settings />} />
            <Route path="/modified" element={<Modified />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/friends/add" element={<FriendsAdd />} />
            <Route path="/groupbuza" element={<GroupBuza />} />
            <Route path="/groupbuzacreate" element={<GroupBuzaCreate />} />
            <Route path="/groupbuzadetail" element={<GroupBuzaDetail />} />
            <Route path="/user/kakao/callback/*" element={<UserInfo />} />
            <Route path="/onboarding" element={<OnBoarding />} />
            <Route path="/loading" element={<Loading />} />
          </Routes>
        </MainDiv>
      </Suspense>
    </ErrorBoundary>
  )
}

const MainDiv = styled.div`
  height: 100%;
  position: fixed;
  left: 50%;
  margin: 0 auto;
  padding: 0px;
  left: 0;
  right: 0;
  overflow: hidden;
  width: 100%;

  -webkit-full-screen {
    width: 100%;
    height: 100%;
  }
`

export default App
