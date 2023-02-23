import React, { useState } from "react";
import { messages } from "../appData/chats";
import { users } from "../appData/users";

const Chat = () => {
  const [msg, setMsg] = useState("");
  const [chats, setChats] = useState(messages);
  const [user, setuser] = useState(users[1]);

  const msgs = chats.sort((x, y) =>
    x.sentAt > y.sentAt ? 1 : x.sentAt < y.sentAt ? -1 : 0
  );

  // sending message
  const sendMessage = () => {
    const newMsg = {
      id: chats.length + 1,
      text: msg,
      senderId: 2,
      recieverId: 1,
      sentAt: new Date().getTime().toString(),
    };
    setChats([...chats, newMsg]);
    setMsg("");
    console.log(newMsg);
  };

  const keydownhandler = () => {
    if (e.key === "Enter") {
      sendMessage();
      e.preventDefault();
    }
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
        {msgs.map((chat, index) => (
          <div key={index}>
            {chat.senderId === 1 ? (
              <div className="bg-primarycolor-300 text-[14px] px-[18px] py-4 w-[80%] rounded-2xl flex">
                {chat.text}
              </div>
            ) : (
              <div className="bg-primarycolor-400 text-white text-[14px] px-[18px] py-4 w-[80%] rounded-2xl ml-[68px]">
                {chat.text}
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
