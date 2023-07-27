// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCu4ZQLQk5j9OCLqMxwUjylymBD-2bh-Zo",
    authDomain: "newchat-2334e.firebaseapp.com",
    projectId: "newchat-2334e",
    storageBucket: "newchat-2334e.appspot.com",
    messagingSenderId: "311631478525",
    appId: "1:311631478525:web:1c4dc87628cf6a61db4894"
  };
  

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth()
export const storage = getStorage();
export const db= getFirestore()
