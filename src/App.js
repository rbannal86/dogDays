import React, { useState, useEffect } from "react";
import Dashboard from "./Components/Dashboard/Dashboard";
import Header from "./Components/Header/Header";
import FSServices from "./Services/FSServices";
import UserRegister from "./Components/UserRegister/UserRegister";
import UserLogin from "./Components/UserLogin/UserLogin";
import AddDog from "./Components/AddDog/AddDog";

import "./App.css";

function App() {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [dogList, setDogList] = useState(null);
  const [view, setView] = useState(null);

  const persistLogIn = () => {
    if (localStorage.dogDaysId !== "" && !userId) {
      setUserId(localStorage.dogDaysId);
    }
    if (
      userId &&
      userId !== "qf6wsu9crIflZ7f980XDzHxAxrz2" &&
      !localStorage.dogDaysId
    ) {
      localStorage.setItem("dogDaysId", userId);
    }
  };
  useEffect(() => {
    persistLogIn();
  });

  useEffect(() => {
    if (userId)
      FSServices.fetchUserRecords(userId).then((res) => {
        setUserData(res);
      });
  }, [userId]);

  useEffect(() => {
    if (userId) {
      const fetchAllDogRecords = async () => {
        return await FSServices.fetchAllDogRecords(userData.id);
      };

      const updateDogList = async (data) => {
        setDogList(data);
      };
      if (userData && !dogList) {
        let newDogList = [];
        fetchAllDogRecords()
          .then((res) => {
            res.forEach((doc) => {
              newDogList.push(doc.data());
            });
          })
          .then(() => updateDogList(newDogList));
      }
    }
  }, [dogList, userData, userId]);

  const handleLogOut = () => {
    window.localStorage.setItem("dogDaysId", "");
    setUserId(null);
    setUserData(null);
    setDogList(null);
  };

  const handleFirstDog = (newDogList) => {
    setDogList(newDogList);
    setView(null);
  };

  return (
    <div className="App">
      <Header setView={setView} userId={userId} handleLogOut={handleLogOut} />
      {view === "register" ? (
        <UserRegister setUserId={setUserId} setView={setView} />
      ) : null}
      {view === "login" ? (
        <UserLogin setView={setView} setUserId={setUserId} />
      ) : null}
      {view === "adddog" ? (
        <AddDog
          userId={userId}
          setUserData={setUserData}
          setDogList={setDogList}
          setToggleAddDog={setView}
          handleFirstDog={handleFirstDog}
        />
      ) : null}
      {!userData ? (
        <div className={"main_page_buttons"}>
          <button onClick={() => setUserId("qf6wsu9crIflZ7f980XDzHxAxrz2")}>
            Sample Account
          </button>
          <button>User Guide</button>
        </div>
      ) : null}
      {userData && dogList && !view ? (
        <Dashboard
          userId={userId}
          userData={userData}
          dogList={dogList}
          setUserData={setUserData}
          setDogList={setDogList}
        />
      ) : null}
    </div>
  );
}

export default App;
