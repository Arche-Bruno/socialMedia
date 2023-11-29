// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{ getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage, ref } from "firebase/storage";
import { serverTimestamp } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBuvztnZgjMajxvQ6heIuRqOeM1tVx4RYE",
  authDomain: "cachueleate-3626d.firebaseapp.com",
  projectId: "cachueleate-3626d",
  storageBucket: "cachueleate-3626d.appspot.com",
  messagingSenderId: "203100443264",
  appId: "1:203100443264:web:16f4293ec0473508290c65",
  measurementId: "G-0E79HSBXYP"
};


const app = initializeApp(firebaseConfig);
 const auth= getAuth(app)
 
const dbRealTime = getDatabase(app);

const storage = getStorage(app);


export { auth, dbRealTime, storage, ref,serverTimestamp  };

const analytics = getAnalytics(app);