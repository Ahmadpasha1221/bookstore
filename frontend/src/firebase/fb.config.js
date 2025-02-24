import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCkx7jjH_wcgLnEkR_x_3q3h7rgyG4v-Xg",
  authDomain: "organic-beauty-c9368.firebaseapp.com",
  projectId: "organic-beauty-c9368",
  storageBucket: "organic-beauty-c9368.firebasestorage.app",
  messagingSenderId: "609444046806",
  appId: "1:609444046806:web:2943648759288891d22677"
};
  
  // VITE_API_KEY="AIzaSyC_tGX7XCG9EEWCVcgKUgf9uoN4mhz1U8o"
// VITE_AUTH_DOMAIN="book-store-5e1fc.firebaseapp.com"
// VITE_PROJECT_ID="book-store-5e1fc"
// VITE_STORAGE_BUCKET="book-store-5e1fc.firebasestorage.app"
// VITE_MESSAGING_SENDER_ID="825197879134"
// VITE_APP_ID="1:825197879134:web:b4bc321ac653425a0bb9cf"

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
