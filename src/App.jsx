import { useState } from "react";
import SignIn from "../components/SignIn";
import ChatApp from "../components/chatApp";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  // const [isAuth, setIsAuth] = useState(true);
  return (
    <>
      {!isAuth ? (
        <SignIn setIsAuth={setIsAuth} />
      ) : (
        <>
          <ChatApp />
        </>
      )}
    </>
  );
}

export default App;
