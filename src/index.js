if ("serviceWorker" in navigator) {
  //   window.addEventListener("load", () => {
  navigator.serviceWorker
    .register("sw.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
  //   });

} else {
  console.log("Service Worker not supported in this browser.");
}


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyCSrX7qrYy6PjuiKRpYQI9LrClG_9O2oZI",
  authDomain: "pwa-test-50815.firebaseapp.com",
  projectId: "pwa-test-50815",
  storageBucket: "pwa-test-50815.firebasestorage.app",
  messagingSenderId: "301083872918",
  appId: "1:301083872918:web:33f4df7031ec45153c7cb7",
  measurementId: "G-W9JWLVND44"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// 🔐 Request Permission
async function requestPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');

      const token = await getToken(messaging, {
        vapidKey: "BL_ER_hSz-ZrQFK47ZDhSnOd6oKhNvKo8-bKImrd56ZonZHXbd-LtfDk9UN964FgN5Vg0VyliBxZt5V9V6yTiAI"
      });

      if (token) {
        console.log("FCM Token:", token);
        // Save/send this token to your server
      } else {
        console.warn("No registration token available.");
      }

    } else {
      console.warn('Notification permission not granted.');
    }
  } catch (err) {
    console.error('An error occurred while retrieving token:', err);
  }
}

requestPermission();

// Listen for foreground messages
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
});
