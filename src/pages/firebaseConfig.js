// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaFkoVFg8sUef2YMTqG_Xwxe_J42t5JLk",
  authDomain: "test-a498c.firebaseapp.com",
  projectId: "test-a498c",
  storageBucket: "test-a498c.appspot.com",
  messagingSenderId: "845655108779",
  appId: "1:845655108779:web:70a632f2e4677b293bdbee"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);