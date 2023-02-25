import { useState } from "react";
import Chat from "../components/chat";
import ChatsAll from "../components/ChatsAll";
import SignIn from "../components/SignIn";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  return (
    <>
      {!isAuth ? (
        <SignIn setIsAuth={setIsAuth} />
      ) : (
        <>
          {/* <ChatsAll /> */}
          <Chat />
        </>
      )}
    </>
  );
}

export default App;
