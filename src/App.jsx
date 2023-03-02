import { useState } from "react";
import SignIn from "../components/SignIn";
import ChatApp from "../components/ChatApp";
import Cookies from "universal-cookie";
import "../src/app.css";
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
