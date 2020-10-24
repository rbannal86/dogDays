import React, { useState, useEffect } from "react";
import Dashboard from "./Components/Dashboard/Dashboard";
import FSServices from "./Services/FSServices";
import "./App.css";

function App() {
  const [userData, setUserData] = useState(null);
  const [dogList, setDogList] = useState(null);

  //replace useEffect with setData from login
  useEffect(() => {
    FSServices.fetchUserRecords("1DS5kpDKADXHoN8hHhucsFE6ikK2").then((res) => {
      setUserData(res);
    });
  }, []);

  useEffect(() => {
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
  }, [dogList, userData]);

  console.log(dogList);

  return (
    <div className="App">
      {userData ? (
        <Dashboard userData={userData} dogList={dogList} />
      ) : (
        <div>
          <button>Log In</button>
          <button>Register</button>
        </div>
      )}
    </div>
  );
}

export default App;
