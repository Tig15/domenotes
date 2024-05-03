import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDv7sBqbySlSXXcwaGPEYLdf0pSuOi7CbA",
  authDomain: "domenotes-c04cc.firebaseapp.com",
  projectId: "domenotes-c04cc",
  storageBucket: "domenotes-c04cc.appspot.com",
  messagingSenderId: "733327331537",
  appId: "1:733327331537:web:d7654ea951aa89678675f0",
};


const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;