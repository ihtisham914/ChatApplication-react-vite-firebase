import React, { useEffect, useState } from "react";
import { db } from "../src/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";

const Chat = ({ setActive, activeChat }) => {
  const [msg, setMsg] = useState("");
  const messagesRef = collection(db, "messages");
  const [messages, setMessages] = useState([]);

  const activeUser = JSON.parse(localStorage.getItem("key"));
  const reciever = JSON.parse(localStorage.getItem("rec"));

  // console.log(reciever.email);
  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      // where("senderEmail", "==", activeUser.email),
      // where("recieverEmail", "==", reciever.email),
      orderBy("sentAt")
    );
    onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
      console.log(messages);
    });
  }, []);

  // sending message
  const sendMessage = async () => {
    if (msg === "") return;
    const newMsg = {
      text: msg,
      sentAt: serverTimestamp(),
      senderEmail: activeUser.email,
      recieverEmail: reciever.email,
    };
    setMsg("");
    await addDoc(messagesRef, newMsg);
  };

  const keydownhandler = () => {
    //  here goes code for sending message on keydown /Enter/
  };

  return (
    <div className="h-[100vh] w-[100%] sm:w-[75vw] md:w-[75vw] lg:w-[75vw] relative">
      <header className="flex items-center justify-between px-6 bg-primarycolor-500 h-[70px] w-[100%] sm:w-[75vw] md:w-[75vw] lg:w-[75vw] rounded-b-3xl sm:rounded-none md:rounded-none lg:rounded-none sm:rounded-br-3xl md:rounded-br-3xl lg:rounded-br-3xl fixed top-0 z-50 ">
        <div className="flex items-center gap-2">
          <span onClick={() => setActive(false)}>&larr;</span>
          <img
            src={reciever.photoURL}
            height={40}
            width={40}
            alt="userIcon"
            className="rounded-full"
          />
          <h2 className="text-white text-[18px] font-bold tracking-wider">
            {reciever.username}
          </h2>
        </div>
        <img
          src="/call.svg"
          height={30}
          width={30}
          alt="callIcon"
          className="cursor-pointer"
        />
      </header>
      <div className="h-[100vh] flex justify-center gap-3 flex-col px-[22px] pt-24 pb-20 overflow-y-scroll">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex justify-between w-[100%] ${
              message.senderEmail !== activeUser.email ? "flex-row-reverse" : ""
            } `}
          >
            <div className="w-auto"></div>
            {message.senderEmail === activeUser.email ? (
              <div className="flex items-start justify-between gap-2">
                <div className="bg-primarycolor-400 text-white text-[14px] px-[18px] py-2 rounded-2xl rounded-tr-none">
                  {message.text}
                </div>
                <img
                  src={activeUser.photoURL}
                  className="rounded-full"
                  width={30}
                  height={30}
                  alt="img"
                />
              </div>
            ) : (
              <div className="flex items-start justify-between gap-2">
                <img
                  className="rounded-full"
                  src={reciever.photoURL}
                  width={30}
                  height={30}
                  alt="img"
                />
                <div className="bg-primarycolor-300  text-[14px] px-[18px] py-2 rounded-2xl rounded-tl-none">
                  {message.text}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="w-[100%] py-3 fixed bottom-0 z-50 bg-white">
        <div className="flex items-center justify-between bg-primarycolor-300 rounded-xl mx-[22px] w-[90%] sm:w-[73vw] md:w-[73vw] lg:w-[73vw] px-[22px] py-3 ">
          <input
            placeholder="message"
            type="text"
            className="bg-primarycolor-300 outline-none border-none w-4/5"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />
          <img
            className="cursor-pointer"
            src="/send.svg"
            height={30}
            width={30}
            onClick={sendMessage}
            onKeyDown={keydownhandler}
            alt="sendIcon"
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
