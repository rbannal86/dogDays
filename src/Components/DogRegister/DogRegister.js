import React, { useState } from "react";
import FSServices from "../../Services/FSServices";
import DogForm from "../Forms/DogForm";

export default function DogRegister(props) {
  const defaultDate = new Date();

  const [dogName, setDogName] = useState("");
  const [dogBreed, setDogBreed] = useState("");
  const [dogBirthday, setDogBirthday] = useState(
    defaultDate.toISOString().substring(0, 10)
  );
  const [dogInput, setDogInput] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleDogInput();
    dogInput.forEach((dog) => {
      FSServices.registerDog(props.userId, dog).then(() =>
        FSServices.fetchUserData(props.userId).then((res) => {
          console.log(res);
          props.setUserData(res);
        })
      );
    });

    props.setShowDogRegister(false);
  };

  const clearDogInfo = () => {
    setDogName("");
    setDogBreed("");
    setDogBirthday(defaultDate.toISOString().substring(0, 10));
  };

  const handleDogInput = () => {
    let newDogInput = dogInput;
    newDogInput.push({ dogName, dogBreed, dogBirthday });
    setDogInput(newDogInput);
    clearDogInfo();
  };

  return (
    <>
      {" "}
      <form onSubmit={(e) => handleSubmit(e)}>
        <DogForm
          class={"dog_name"}
          handleChange={setDogName}
          label={"Dog Name: "}
          type={"text"}
          placeholder={"Fido"}
          value={dogName}
        />
        <DogForm
          class={"dog_breed"}
          handleChange={setDogBreed}
          label={"Dog Breed: "}
          type={"text"}
          placeholder={"Dachshund"}
          value={dogBreed}
        />
        <DogForm
          class={"dog_birthday"}
          handleChange={setDogBirthday}
          label={"Dog Birthday: "}
          type={"date"}
          placeholder={new Date()}
          value={dogBirthday}
        />
        <button>Submit</button>
      </form>
      <button
        onClick={() => {
          handleDogInput();
        }}
      >
        Add Another Dog
      </button>
      <button
        onClick={() => {
          props.setShowDogRegister(false);
        }}
      >
        Cancel
      </button>
    </>
  );
}
