import React, { useEffect, useState } from "react";
import { db } from "../src/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const chatsAll = ({ setActive, activeChat }) => {
  const [chats, setChats] = useState([]);
  const chatsRef = collection(db, "users");
  const [search, setSearch] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [searchChats, setSearchChat] = useState([]);
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

  const searchHandler = async (e) => {
    setSearch(e.target.value);
    setSearchActive(true);
    const filterChats = chats.filter(({ email }) =>
      email.includes(e.target.value)
    );
    setSearchChat(filterChats);
    // console.log(filterChats);
    //  here goes code for searching users on keydown /Enter/
    // if (e.key === "Enter") {
    //   console.log("search working");
    // }
  };

  console.log(searchChats);

  return (
    <div className="h-[100vh] w-[100%] sm:w-[25vw] md:w-[25vw] lg:w-[25vw] relative border-r-2 border-primarycolor-300">
      <header className="flex items-center justify-between px-6 bg-primarycolor-500 w-[100%] sm:w-[25vw] md:w-[25vw] lg:w-[25vw] h-[70px] rounded-b-3xl sm:rounded-none md:rounded-none lg:rounded-none fixed top-0 z-30 border-r-2 border-primarycolor-400">
        <span className="text-white text-[24px] font-bold tracking-wider">
          Chats
        </span>
        <input
          type="text"
          title="Search users through email"
          placeholder="Search email"
          className="outline-none rounded-full bg-white w-[30%] focus:w-[60%] py-1 px-4 transition-all"
          onChange={(e) => searchHandler(e)}
          value={search}
          // onKeyDown={(e) => searchHandler(e)}
        />
      </header>
      <div className="h-[100vh] flex py-6 pr-2 ml-[8px] flex-col gap-3 pt-24 pb-20 overflow-hidden overflow-y-scrol">
        {searchActive ? (
          <>
            {searchChats.length === 0 ? (
              <h1 className="text-center text-gray-400 font-bold">
                User Not Found 🥲
              </h1>
            ) : (
              <>
                {searchChats.map((chat, index) => (
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
                    {/* <span className="text-[14px]">{chat?.sentAt}</span> */}
                  </div>
                ))}
              </>
            )}
          </>
        ) : (
          <>
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
                {/* <span className="text-[14px]">{chat?.sentAt}</span> */}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default chatsAll;
