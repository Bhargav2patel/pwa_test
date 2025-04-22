if ("serviceWorker" in navigator) {
  //   window.addEventListener("load", () => {
  navigator.serviceWorker
    .register("sw.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
      console.log("code updated");
      
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
  //   });

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

// Ask permission and get token
messaging.requestPermission()
  .then(() => messaging.getToken({ vapidKey: "BL_ER_hSz-ZrQFK47ZDhSnOd6oKhNvKo8-bKImrd56ZonZHXbd-LtfDk9UN964FgN5Vg0VyliBxZt5V9V6yTiAI" }))
  .then((token) => {
    console.log("FCM Token:", token);
    // You can send this token to your backend to send notifications
  })
  .catch((err) => {
    console.error("Permission denied or error in getting token", err);
  });
