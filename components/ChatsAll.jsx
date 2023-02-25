import React, { useEffect, useState } from "react";
import { users } from "../appData/users";
import { db, auth } from "../src/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

const chatsAll = ({ setActive }) => {
  const [chats, setChats] = useState([]);
  const chatsRef = collection(db, "users");
  const activeUser = JSON.parse(localStorage.getItem("key"));

  useEffect(() => {
    const queryChats = query(chatsRef, where("email", "!=", activeUser.email));
    onSnapshot(queryChats, (snapshot) => {
      let chats = [];
      snapshot.forEach((doc) => {
        chats.push({ ...doc.data(), id: doc.id });
      });
      setChats(chats);
      console.log(chats);
    });
  }, []);

  return (
    <div className="h-[80vh] relative">
      <header className="flex items-center justify-between px-6 bg-primarycolor-500 h-[80px] w-[100%] rounded-b-3xl fixed top-0 z-50">
        <span className="text-white text-[28px] font-bold tracking-wider">
          Messages
        </span>
        <img src="/search.svg" height={30} width={30} />
      </header>
      <div className="flex justify-between py-6 mx-[8px] flex-col gap-3 pt-24 pb-20">
        {chats.map((chat, index) => (
          <div
            key={index}
            className="flex justify-between py-2 text-slate-600 px-[14px] rounded-xl cursor-pointer hover:bg-primarycolor-300 active:bg-primarycolor-300 transition-all"
            onClick={() => {
              const reciever = {
                username: chat.username,
                email: chat.email,
                photoURL: chat.photoURL,
              };

              localStorage.setItem("rec", JSON.stringify(reciever));
              console.log(reciever);
              setActive(true);
            }}
          >
            <div className="flex items-center justify-center gap-3">
              <img
                src={chat.photoURL}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="flex flex-col ">
                <span className="text-[16px] font-bold tracking-wide">
                  {chat.username}
                </span>
                {/* <span className="text-[14]">Hey there, how are you</span> */}
              </div>
            </div>
            <span className="text-[14px]">{chat?.sentAt}</span>
          </div>
        ))}
      </div>
      <nav></nav>
    </div>
  );
};

export default chatsAll;
