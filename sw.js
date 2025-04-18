const CACHE_NAME = 'my-app-cache-v1';
const urlsToCache = [
    'index.html',
    'src/master.css',
    'src/index.js',
    'images/vak_icon_192px.png',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});