importScripts('https://www.gstatic.com/firebasejs/11.6.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.6.0/firebase-messaging-compat.js');

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
        icon: payload.notification.icon || '/images/vak_icon_192px.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Cache during install
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