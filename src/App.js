import React, { useState } from "react";
import Main from "./Components/Main/Main";
import Header from "./Components/Header/Header";
import UserRegister from "./Components/UserRegister/UserRegister";
import UserLogin from "./Components/UserLogin/UserLogin";
import "./App.css";

function App() {
  const [userId, setUserId] = useState("");
  const [display, setDisplay] = useState("");

  return (
    <div className="App">
      <Header
        userName={userId.displayName}
        setDisplay={setDisplay}
        setUserId={setUserId}
      />
      {display === "register" ? (
        <UserRegister setUserId={setUserId} setDisplay={setDisplay} />
      ) : null}
      {display === "login" ? (
        <UserLogin setUserId={setUserId} setDisplay={setDisplay} />
      ) : null}
      <Main />
    </div>
  );
}

export default App;
