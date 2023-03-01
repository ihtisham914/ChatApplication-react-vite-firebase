import React, { useEffect, useState } from "react";
import { db } from "../src/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const chatsAll = ({ setActive, activeChat }) => {
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
    });
  }, []);

  return (
    <div className="h-[100vh] w-[100%] sm:w-[25vw] md:w-[25vw] lg:w-[25vw] relative border-r-2 border-primarycolor-300">
      <header className="flex items-center justify-between px-6 bg-primarycolor-500 w-[100%] sm:w-[25vw] md:w-[25vw] lg:w-[25vw] h-[70px] rounded-b-3xl sm:rounded-none md:rounded-none lg:rounded-none fixed top-0 z-30 border-r-2 border-primarycolor-400">
        <span className="text-white text-[24px] font-bold tracking-wider">
          Chats
        </span>
        <img
          src="/search.svg"
          height={30}
          width={30}
          className="cursor-pointer"
        />
      </header>
      <div className="h-[100vh] flex py-6 pr-2 ml-[8px] flex-col gap-3 pt-24 pb-20 overflow-hidden overflow-y-scroll">
        {chats.map((chat, index) => (
          <div
            key={index}
            className={`flex justify-between py-2 text-slate-600 px-[14px] rounded-xl cursor-pointer hover:bg-primarycolor-300 active:bg-primarycolor-300 transition-all ${
              activeChat ? "bg-primarycolor-300" : ""
            }`}
            onClick={() => {
              const reciever = {
                username: chat.username,
                email: chat.email,
                photoURL: chat.photoURL,
              };

              localStorage.setItem("rec", JSON.stringify(reciever));
              setActive(false);
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
