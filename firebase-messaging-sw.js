// Import Firebase Scripts
importScripts('https://www.gstatic.com/firebasejs/11.6.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.6.0/firebase-messaging-compat.js');

// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyCSrX7qrYy6PjuiKRpYQI9LrClG_9O2oZI",
    authDomain: "pwa-test-50815.firebaseapp.com",
    projectId: "pwa-test-50815",
    storageBucket: "pwa-test-50815.firebasestorage.app",
    messagingSenderId: "301083872918",
    appId: "1:301083872918:web:33f4df7031ec45153c7cb7",
    measurementId: "G-W9JWLVND44"
});

const messaging = firebase.messaging();

// Handle background push messages
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Background message received:', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon || '/pwa_test/images/vak_icon_192px.png',
        badge: '/pwa_test/images/vak_icon_192px.png',
        vibrate: [200, 100, 200],
        actions: [
            { action: 'open_app', title: 'Open App' },
            { action: 'dismiss', title: 'Dismiss' }
        ],
        data: {
            url: '/pwa_test/' // Default URL when clicked
        }
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click events
self.addEventListener('notificationclick', (event) => {
    console.log('[firebase-messaging-sw.js] Notification click Received:', event);

    event.notification.close();

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                if (client.url.includes('/pwa_test') && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(event.notification.data.url || '/pwa_test/');
            }
        })
    );
});

// Caching Setup
const CACHE_NAME = 'my-app-cache-v1';
const urlsToCache = [
    '/pwa_test/index.html',
    '/pwa_test/src/master.css',
    '/pwa_test/src/index.js',
    '/pwa_test/images/vak_icon_192px.png',
];

// Cache files on install
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Install');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Caching app shell');
            return cache.addAll(urlsToCache);
        })
    );
});

// Clean up old caches on activate
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activate');
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event with fallback
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request)
                    .catch(() => caches.match('/pwa_test/index.html'));
            })
    );
});
