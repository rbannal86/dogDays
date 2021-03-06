import React, { useState, useEffect } from "react";
import Dashboard from "./Components/Dashboard/Dashboard";
import Header from "./Components/Header/Header";
import FSServices from "./Services/FSServices";
import UserRegister from "./Components/UserRegister/UserRegister";
import UserLogin from "./Components/UserLogin/UserLogin";
import UserGuide from "./Components/UserGuide/UserGuide";

import "./App.css";

function App() {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [dogList, setDogList] = useState(null);
  const [view, setView] = useState(null);

  //Save the userId, unless the user is using the sample account
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

  //Pulls the user information when a user either logs in or returns
  useEffect(() => {
    if (userId)
      FSServices.fetchUserRecords(userId).then((res) => {
        setUserData(res);
      });
  }, [userId]);

  //Creates an array of all dog records when the user logs in or returns
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

  //Removes all user data on log out, including local storage
  const handleLogOut = () => {
    window.localStorage.setItem("dogDaysId", "");
    setUserId(null);
    setUserData(null);
    setDogList(null);
  };

  //Header determines view (register, login) and buttons for sample account and user guide point to either the sample dashboard
  //or the user guide
  return (
    <div className="App">
      <Header setView={setView} userId={userId} handleLogOut={handleLogOut} />
      {view === "register" ? (
        <UserRegister setUserId={setUserId} setView={setView} />
      ) : null}
      {view === "login" ? (
        <UserLogin setView={setView} setUserId={setUserId} />
      ) : null}
      {!userData && view === null ? (
        <div className={"main_page_buttons"}>
          <button
            className={"main_page_button"}
            onClick={() => setUserId("qf6wsu9crIflZ7f980XDzHxAxrz2")}
          >
            Sample Account
          </button>
          <button
            className={"main_page_button"}
            onClick={() => setView("userguide")}
          >
            User Guide
          </button>
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
      {view === "userguide" ? (
        <>
          <UserGuide />
          <div className={"main_page_guide_button"}>
            <button
              onClick={() => setView(null)}
              className={"main_page_button"}
            >
              Back to Main Page
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default App;
