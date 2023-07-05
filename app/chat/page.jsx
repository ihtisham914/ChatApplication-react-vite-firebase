"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { db } from "@/app/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { SetChatActive } from "@/GlobalState/ChatSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const page = () => {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [msg, setMsg] = useState("");
  const messagesRef = collection(db, "messages");
  const [messages, setMessages] = useState([]);
  const lastmsg = useRef();

  const ActiveUser = useSelector((state) => state.User.ActiveUser);
  const RecieverUser = useSelector((state) => state.User.RecieverUser);

  dispatch(SetChatActive(true));

  useEffect(() => {
    // Get messages from firebase
    const queryMessages = query(messagesRef, orderBy("sentAt"));
    onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    setTimeout(() => {
      lastmsg?.current?.scrollIntoView({
        behavior: "smooth",
      });
    });
  }, [RecieverUser, messages]);

  // sending message
  const sendMessage = async () => {
    if (msg === "") return;
    const newMsg = {
      text: msg,
      sentAt: serverTimestamp(),
      senderEmail: ActiveUser.email,
      recieverEmail: RecieverUser.email,
    };
    setMsg("");
    await addDoc(messagesRef, newMsg);
    setTimeout(() => {
      lastmsg &&
        lastmsg?.current?.scrollIntoView({
          behavior: "smooth",
        });
    });
  };

  // Send message on Pressing Enter
  const keydownhandler = async (e) => {
    //  here goes code for sending message on keydown /Enter/
    if (e.key === "Enter") {
      if (msg === "") return;
      const newMsg = {
        text: msg,
        sentAt: serverTimestamp(),
        senderEmail: ActiveUser.email,
        recieverEmail: RecieverUser.email,
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

  // DELETE MESSAGE
  const DeleteMsg = async (id) => {
    console.log(id);
    // here goes the code for deletion of message
    const docRef = doc(db, "messages", id);
    deleteDoc(docRef).then(() =>
      toast.success("Message Deleted", {
        style: { width: "auto", height: "auto" },
      })
    );
  };

  return (
    <div className="h-[100vh] w-[100%] sm:w-[60vw] md:w-[70vw] lg:w-[75vw] relative">
      <header className="flex items-center justify-between px-4 sm:px-6 md:px-6 lg:px-6 bg-primarycolor-500 h-[70px] w-full sm:w-[75vw] md:w-[75vw] lg:w-[75vw] rounded-b-3xl sm:rounded-none md:rounded-none lg:rounded-none fixed top-0 z-30">
        <div className="flex items-center gap-2">
          <img
            className="inline-block sm:hidden md:hidden lg:hidden cursor-pointer"
            src="/back.svg"
            width={20}
            height={20}
            alt=""
            onClick={() => {
              dispatch(SetChatActive(false));
              navigate.push("/");
            }}
          />
          <img
            src={RecieverUser.photoURL}
            height={40}
            width={40}
            alt="userIcon"
            className="rounded-full"
          />
          <div className="text-white">
            <h2 className="text-[16px] font-bold tracking-wide">
              {RecieverUser.username}
            </h2>
            <p className="text-[12px]">{RecieverUser.email}</p>
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
      </header>
      <div className="h-[90vh]  flex gap-3 flex-col px-4 mb-2 sm:px-6 md:px-6 lg:px-6 pt-20 overflow-hidden overflow-y-scroll">
        {/* bg-[url('/bg-wallpaper.jpg')] bg-cover bg-center bg-no-repeat */}
        {messages.map((message, index) => (
          <>
            {(message.senderEmail === ActiveUser.email ||
              message.recieverEmail === ActiveUser.email) &&
            (message.recieverEmail === RecieverUser.email ||
              message.senderEmail === RecieverUser.email) ? (
              <div
                key={index}
                className={`flex justify-between w-[100%] ${
                  message.senderEmail !== ActiveUser.email
                    ? "flex-row-reverse"
                    : ""
                } `}
              >
                <div className="w-auto"></div>
                {message.senderEmail === ActiveUser.email ? (
                  <div className="flex items-start justify-between gap-2">
                    <div className="relative flex flex-col bg-primarycolor-400 text-white text-[14px] px-[18px] py-2 rounded-2xl rounded-tr-none max-w-[63vw]">
                      <span>{message.text}</span>
                      <span className="text-right text-[10px]">
                        {message?.sentAt ? (
                          <>{message.sentAt.toDate().toLocaleTimeString()}</>
                        ) : (
                          <span className="flex items-center gap-1 justify-end">
                            <AiOutlineClockCircle /> sending
                          </span>
                        )}
                      </span>
                      {message?.sentAt && (
                        <span
                          onClick={() => DeleteMsg(message.id)}
                          className="absolute cursor-pointer -left-8 p-1 rounded-full border border-red-500 text-red-500 z-20 hover:text-white hover:bg-red-500"
                        >
                          <MdDelete />
                        </span>
                      )}
                    </div>
                    <img
                      src={ActiveUser.photoURL}
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
                      src={RecieverUser.photoURL}
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
        ))}
        <div ref={lastmsg} />
      </div>

      <div className="w-[100%] py-1 sm:py-3 md:py-3 lg:py-3 fixed bottom-[7px] z-50 bg-white">
        <div className="flex items-center justify-between bg-primarycolor-300 rounded-xl mx-2 w-[95%] sm:w-[73%] md:w-[70%] lg:w-[73%] px-[12px] sm:px-[20px] md:px-[20px] lg:px-[20px] py-2">
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
    </div>
  );
};

export default page;
