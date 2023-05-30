import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import ChatsAll from "./ChatsAll";
import dev from "../appData/developer";

const ChatApp = () => {
  const [activeChat, setActive] = useState(false);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    const popupstatus = JSON.parse(localStorage.getItem("modal"));
    if (!popupstatus) {
      setModal(true);
      localStorage.setItem("modal", true);
    }
  }, []);

  const accounts = [
    {
      name: "LinkedIn",
      logo: "/linkedin.png",
    },
    {
      name: "GitHub",
      logo: "/github.png",
    },
    {
      name: "GitLab",
      logo: "/gitlab.png",
    },
    {
      name: "Twitter",
      logo: "/twitter.png",
    },
  ];

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
      {modal ? (
        <div className="flex items-center justify-center fixed h-full w-full bg-slate-50/50 z-50  top-0 bottom-0 right-0 left-0 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center gap-2 bg-white border-2 border-primarycolor-500 rounded-lg p-6">
            <h1 className="text-start mb-4 text-gray-400 font-bold">
              About Developer:
            </h1>
            <img
              src="/devPhoto.png"
              className="rounded-full"
              width={150}
              height={150}
              alt="dev image"
            />
            <h1 className="text-green-400 font-semibold">{dev.name}</h1>
            <h3 className="text-primarycolor-400">{dev.title}</h3>
            <p>
              Visit my
              <a
                href={dev.portfolio}
                className="ml-4 text-primarycolor-500 underline"
              >
                Portfolio
              </a>
            </p>
            <div className="flex items-center justify-center gap-4 mt-3">
              {accounts.map((acc, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-1 items-center justify-center cursor-pointer"
                >
                  <img
                    src={acc.logo}
                    width={30}
                    height={30}
                    alt="account-logo"
                    className="rounded-lg"
                  />
                  <h3>{acc.name}</h3>
                </div>
              ))}
            </div>
            <button
              className="mt-8 py-2 px-4 bg-primarycolor-400 text-white font-semibold rounded-xl active:scale-95 transition-all"
              onClick={() => setModal(false)}
            >
              Continue to Chatify
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ChatApp;
