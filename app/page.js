"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { db } from "@/app/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import HomeScreen from "@/components/HomeScreen";

export default function Home() {
  const navigate = useRouter();
  const ActiveUser = useSelector((state) => state.User.ActiveUser);
  const ChatActive = useSelector((state) => state.User.ChatActive);
  console.log(ActiveUser);

  if (!ActiveUser.email) navigate.push("/Auth");
  return <>{ActiveUser.email && <HomeScreen />}</>;
}
