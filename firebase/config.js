import { initializeApp, getApps, getApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBbGeJdscx7rrPiNfnzpR7Yp-TBBqV8UyE",
  authDomain: "ferasetcase.firebaseapp.com",
  projectId: "ferasetcase",
  storageBucket: "ferasetcase.appspot.com",
  messagingSenderId: "810041659659",
  appId: "1:810041659659:web:71ae2ea833122b2095920e",
  measurementId: "G-F6WB8WP94K"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db };
