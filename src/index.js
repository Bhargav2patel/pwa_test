// index.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-messaging.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCSrX7qrYy6PjuiKRpYQI9LrClG_9O2oZI",
  authDomain: "pwa-test-50815.firebaseapp.com",
  projectId: "pwa-test-50815",
  storageBucket: "pwa-test-50815.firebasestorage.app",
  messagingSenderId: "301083872918",
  appId: "1:301083872918:web:33f4df7031ec45153c7cb7",
  measurementId: "G-W9JWLVND44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered:', registration.scope);

      // Request notification permission
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          getToken(messaging, {
            vapidKey: 'BL_ER_hSz-ZrQFK47ZDhSnOd6oKhNvKo8-bKImrd56ZonZHXbd-LtfDk9UN964FgN5Vg0VyliBxZt5V9V6yTiAI',
            serviceWorkerRegistration: registration
          }).then((token) => {
            console.log('FCM Token:', token);
            alert("FCM Token Generated");
            document.getElementById("fcmtoken").innerText = token;
            // Store or send this token to your backend
          }).catch((err) => {
            console.error('Error getting token:', err);
          });
        } else {
          console.warn('Notification permission not granted.');
        }
      });
    }).catch((err) => {
      console.error('Service Worker registration failed:', err);
    });
}

// Listen for foreground messages
onMessage(messaging, (payload) => {
  console.log('Foreground message received:', payload);

  const { title, body } = payload.notification;
  alert("Foreground message received: " + JSON.stringify(payload.notification));
  // Show native-style notification
  if (Notification.permission === 'granted') {
    setTimeout(() => {
      new Notification(title, {
        body,
        icon: '/pwa_test/images/vak_icon_192px.png' || '/images/vak_icon_192px.png'
      });
    }, 100);
  }
});

