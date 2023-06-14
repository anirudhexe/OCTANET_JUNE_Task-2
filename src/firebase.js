// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: "todo-list-dfe19.firebaseapp.com",
  projectId: "todo-list-dfe19",
  storageBucket: "todo-list-dfe19.appspot.com",
  messagingSenderId: "480757639019",
  appId: "1:480757639019:web:851eaba7cc99fc560a0e2e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
