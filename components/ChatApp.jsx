import React, { useState } from "react";
import Chat from "./Chat";
import ChatsAll from "./ChatsAll";

const ChatApp = () => {
  const [activeChat, setActive] = useState(false);

  // const activeChat = JSON.parse(localStorage.getItem("enter"));
  // console.log(activeChat);
  // return <>{activeChat === true ? <Chat /> : <ChatsAll />}</>;
  return (
    <>
      {activeChat ? (
        <Chat setActive={setActive} />
      ) : (
        <ChatsAll setActive={setActive} />
      )}
    </>
  );
};

export default ChatApp;
