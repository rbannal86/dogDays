import React, { useState, useEffect } from "react";
import Main from "./Components/Main/Main2";
import Header from "./Components/Header/Header";
import UserRegister from "./Components/UserRegister/UserRegister";
import UserLogin from "./Components/UserLogin/UserLogin";
import "./App.css";

function App() {
  const [userId, setUserId] = useState(null);
  const [display, setDisplay] = useState("");
  const [userHandle, setUserHandle] = useState();

  useEffect(() => {
    if (userId) {
      setUserHandle(userId.displayName);
    } else if (!userId) setUserHandle("");
  }, [userId]);

  return (
    <div className="App">
      <Main />
      {/* <Header
        userName={userHandle}
        setDisplay={setDisplay}
        setUserId={setUserId}
      />
      {display === "register" ? (
        <UserRegister setUserId={setUserId} setDisplay={setDisplay} />
      ) : null}
      {display === "login" ? (
        <UserLogin setUserId={setUserId} setDisplay={setDisplay} />
      ) : null}
      {userId ? <Main userData={userId} /> : null} */}
    </div>
  );
}

export default App;
