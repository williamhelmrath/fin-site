// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDj09-EHo_j2Tx9Cjiiulx6blTRzIh5Axg",
  authDomain: "fin-site-21565.firebaseapp.com",
  projectId: "fin-site-21565",
  storageBucket: "fin-site-21565.appspot.com",
  messagingSenderId: "838503786590",
  appId: "1:838503786590:web:7c1163ea0b9f105a73accf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
