const IMMUTABLE_INFO = [
  '../src/assets/icons/alram.svg',
  '../src/assets/icons/alram-1.svg',
  '../src/pages/OnedayBuza.js',
  './logo192.png',
  './index.html'
]


self.addEventListener('install', (e) => {
  console.log('서비스워커 install함!', e)
  e.waitUntil(self.cashes.open('MY_CACHE').then(cache => {
    return cache.addAll(IMMUTABLE_INFO)
  }))
})

self.addEventListener('activate', (e) => {
  console.log('서비스워커 activate 시작됨!', e)
})

self.addEventListener('fetch', (e) => {
  console.log('데이터 요청!(fetch)', e.request)
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
