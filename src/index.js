if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
      console.log("code updated");

      // Link your service worker to Firebase Messaging
      messaging.useServiceWorker(registration);

      // Request Notification permission
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          messaging.getToken({
            vapidKey: "BL_ER_hSz-ZrQFK47ZDhSnOd6oKhNvKo8-bKImrd56ZonZHXbd-LtfDk9UN964FgN5Vg0VyliBxZt5V9V6yTiAI"
          }).then((token) => {
            console.log("FCM Token:", token);
            // send this token to your backend (or store)
          }).catch((err) => {
            console.error("Error getting FCM token", err);
          });
        } else {
          console.log("Permission not granted for notifications");
        }
      });

    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
} else {
  console.log("Service Worker not supported in this browser.");
}

// Your Firebase config (get it from Firebase Console > Project Settings)
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
firebase.initializeApp(firebaseConfig);

// Initialize Messaging
const messaging = firebase.messaging();
