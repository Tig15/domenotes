import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

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

const auth = getAuth(firebaseApp);
const fireStore = getFirestore(firebaseApp)

const createUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(fireStore, "users", user.uid), {
      email: user.email,
    });

    return user;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    return user;
  } catch (error) {
    throw error;
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export { createUser, loginUser, signOutUser };
