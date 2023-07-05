import { SetChatActive } from "@/GlobalState/ChatSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const HomeScreen = () => {
  const ActiveUser = useSelector((state) => state.User.ActiveUser);
  const RecieverUser = useSelector((state) => state.User.RecieverUser);
  const dispatch = useDispatch();

  dispatch(SetChatActive(false));
  return (
    <div
      className={`${
        RecieverUser.email ? "hidden" : "sm:block md:block lg:block"
      } hidden h-[100vh] w-[100%] sm:w-[75vw] md:w-[75vw] lg:w-[75vw] relative`}
    >
      <header className="flex items-center justify-center px-4 sm:px-6 md:px-6 lg:px-6 bg-primarycolor-500 h-[70px] w-[100%] sm:w-[75vw] md:w-[75vw] lg:w-[75vw] rounded-b-3xl sm:rounded-none md:rounded-none lg:rounded-none fixed top-0 z-30">
        <h3 className="text-white font-semibold w-[100%]">
          Select a person to chat
        </h3>
      </header>
      <div className="h-[90vh]  flex gap-3 flex-col px-4 mb-2 sm:px-6 md:px-6 lg:px-6 pt-20 overflow-hidden overflow-y-scroll">
        {/* bg-[url('/bg-wallpaper.jpg')] bg-cover bg-center bg-no-repeat */}

        <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
          <img
            src={ActiveUser.photoURL}
            className="rounded-full"
            width={150}
            height={150}
            alt="img"
          />
          <p className="text-2xl mt-2">
            Greetings{" "}
            <span className="text-green-500 font-bold">
              {ActiveUser.username}
            </span>
          </p>

          <p className="flex items-center gap-4 text-2xl">
            <span>Happy Chating with</span>
            <span className="text-4xl text-primarycolor-500 font-bold">
              Chatify
            </span>
          </p>
          <p className="pt-32">
            Desinged and Developed by
            <a
              href="https://github.com/ihtisham914"
              className="text-primarycolor-500 underline cursor-pointer"
            >
              Ihtisham Ul Haq
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
