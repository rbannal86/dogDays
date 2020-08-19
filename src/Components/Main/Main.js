import React, { useState, useEffect } from "react";
import Calendar from "../Calendar/Calendar";
import UserSidebar from "../UserSidebar/UserSidebar";
import DogRegister from "../DogRegister/DogRegister";

export default function Main(props) {
  const [focusDog, setFocusDog] = useState(null);
  const [showDogRegister, setShowDogRegister] = useState(false);
  const [userData, setUserData] = useState(props.userData);

  console.log(focusDog);

  return (
    <>
      <Calendar dogId={focusDog} />
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
