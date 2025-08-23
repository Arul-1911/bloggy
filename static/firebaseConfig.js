import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: "bloggy-2b881.firebaseapp.com",
  projectId: "bloggy-2b881",
  storageBucket: "bloggy-2b881.firebasestorage.app",
  messagingSenderId: process.env.FB_MSG_ID,
  appId: process.env.FB_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
