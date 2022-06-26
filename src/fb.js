// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDrfDMk41JCtBgGkPAYJNG-5LLsTJIFGpk",
    authDomain: "boptabs.firebaseapp.com",
    projectId: "boptabs",
    storageBucket: "boptabs.appspot.com",
    messagingSenderId: "903609117778",
    appId: "1:903609117778:web:e4367c4b8af0894161c38b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app