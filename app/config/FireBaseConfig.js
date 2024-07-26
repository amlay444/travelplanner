// import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
  apiKey: "AIzaSyDU6kDFumGgPL1gaTd5p-g43rV5mcOmGVM",
  authDomain: "travel-planner-58577.firebaseapp.com",
  projectId: "travel-planner-58577",
  storageBucket: "travel-planner-58577.appspot.com",
  messagingSenderId: "159469390191",
  appId: "1:159469390191:web:d517c88a7cbe4e4d13009a",
 measurementId: "G-YC4G9R0PZP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = initializeAuth(app, {
 persistence: getReactNativePersistence(AsyncStorage)
});
const firestore = getFirestore(app);

// Function to check if we are running in a browser environment
function isBrowser() {
  return typeof window !== 'undefined' && typeof window.document !== 'undefined';
}

// Check if analytics is supported before initializing
if (isBrowser()) {
  isSupported().then((supported) => {
    if (supported) {
     const analytics = getAnalytics(app);
      console.log("Firebase Analytics initialized");
     } else {
      console.warn("Firebase Analytics is not supported in this environment.");
   }
  });
} else {
console.warn("Not running in a browser environment. Skipping Firebase Analytics initialization.");
}

export { auth, firestore};