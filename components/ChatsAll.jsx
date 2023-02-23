import React from "react";

const chatsAll = () => {
  return (
    <div className="h-[80vh] relative">
      <header className="flex items-center justify-between px-6 bg-primarycolor-500 h-[80px] w-[100%] rounded-b-3xl fixed top-0 z-50">
        <span className="text-white text-[28px] font-bold tracking-wider">
          Messages
        </span>
        <img src="/search.svg" height={30} width={30} />
      </header>
      <div className="flex justify-between py-6 mx-[8px] flex-col gap-3 pt-24 pb-20">
        <div className="flex justify-between py-2 text-slate-600 px-[14px] rounded-xl cursor-pointer hover:bg-primarycolor-300 active:bg-primarycolor-300">
          <div className="flex items-center justify-center gap-3">
            <img src="/user.png" width={50} height={50} />
            <div className="flex flex-col ">
              <span className="text-[16px] font-bold tracking-wide">
                Ihtisham
              </span>
              <span className="text-[14]">Hey there, how are you</span>
            </div>
          </div>
          <span className="text-[14px]">08:45</span>
        </div>
      </div>
      <nav></nav>
    </div>
  );
};

export default chatsAll;
