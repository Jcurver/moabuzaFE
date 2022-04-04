/* eslint-disable array-callback-return */
// 캐시 이름
const CACHE_NAME = 'cache-v2'

// 캐싱할 파일
const FILES_TO_CACHE = ['/']

// 상술한 파일 캐싱
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE)),
  )
})

// CACHE_NAME이 변경되면 오래된 캐시 삭제
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        // eslint-disable-next-line array-callback-return
        // eslint-disable-next-line consistent-return
        keyList.map((key) => {
          if (CACHE_NAME !== key) return caches.delete(key)
        }),
      ),
    ),
  )
})

// 요청에 실패
self.addEventListener('fetch', (event) => {
  // eslint-disable-next-line yoda
  if ('navigate' !== event.request.mode) return

  event.respondWith(
    fetch(event.request).catch(() =>
      caches.open(CACHE_NAME).then((cache) => cache.match('/')),
    ),
  )
})
