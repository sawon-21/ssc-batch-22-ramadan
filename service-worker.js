// Cache name
const CACHE_NAME = 'my-cache-v-0002';

// Files to cache
const urlsToCache = [
  '/',
  '/index.html',
  '/logo.png',
  '/Quran.jpg',
  '/poster.jpg',
  'https://quran.com/bn',
  'https://fonts.googleapis.com/css?family=Noto+Sans+Bengali:300,400,700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
  'https://fonts.maateen.me/apona-lohit/font.css'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Push Notification Handler
self.addEventListener('push', function (event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "Ramadan Reminder";
  const options = {
    body: data.body || "Time for a short dua and reflection!",
    icon: 'logo.png',
    badge: 'logo.png',
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});