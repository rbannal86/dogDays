import React, { useState } from "react";
import FSServices from "../../Services/FSServices";

export default function AddDog(props) {
  const [dogName, setDogName] = useState("");
  const [dogBreed, setDogBreed] = useState("");
  const [dogBirthday, setDogBirthday] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userObj = await FSServices.addDog(
      dogName,
      dogBreed,
      dogBirthday,
      props.userId
    );
    props.setUserData(userObj);
    let newDogList = [];
    FSServices.fetchAllDogRecords(props.userId).then((res) => {
      res.forEach((doc) => {
        newDogList.push(doc.data());
      });
    });
    props.setDogList(newDogList);
    props.setToggleAddDog(false);
  };

  return (
    <div className={"add_dog_main"}>
      <form className={"add_dog_form"} onSubmit={(e) => handleSubmit(e)}>
        <label>Name:</label>
        <input
          onChange={(e) => setDogName(e.target.value)}
          value={dogName}
          type={"text"}
          required
        />
        <label>Breed:</label>
        <input
          onChange={(e) => setDogBreed(e.target.value)}
          value={dogBreed}
          type={"text"}
          required
        />
        <label>Birthday:</label>
        <input
          onChange={(e) => setDogBirthday(e.target.value)}
          value={dogBirthday}
          type={"date"}
          required
        />
        <button type={"submit"}>Submit</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            props.setToggleAddDog(false);
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
