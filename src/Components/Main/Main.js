import React, { useState, useEffect } from "react";
import Calendar from "../Calendar/Calendar";
import UserSidebar from "../UserSidebar/UserSidebar";
import DogRegister from "../DogRegister/DogRegister";
import FSServices from "../../Services/FSServices";
// import firebase from "firebase/firebase-app";

export default function Main(props) {
  const [focusDog, setFocusDog] = useState(null);
  const [showDogRegister, setShowDogRegister] = useState(false);
  const [userData, setUserData] = useState(props.userData);
  const [monthRecords, setMonthRecords] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    //Also fetch next month and the previous month, add on further months based on changing view
    let monthString = (selectedDate.getMonth() + 1).toString();
    let yearString = selectedDate.getFullYear().toString();
    if (monthString.length === 1) monthString = "0" + monthString;
    let dateId = monthString + yearString;

    const fetchMonthRecords = async () => {
      try {
        return await FSServices.fetchDogRecords(dateId, focusDog.id);
      } catch (error) {
        console.log(error);
      }
    };

    if (focusDog) {
      fetchMonthRecords().then((res) => {
        setMonthRecords(res);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusDog, selectedDate]);

  //look into listeners more
  // if (focusDog) {
  //   var monthDataUpdate = firebase
  //     .database()
  //     .ref("dogs/" + focusDog.dogId + "/records");

  //   monthDataUpdate.on("value", (snapshot) => {
  //     console.log("change detected");
  //     setMonthRecords(snapshot.val());
  //   });
  // }

  return (
    <>
      <Calendar
        dogId={focusDog}
        setSelectedDate={setSelectedDate}
        monthRecords={monthRecords}
      />
      <UserSidebar
        setShowDogRegister={setShowDogRegister}
        userDogs={userData.dogs}
        userId={props.userData.id}
        setFocusDog={setFocusDog}
      />
      {showDogRegister ? (
        <DogRegister
          userId={props.userData.id}
          setShowDogRegister={setShowDogRegister}
          setUserData={setUserData}
        />
      ) : (
        <></>
      )}
    </>
  );
}
