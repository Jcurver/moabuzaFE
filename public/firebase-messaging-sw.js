// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js'

importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js')

importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js',
)

const config = {
  apiKey: 'AIzaSyCGo8nqq7bA-zv87IqQNOS1y9xUJ2t4m1I',
  authDomain: 'moabuza.firebaseapp.com',
  projectId: 'moabuza',
  storageBucket: 'moabuza.appspot.com',
  messagingSenderId: '702007017171',
  appId: '1:702007017171:web:3584da8cde95f03eedde26',
  measurementId: 'G-3PZP7TQ54Y',
}

// initializeApp(config)

firebase.initializeApp(config)

Notification.requestPermission().then((permission) => {
  if (permission === 'granted') {
    console.log('Notification permission granted.')
  } else {
    console.log('Unable to get permission to notify.')
  }
})

// 포그라운드 메시지 수신

// firebase.initializeApp({ messagingSenderId: 702007017171 })

// 버전 업데이트
const VERSION = 'V6'
const CACHE_NAME = `paper-cache_${VERSION}`
const TEXT_CACHE_NAME = `paper-text_${VERSION}`

// 정적 캐시
const IMMUTABLE_APPSHELL = [
  '/public/moa192.png',
  '/public/moa512.png',
  '/public/moa64.png',
  '/src/assets/icons/menu/friend.svg',
  '/src/assets/icons/menu/Asset28.svg',
  '/src/assets/icons/menu/challenge.svg',
  '/src/assets/icons/menu/Vector.svg',
  '/src/assets/icons/menu/setting.svg',
  '/src/assets/icons/menu/together.svg',
  '/src/assets/icons/arrow/backarr.svg',
  '/src/assets/icons/arrow/rightarr.svg',
  '/src/assets/icons/alert/alarm.svg',
  '/src/assets/icons/alert/alarm-1.svg',
  '/src/assets/icons/settings/edit1.svg',
  '/src/assets/icons/settings/logout.svg',
  '/src/assets/icons/settings/review.svg',
  '/src/assets/icons/navbar/challenge.svg',
  '/src/assets/icons/navbar/dchallenge.svg',
  '/src/assets/icons/navbar/home.svg',
  '/src/assets/icons/navbar/dhome.svg',
  '/src/assets/icons/navbar/pay.svg',
  '/src/assets/icons/navbar/dpay.svg',
  '/src/assets/icons/navbar/menu.svg',
  '/src/assets/icons/navbar/dmenu.svg',
  '/src/assets/icons/navbar/together.svg',
  '/src/assets/icons/navbar/dtogether.svg',
  '/src/assets/icons/coin/ico_coin1.png',
  '/src/assets/fonts/NotoSansKR-Black.woff',
  '/src/assets/fonts/NotoSansKR-Bold.woff',
  '/src/assets/fonts/NotoSansKR-DemiLight.woff',
  '/src/assets/fonts/NotoSansKR-Light.woff',
  '/src/assets/fonts/NotoSansKR-Medium.woff',
  '/src/assets/fonts/NotoSansKR-Regular.woff',
  '/src/assets/fonts/NotoSansKR-Thin.woff',
  '/src/assets/fonts/Roboto-Black.woff',
  '/src/assets/fonts/Roboto-BlackItalic.woff',
  '/src/assets/fonts/Roboto-Bold.woff',
  '/src/assets/fonts/Roboto-BoldItalic.woff',
  '/src/assets/fonts/Roboto-Italic.woff',
  '/src/assets/fonts/Roboto-Light.woff',
  '/src/assets/fonts/Roboto-LightItalic.woff',
  '/src/assets/fonts/Roboto-Medium.woff',
  '/src/assets/fonts/Roboto-MediumItalic.woff',
  '/src/assets/fonts/Roboto-Regular.woff',
  '/src/assets/fonts/Roboto-Thin.woff',
  '/src/assets/fonts/Roboto-ThinItalic.woff',
  '/src/pages/MainPage.js',
  '/src/pages/OnedayBuza.js',
  '../src/assets/icons/alram-1.svg',
  '../src/pages/OnedayBuza.js',
  '/logo192.png',
  './index.html',
]

// 동적 캐시
const MUTABLE_APPSHELL = [
  '/src/pages/Alerts.js',
  '/src/pages/FriendsAdd.js',
  '/src/pages/App.js',
  '/src/pages/Bedge.js',
  '/src/pages/CalendarMain.js',
  '/src/pages/ChallengeBuza.js',
  '/src/pages/ChallengeBuzaCreate.js',
  '/src/pages/ChallengeBuzaDetail.js',
]

// 정적 캐시와 동적캐시 하나의 배열로 묶기
const CACHE_LIST = IMMUTABLE_APPSHELL.concat(MUTABLE_APPSHELL)

// 특정 형식 파일 정의(폰트, 사진)
const DYNAMIC_PATTERN = /(\.woff$|\.svg$|\.png$)/

// 서비스워커 설치 (처음 1회만 실행)
self.addEventListener('install', (event) => {
  console.log('서비스워커 install함!', event)

  // 캐시 불러오기
  event.waitUntil(
    caches.open('MY_CACHE').then((cache) => {
      console.log('chaching shell')
      return cache.addAll(CACHE_LIST)
    }),
  )
})

self.addEventListener('activate', (event) => {
  console.log('서비스워커 activate 시작됨!', VERSION)
  // 정의되지 않은 캐시를 삭제해 성능 향상
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key, idx) => {
          if (key !== CACHE_NAME && key !== TEXT_CACHE_NAME) {
            return caches.delete(key)
          }
          return keyList[idx]
        }),
      )
    }),
  )
})

self.addEventListener('fetch', (event) => {
  console.log('데이터 요청!(fetch)', event.request.url)
  const url = new URL(event.request.url)

  // 정적자원 url 포함될시 캐시 후 네트워크
  if (IMMUTABLE_APPSHELL.includes(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request)
      }),
    )
    // 동적자원 url포함시 네트워크 후 캐시
  } else if (MUTABLE_APPSHELL.includes(url.pathname)) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return fetch(event.request)
          .then((networkResponse) => {
            cache.put(event.request, networkResponse.clone())
            return networkResponse
          })
          .catch(() => {
            return cache.match(event.request)
          })
      }),
    )
    // 업로드 또는 정적자원 업데이트 시 캐시 분류
  } else if (
    url.pathname.startsWith('/upload') ||
    DYNAMIC_PATTERN.test(url.pathname)
  ) {
    const TARGET_CACHE = url.pathname.startsWith('/upload')
      ? TEXT_CACHE_NAME
      : CACHE_NAME
    event.respondWith(
      caches.open(TARGET_CACHE).then((cache) => {
        return cache.match(event.request).then((cacheResponse) => {
          if (cacheResponse) {
            return cacheResponse
          }
          return fetch(event.request).then((networkResponse) => {
            cache.put(event.request, networkResponse.clone())
            return networkResponse
          })
        })
      }),
    )
  }
})

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('message', event)
    self.skipWaiting()
  }
})

// Any other custom service worker logic can go here.
self.addEventListener('push', (event) => {
  console.log(event)
  console.log(event.data)
  console.log(event.data.json())
  console.log(event.data.json().notification)
  const { title } = event.data.json().notification
  console.log(title)

  const options = {
    body: event.data.json().notification.body,
    icon: 'favicon.ico',
  }
  console.log(options.body)

  event.waitUntil(self.registration.showNotification(title, options)) // showNotification을 통해 푸시 알림을 생성, Promise가 반환되며 waitUntil을 통해 이벤트를 연장 시켜야함
})

self.addEventListener('notificationclick', (event) => {
  console.log('notificationclick', event)

  event.notification.close()
  event.waitUntil(
    self.clients.openWindow('https://zzzapp.co.kr'), // 예시로 일단 로컬호스트로 링크 누르면 가지는걸로 해놨다.
  )
})
