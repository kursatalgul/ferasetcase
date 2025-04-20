import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyBbGeJdscx7rrPiNfnzpR7Yp-TBBqV8UyE",
  authDomain: "ferasetcase.firebaseapp.com",
  projectId: "ferasetcase",
  storageBucket: "ferasetcase.firebasestorage.app",
  messagingSenderId: "810041659659",
  appId: "1:810041659659:web:71ae2ea833122b2095920e",
  measurementId: "G-F6WB8WP94K"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
