import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { db } from "../src/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
// import useSound from "use-sound";

const Chat = ({ setActive, activeChat }) => {
  const [msg, setMsg] = useState("");
  const messagesRef = collection(db, "messages");
  const [messages, setMessages] = useState([]);
  const [reciever, setReciever] = useState({});
  const lastmsg = useRef();

  const activeUser = JSON.parse(localStorage.getItem("key"));

  useEffect(() => {
    setReciever(JSON.parse(localStorage.getItem("rec")));
  }, [reciever]);

  useEffect(() => {
    setTimeout(() => {
      lastmsg.current.scrollIntoView({
        behavior: "smooth",
      });
    });
  }, [activeChat]);

  useEffect(() => {
    setTimeout(() => {
      lastmsg.current.scrollIntoView({
        behavior: "smooth",
      });
    });
  }, [messages]);
  // console.log(reciever.email);
  useEffect(() => {
    const queryMessages = query(messagesRef, orderBy("sentAt"));
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
      senderEmail: activeUser.email,
      recieverEmail: reciever.email,
    };
    setMsg("");
    await addDoc(messagesRef, newMsg);
    setTimeout(() => {
      lastmsg?.current.scrollIntoView({
        behavior: "smooth",
      });
    });
  };

  const keydownhandler = async (e) => {
    //  here goes code for sending message on keydown /Enter/
    if (e.key === "Enter") {
      if (msg === "") return;
      const newMsg = {
        text: msg,
        sentAt: serverTimestamp(),
        senderEmail: activeUser.email,
        recieverEmail: reciever.email,
      };
      setMsg("");
      await addDoc(messagesRef, newMsg);
      setTimeout(() => {
        lastmsg?.current.scrollIntoView({
          behavior: "smooth",
        });
      });
    }
  };

  return (
    <div className="h-[100vh] w-[100%] sm:w-[75vw] md:w-[75vw] lg:w-[75vw] relative">
      <header className="flex items-center justify-between px-4 sm:px-6 md:px-6 lg:px-6 bg-primarycolor-500 h-[70px] w-[100%] sm:w-[75vw] md:w-[75vw] lg:w-[75vw] rounded-b-3xl sm:rounded-none md:rounded-none lg:rounded-none fixed top-0 z-30">
        {activeChat ? (
          <>
            <div className="flex items-center gap-2">
              <img
                className="inline-block sm:hidden md:hidden lg:hidden cursor-pointer"
                src="/back.svg"
                width={20}
                height={20}
                alt=""
                onClick={() => setActive(false)}
              />
              <img
                src={reciever.photoURL}
                height={40}
                width={40}
                alt="userIcon"
                className="rounded-full"
              />
              <div className="text-white">
                <h2 className="text-[16px] font-bold tracking-wide">
                  {reciever.username}
                </h2>
                <p className="text-[12px]">{reciever.email}</p>
              </div>
            </div>
            <img
              title="feature coming soon 🙂"
              src="/call.svg"
              height={30}
              width={30}
              alt="callIcon"
              className="cursor-not-allowed"
            />
          </>
        ) : (
          <h3 className="text-white font-semibold w-[100%] text-center">
            Select a person to chat
          </h3>
        )}
      </header>
      <div className="h-[90vh] flex gap-3 flex-col px-4 sm:px-6 md:px-6 lg:px-6 pt-20 overflow-hidden overflow-y-scroll">
        {/* bg-[url('/bg-wallpaper.jpg')] bg-cover bg-center bg-no-repeat */}
        {activeChat ? (
          messages.map((message, index) => (
            <>
              {(message.senderEmail === activeUser.email ||
                message.recieverEmail === activeUser.email) &&
              (message.recieverEmail === reciever.email ||
                message.senderEmail === reciever.email) ? (
                <div
                  key={index}
                  className={`flex justify-between w-[100%] ${
                    message.senderEmail !== activeUser.email
                      ? "flex-row-reverse"
                      : ""
                  } `}
                >
                  <div className="w-auto"></div>
                  {message.senderEmail === activeUser.email ? (
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-col bg-primarycolor-400 text-white text-[14px] px-[18px] py-2 rounded-2xl rounded-tr-none">
                        <span>{message.text}</span>
                        <span className="text-right text-[10px]">
                          {message?.sentAt ? (
                            <>{message.sentAt.toDate().toLocaleTimeString()}</>
                          ) : (
                            <span className="flex items-center gap-1 justify-end">
                              <AiOutlineClockCircle /> sending...
                            </span>
                          )}
                        </span>
                      </div>
                      <img
                        src={activeUser.photoURL}
                        className="rounded-full"
                        width={35}
                        height={35}
                        alt="img"
                      />
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-2">
                      <img
                        className="rounded-full"
                        src={reciever.photoURL}
                        width={35}
                        height={35}
                        alt="img"
                      />
                      <div className="flex flex-col bg-primarycolor-300  text-[14px] px-[18px] py-2 rounded-2xl rounded-tl-none">
                        <span>{message.text}</span>
                        <span className="text-right text-[10px]">
                          {message.sentAt.toDate().toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                ""
              )}
            </>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
            <img
              src={activeUser.photoURL}
              className="rounded-full"
              width={150}
              height={150}
              alt="img"
            />
            <p className="text-2xl mt-2">
              Greetings{" "}
              <span className="text-green-500 font-bold">
                {activeUser.username}
              </span>
            </p>

            <p className="flex items-center gap-4 text-2xl">
              <span>Happy Chating with</span>
              <span className="text-4xl text-primarycolor-500 font-bold">
                Chatify
              </span>
            </p>
            <p className="pt-32">
              Desinged and Developed by{" "}
              <a
                href="https://github.com/ihtisham914"
                className="text-primarycolor-500 underline cursor-pointer"
              >
                Ihtisham Ul Haq
              </a>
            </p>
          </div>
        )}
        <div ref={lastmsg} />
      </div>

      {activeChat ? (
        <div className="w-[100%] py-1 sm:py-3 md:py-3 lg:py-3 fixed bottom-[7px] z-50 bg-white">
          <div className="flex items-center justify-between bg-primarycolor-300 rounded-xl mx-[10px] sm:mx-[22px] md:mx-[22px] lg:mx-[22px] w-[95%] sm:w-[73vw] md:w-[70vw] lg:w-[73vw] px-[12px] sm:px-[20px] md:px-[20px] lg:px-[20px] py-2 ">
            <input
              placeholder="message"
              type="text"
              className="bg-primarycolor-300 outline-none border-none w-4/5"
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) => keydownhandler(e)}
              value={msg}
              autoFocus
            />
            <div
              className="flex items-center justify-center bg-primarycolor-400 p-1 rounded-lg"
              onClick={sendMessage}
            >
              <img
                className="cursor-pointer text-white -ml-1"
                src="/send.svg"
                height={30}
                width={30}
                alt="sendIcon"
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Chat;
