"use client";
import React, { useEffect, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { db, auth, GoogleProvider } from "@/app/firebase";
import { addDoc, collection } from "firebase/firestore";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { SignInSuccess } from "@/GlobalState/UserSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const cookies = new Cookies();

const page = () => {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const userRef = collection(db, "users");
  const signInWithGoogle = async () => {
    try {
      // sign in with google
      const result = await signInWithPopup(auth, GoogleProvider);
      cookies.set("auth-token", result.user.refreshToken);

      const ActiveUser = {
        username: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL,
      };
      dispatch(SignInSuccess(ActiveUser));

      // storing the user in firebase database
      await addDoc(userRef, ActiveUser);
      navigate.push("/");

      toast.success("Signed in successfully", {
        style: { width: "auto", height: "auto" },
      });
    } catch (error) {
      console.log(error);
      toast.error("There was an error while signing you in", {
        style: { width: "auto", height: "auto" },
      });
    }
  };

  return (
    <div className="flex items-center flex-col justify-center h-screen w-screen">
      <img src="/chat.png" alt="Chatify logo" height={120} width={120} />
      <h1 className="text-primarycolor-500 text-4xl font-bold mt-1">Chatify</h1>
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
          onClick={() =>
            toast.error("This feature is under development", {
              style: { width: "auto", height: "auto" },
            })
          }
          title="This feature is under development"
          className="cursor-pointer flex gap-2 items-center border-2 border-gray-400 px-6 py-2 rounded-3xl font-bold text-gray-700 hover:border-primarycolor-500 active:border-primarycolor-500"
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

export default page;
