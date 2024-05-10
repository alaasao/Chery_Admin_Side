import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyBsNCPXw5VweRsVxeOWDadp_enscirRabE",
  authDomain: "cherry-36cfa.firebaseapp.com",
  projectId: "cherry-36cfa",
  storageBucket: "cherry-36cfa.appspot.com",
  messagingSenderId: "745386153395",
  appId: "1:745386153395:web:bca2eea44ccd602fff67c6",
  measurementId: "G-775BNL1NGR"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)