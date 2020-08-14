import React, { useState, useEffect } from "react";
import Main from "./Components/Main/Main";
import Header from "./Components/Header/Header";
import UserRegister from "./Components/UserRegister/UserRegister";
import UserLogin from "./Components/UserLogin/UserLogin";
import DogRegister from "./Components/DogRegister/DogRegister";
import "./App.css";
import FSServices from "./Services/FSServices";

function App() {
  const [userId, setUserId] = useState("1DS5kpDKADXHoN8hHhucsFE6ikK2");
  const [display, setDisplay] = useState("");
  const [userHandle, setUserHandle] = useState();

  useEffect(() => {
    FSServices.fetchUserData(userId).then((res) =>
      setUserHandle(res.displayName)
    );
  });

  return (
    <div className="App">
      <Header
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
      <DogRegister userId={userId} />
      <Main />
    </div>
  );
}

export default App;
