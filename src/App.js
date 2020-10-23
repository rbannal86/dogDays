import React, { useState, useEffect } from "react";
import Dashboard from "./Components/Dashboard/Dashboard";
import FSServices from "./Services/FSServices";
import "./App.css";

function App() {
  const [userData, setUserData] = useState(null);

  //replace useEffect with setData from login
  useEffect(() => {
    FSServices.fetchUserRecords("1DS5kpDKADXHoN8hHhucsFE6ikK2").then((res) =>
      setUserData(res)
    );
  }, []);

  return (
    <div className="App">
      {userData ? (
        <Dashboard userData={userData} />
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
