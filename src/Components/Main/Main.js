import React, { useState, useEffect } from "react";
import Calendar from "../Calendar/Calendar";
import UserSidebar from "../UserSidebar/UserSidebar";
import DogRegister from "../DogRegister/DogRegister";
import FSServices from "../../Services/FSServices";

export default function Main(props) {
  const [focusDog, setFocusDog] = useState(null);
  const [showDogRegister, setShowDogRegister] = useState(false);
  const [userData, setUserData] = useState(props.userData);
  const [monthRecords, setMonthRecords] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
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
  }, [focusDog, selectedDate]);

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
