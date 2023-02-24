import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCeZNrV4Ku7VF79ZdkA4dCwgBe9O0ToDcU",
  authDomain: "chatify-62038.firebaseapp.com",
  projectId: "chatify-62038",
  storageBucket: "chatify-62038.appspot.com",
  messagingSenderId: "302792296837",
  appId: "1:302792296837:web:769fed30c60c9c73bb5cec",
});

const auth = getAuth(firebaseApp);
const GoogleProvider = new GoogleAuthProvider();

export { auth, GoogleProvider };
