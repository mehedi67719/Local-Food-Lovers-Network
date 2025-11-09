// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBqfiAUqD-xUg2mMruiKa_ogMdwE0zLVA",
  authDomain: "food-lovers-450c0.firebaseapp.com",
  projectId: "food-lovers-450c0",
  storageBucket: "food-lovers-450c0.firebasestorage.app",
  messagingSenderId: "245478067499",
  appId: "1:245478067499:web:8849bf3f2328628f45c96e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);