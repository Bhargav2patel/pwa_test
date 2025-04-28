// Import Firebase Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-messaging.js";

// Firebase Config
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

// Register service worker and handle notifications
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);

      // Request Notification Permission
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');

          // Get FCM Token
          getToken(messaging, {
            vapidKey: 'BL_ER_hSz-ZrQFK47ZDhSnOd6oKhNvKo8-bKImrd56ZonZHXbd-LtfDk9UN964FgN5Vg0VyliBxZt5V9V6yTiAI',
            serviceWorkerRegistration: registration
          }).then((currentToken) => {
            if (currentToken) {
              console.log('FCM Token:', currentToken);
              alert("FCM Token Generated!");
              document.getElementById("fcmtoken").innerText = currentToken;
              // Send this token to your backend server if needed
            } else {
              console.warn('No registration token available.');
            }
          }).catch((err) => {
            console.error('An error occurred while retrieving token:', err);
          });

        } else {
          console.warn('Notification permission not granted.');
        }
      });
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}

// Listen for foreground messages
onMessage(messaging, (payload) => {
  console.log('Foreground message received:', payload);

  const { title, body, icon } = payload.notification;

  // Optional: Play custom sound (works only in foreground)
  const audio = new Audio('/pwa_test/sound/notification.mp3');
  audio.play().catch(err => console.warn('Audio play failed:', err));

  // Show notification manually
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration) {
        registration.showNotification(title, {
          body,
          icon: icon || '/pwa_test/images/vak_icon_192px.png',
          badge: '/pwa_test/images/vak_icon_192px.png',
          vibrate: [200, 100, 200],
          actions: [
            { action: 'open_app', title: 'Open App' }
          ],
          data: {
            url: window.location.href
          }
        });
      }
    });
  }
});
