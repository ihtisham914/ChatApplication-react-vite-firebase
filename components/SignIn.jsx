import React, { useState } from "react";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, GoogleProvider } from "../src/firebase";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  console.log(auth?.currentUser?.email);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, GoogleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
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
      <form className="flex flex-col justify-center gap-3 px-[22px] ">
        <input
          className="outline-none border-2 border-primarycolor-500 p-2 rounded-lg"
          placeholder="Your Email"
          type="email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          className="outline-none border-2 border-primarycolor-500 p-2 rounded-lg"
          placeholder="Password"
          type="password"
          name="password"
          id="pass"
          onChange={(e) => setPass(e.target.value)}
          value={pass}
        />
        <button
          type="submit"
          className="border-none bg-primarycolor-500 px-2 py-2 rounded-md text-white"
          onClick={signIn}
        >
          SignIn
        </button>
      </form>
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
