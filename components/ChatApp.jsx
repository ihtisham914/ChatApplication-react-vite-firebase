import React, { useState } from "react";
import Chat from "./Chat";
import ChatsAll from "./ChatsAll";

const ChatApp = () => {
  const [activeChat, setActive] = useState(false);

  return (
    <div className="sm:flex md:flex lg:flex h-[100vh] w-[100vw]">
      <div
        className={`${
          activeChat ? "hidden" : "display-block"
        } sm:block md:block lg:block w-[100%] sm:w-[25vw] md:w-[25vw] lg:w-[25vw]`}
      >
        <ChatsAll setActive={setActive} activeChat={activeChat} />
      </div>
      <div
        className={`${
          activeChat ? "display-block" : "hidden"
        } sm:block md:block lg:block w-[100%] sm:w-[75vw] md:w-[75vw] lg:w-[75vw]`}
      >
        <Chat setActive={setActive} activeChat={activeChat} />
      </div>
    </div>
  );
};

export default ChatApp;
