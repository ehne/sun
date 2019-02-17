// we'll version our cache (and learn how to delete caches in
// some other post)
caches.delete('v1::static');
caches.delete('v2::static');
caches.delete('v3::static');
const cacheName = 'v4::static';




self.addEventListener('install', e => {
  // once the SW is installed, go ahead and fetch the resources
  // to make this work offline
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        '/',
        './index.html',
        './styles.css',
        './icon512.png',
        './icon192.png',
        './script.js',
        './jquery-3.3.1.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.9/css/weather-icons.css'
        /*
          DEAR READER,
          ADD A LIST OF YOUR ASSETS THAT
          YOU WANT TO WORK WHEN OFFLINE
          TO THIS ARRAY OF URLS
        */
      ]).then(() => self.skipWaiting());
    })
  );
});

// when the browser fetches a url, either response with
// the cached object or go ahead and fetch the actual url
self.addEventListener('fetch', event => {
  event.respondWith(
    // ensure we check the *right* cache to match against
    caches.open(cacheName).then(cache => {
      return cache.match(event.request).then(res => {
        return res || fetch(event.request)
      });
    })
  );
});