import { getAnalytics } from "firebase/analytics"
import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "iaan-4a273.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
