import React, { useState, useEffect } from "react";
import FSServices from "../../Services/FSServices";

import "./AddDog.css";

export default function AddDog(props) {
  //Form state
  const [dogName, setDogName] = useState("");
  const [dogBreed, setDogBreed] = useState("");
  const [dogBirthday, setDogBirthday] = useState("");

  //Makes sure that the form is in the center of the screen and the first input
  //is active when a user opens the form
  useEffect(() => {
    document.getElementById("add_dog_name").focus();
    document
      .getElementById("add_dog_top")
      .scrollIntoView({ behavior: "smooth" });
  }, []);

  //Bundles the data, then submits it to the Dashboard
  //to load into state and change the active dog to the
  //newly created dog
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = await FSServices.addDog(
      dogName,
      dogBreed,
      dogBirthday,
      props.userId
    );
    let userObj = data.userObj;
    let dogId = data.dogId;
    props.setUserData(userObj);
    let newDogList = [];
    await FSServices.fetchAllDogRecords(props.userId)
      .then((res) => {
        res.forEach((doc) => {
          newDogList.push(doc.data());
        });
      })
      .then(() => {
        props.handleNewDog(dogId, newDogList);
      });
  };

  //Standard form
  return (
    <div className={"add_dog_main"}>
      <h3 className={"add_dog_title"} id={"add_dog_top"}>
        Add a New Dog
      </h3>
      <form className={"add_dog_form"} onSubmit={(e) => handleSubmit(e)}>
        <div className={"add_dog_label"}>Name</div>
        <input
          className={"add_dog_input"}
          id={"add_dog_name"}
          onChange={(e) => setDogName(e.target.value)}
          value={dogName}
          type={"text"}
          required
        />
        <div className={"add_dog_label"}>Breed</div>
        <input
          className={"add_dog_input"}
          onChange={(e) => setDogBreed(e.target.value)}
          value={dogBreed}
          type={"text"}
          required
        />
        <div className={"add_dog_label"}>Birthday</div>
        <input
          className={"add_dog_input"}
          onChange={(e) => setDogBirthday(e.target.value)}
          value={dogBirthday}
          type={"date"}
          required
        />
        <div className={"add_dog_buttons"}>
          <button className={"add_dog_button"} type={"submit"}>
            Submit
          </button>
          <button
            id={"add_dog_bottom"}
            className={"add_dog_button"}
            onClick={(e) => {
              e.preventDefault();
              props.setToggleAddDog(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
