import React from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { db, auth, GoogleProvider } from "../src/firebase";
import { addDoc, collection } from "firebase/firestore";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const SignIn = ({ setIsAuth }) => {
  const userRef = collection(db, "users");
  const signInWithGoogle = async () => {
    try {
      // sign in with google
      const result = await signInWithPopup(auth, GoogleProvider);
      cookies.set("auth-token", result.user.refreshToken);

      const activeUser = {
        username: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL,
      };
      localStorage.setItem("key", JSON.stringify(activeUser));
      setIsAuth(true);

      // storing the user in firebase database

      const queryUsers = query(userRef, where("email", "==", activeUser.email));
      if (queryUsers) return;
      const newUser = {
        username: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL,
        // lastSignedIn: serverTimestamp,
      };

      await addDoc(userRef, newUser);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center flex-col justify-center h-[100vh]">
      <h1 className="text-primarycolor-500 text-4xl font-bold">Chatify</h1>
      <p className="text-lg mt-2">An instant WebChating application</p>
      <div className="h-[2px] bg-slate-300 w-80 mt-6 mb-4"></div>
      <span>SignIn with</span>
      <div className="flex items-center flex-col gap-2 mt-3">
        <div
          title="LogIn with google"
          className="flex gap-2 items-center border-2 border-gray-400 px-4 py-2 rounded-3xl font-bold text-gray-700 hover:border-primarycolor-500 active:border-primarycolor-500 cursor-pointer"
          onClick={signInWithGoogle}
        >
          <img src="/google.png" height={28} width={28} alt="google logo" />
          <span>Continue with Google</span>
        </div>
        <div
          title="This feature with come soon"
          className="flex gap-2 items-center border-2 border-gray-400 px-6 py-2 rounded-3xl font-bold text-gray-700 hover:border-primarycolor-500 active:border-primarycolor-500 cursor-not-allowed"
        >
          <img src="/apple.png" height={25} width={25} alt="apple logo" />
          <span>Continue with Apple</span>
        </div>
        <p className="mt-6">
          Designed and Developed by{" "}
          <a
            href="https://github.com/ihtisham914"
            className="text-primarycolor-500 underline cursor-pointer"
          >
            Ihtisham Ul Haq
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
