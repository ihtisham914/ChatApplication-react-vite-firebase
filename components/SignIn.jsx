import React, { useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { db, auth, GoogleProvider } from "../src/firebase";
import {
  addDoc,
  setDoc,
  collection,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const SignIn = ({ setIsAuth }) => {
  const signInWithGoogle = async () => {
    try {
      // sign in with google
      const result = await signInWithPopup(auth, GoogleProvider);
      cookies.set("auth-token", result.user.refreshToken);
      const currentUserId = auth.currentUser.uid;
      console.log(currentUserId);
      localStorage.setItem("key", JSON.stringify(currentUserId));
      setIsAuth(true);

      // storing the user in firebase database
      const newUser = {
        username: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL,
        // lastSignedIn: serverTimestamp,
      };

      await setDoc(doc(db, "users", currentUserId), newUser);
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex items-center flex-col justify-center h-[100vh]">
      <div className="flex items-center gap-2 mt-3">
        <button
          type="submit"
          className="border-none bg-primarycolor-500 px-2 py-2 rounded-md text-white"
          onClick={signInWithGoogle}
        >
          SignIn with google
        </button>
        <button
          type="submit"
          className="border-none bg-primarycolor-500 px-2 py-2 rounded-md text-white"
          onClick={logOut}
        >
          LogOut
        </button>
      </div>
    </div>
  );
};

export default SignIn;
