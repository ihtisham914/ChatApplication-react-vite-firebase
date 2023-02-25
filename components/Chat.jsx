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

const Chat = () => {
  const [msg, setMsg] = useState("");
  const messagesRef = collection(db, "messages");
  const [messages, setMessages] = useState([]);
  const [user, setuser] = useState(users[1]);

  const currentUserId = JSON.parse(localStorage.getItem("key"));

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("senderId", "==", currentUserId)
    );
    onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
  }, []);

  // sending message
  const sendMessage = async () => {
    if (msg === "") return;
    const newMsg = {
      text: msg,
      sentAt: serverTimestamp(),
      senderId: currentUserId,
      recieverId: 1,
    };
    setMsg("");
    await addDoc(messagesRef, newMsg);
    // console.log(newMsg);
  };

  const keydownhandler = () => {
    // if (e.key === "Enter") {
    //   sendMessage();
    //   e.preventDefault();
    // }
  };

  return (
    <div className="h-[80vh] relative">
      <header className="flex items-center justify-between px-6 bg-primarycolor-500 h-[80px] w-[100%] rounded-b-3xl fixed top-0 z-50">
        <div className="flex items-center gap-2">
          <img src="/user.png" height={50} width={50} alt="userIcon" />
          <h2 className="text-white text-[20px] font-bold tracking-wider">
            {user.name}
          </h2>
        </div>
        <img src="/call.svg" height={30} width={30} alt="callIcon" />
      </header>
      <div className="flex justify-center gap-2 flex-col px-[22px] pt-24 pb-20">
        {messages.map((message, index) => (
          <div key={index}>
            {message.senderId === currentUserId ? (
              <div className="bg-primarycolor-400 text-white text-[14px] px-[18px] py-4 w-[80%] rounded-2xl ml-[68px]">
                {message.text}
              </div>
            ) : (
              <div className="bg-primarycolor-300 text-[14px] px-[18px] py-4 w-[80%] rounded-2xl flex">
                {message.text}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between bg-primarycolor-300 rounded-xl mx-[22px]  w-[90%] px-[22px] py-3 fixed bottom-2 z-50">
        <input
          placeholder="message"
          type="text"
          className="bg-primarycolor-300 outline-none border-none"
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
  );
};

export default Chat;
