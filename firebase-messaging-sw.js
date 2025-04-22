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

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Background message received:', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon,
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});
