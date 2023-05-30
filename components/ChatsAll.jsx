import React, { useEffect, useState } from "react";
import { db } from "../src/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const chatsAll = ({ setActive, activeChat }) => {
  const [chats, setChats] = useState([]);
  const chatsRef = collection(db, "users");
  const [search, setSearch] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [searchChats, setSearchChat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState();

  const activeUser = JSON.parse(localStorage.getItem("key"));

  useEffect(() => {
    const queryChats = query(chatsRef, where("email", "!=", activeUser.email));
    onSnapshot(queryChats, (snapshot) => {
      let chats = [];
      snapshot.forEach((doc) => {
        chats.push({ ...doc.data(), id: doc.id });
      });
      setIsLoading(false);

      // removing the duplicate users
      const res = chats.filter((chat, index) => {
        return index === chats.findIndex((obj) => chat.email === obj.email);
      });
      setChats(res);
    });
  }, []);

  const searchHandler = async (e) => {
    setSearch(e.target.value);
    setSearchActive(true);
    const filterChats = chats.filter(({ username }) => {
      let user = username.charAt(0).toLowerCase() + username.slice(1);
      return user.includes(e.target.value);
    });
    setSearchChat(filterChats);
  };

  return (
    <div className="h-[100vh] w-[100%] sm:w-[25vw] md:w-[25vw] lg:w-[25vw] relative border-r-2 border-primarycolor-300">
      <header className="flex items-center justify-between px-6 bg-primarycolor-500 w-[100%] sm:w-[25vw] md:w-[25vw] lg:w-[25vw] h-[70px] rounded-b-3xl sm:rounded-none md:rounded-none lg:rounded-none fixed top-0 z-30 border-r-2 border-primarycolor-400">
        <span className="text-white text-[24px] font-bold tracking-wider">
          Chats
        </span>
        <input
          type="text"
          title="Search users through email"
          placeholder="🔎  Search User"
          className="outline-none rounded-full bg-white w-[16%] sm:w-[16%] md:w-[19%] lg:[15%] focus:w-[60%] py-2 px-4 transition-all"
          onChange={(e) => searchHandler(e)}
          value={search}
        />
      </header>
      <div className="h-[100vh] flex py-6 pr-2 ml-[8px] flex-col gap-3 pt-20 pb-20 overflow-hidden overflow-y-scrol">
        {searchActive ? (
          <>
            {searchChats.length === 0 ? (
              <div className="flex flex-col gap-1 justify-center items-center w-full">
                <img src="/notfound.jpg" height={200} width={200} />
                <h1 className="text-center text-gray-400 font-bold">
                  User Not Found
                </h1>
                <p className="text-center text-gray-400">Try search again 🙂</p>
              </div>
            ) : (
              <>
                {searchChats.map((chat, index) => (
                  <div
                    key={index}
                    className={`flex justify-between py-2 text-slate-600 px-[14px] rounded-xl cursor-pointer hover:bg-primarycolor-300 active:bg-primarycolor-300 transition-all ${
                      index === activeIndex ? "bg-primarycolor-300" : ""
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
            {isLoading ? (
              <div className="flex items-center justify-center h-full animate-spin duration-200">
                <img src="/loading.png" height={40} width={40} alt="" />
              </div>
            ) : (
              <>
                {chats.map((chat, index) => (
                  <div
                    key={index}
                    className={`flex justify-between py-2 text-slate-600 px-[14px] rounded-xl cursor-pointer hover:bg-primarycolor-300 active:bg-primarycolor-300 transition-all ${
                      activeIndex === index ? "bg-primarycolor-300" : ""
                    }`}
                    onClick={() => {
                      const reciever = {
                        username: chat.username,
                        email: chat.email,
                        photoURL: chat.photoURL,
                      };

                      localStorage.setItem("rec", JSON.stringify(reciever));
                      setActiveIndex(index);

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
        )}
      </div>
    </div>
  );
};

export default chatsAll;
