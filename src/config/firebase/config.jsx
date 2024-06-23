import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket:import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
}

// VITE_Main_ENDPOINT=https://axeiny.tech:4004/
// VITE_API_KEY =AIzaSyBsNCPXw5VweRsVxeOWDadp_enscirRabE 
// VITE_AUTH_DOMAIN =cherry-36cfa.firebaseapp.com  
// VITE_PROJECT_ID =cherry-36cfa 
// VITE_STORAGE_BUCKET =cherry-36cfa.appspot.com  
// VITE_MESSAGING_SENDER_ID =745386153395  
// VITE_APP_ID =1:745386153395:web:bca2eea44ccd602fff67c6  
// VITE_MEASUREMENT_ID=G-775BNL1NGR 

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)
