// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzW4lqxVMGVqE-HFFK-ncVR38AEI8dXW0",
  authDomain: "skillswap-2b515.firebaseapp.com",
  projectId: "skillswap-2b515",
  storageBucket: "skillswap-2b515.firebasestorage.app",
  messagingSenderId: "479094420867",
  appId: "1:479094420867:web:14e6f147032d5cd0f2f2b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;


