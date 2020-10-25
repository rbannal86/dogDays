import React, { useState, useEffect } from "react";
import FSServices from "../../Services/FSServices";

export default function DogDetails(props) {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [dogName, setDogName] = useState(props.dogName);
  const [dogBreed, setDogBreed] = useState(props.dogBreed);
  const [unformattedDate, setUnformattedDate] = useState(props.dogBirthday);
  const [dogBirthday, setDogBirthday] = useState(null);

  const handleSubmit = () => {
    FSServices.updateDogDetails(
      props.dogId,
      dogName,
      dogBreed,
      unformattedDate
    );
    props.setDogBirthday(unformattedDate);
    props.setDogName(dogName);
    props.setDogBreed(dogBreed);
  };

  //Formats birthday for display
  useEffect(() => {
    if (!toggleEdit) {
      let newDogBirthday =
        unformattedDate.slice(5, 7) +
        "-" +
        unformattedDate.slice(8) +
        "-" +
        unformattedDate.slice(0, 4);
      setDogBirthday(newDogBirthday);
    }
  }, [unformattedDate, toggleEdit]);

  if (!toggleEdit)
    return (
      <div className={"dog_details_main"}>
        <h3>{dogName}</h3>
        <h4>{dogBreed}</h4>
        <h4>{dogBirthday}</h4>
        <button
          onClick={() => {
            setToggleEdit(!toggleEdit);
          }}
        >
          Edit Details
        </button>
      </div>
    );
  else
    return (
      <div className={"dog_details_main"}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setToggleEdit(!toggleEdit);
            handleSubmit();
          }}
        >
          <h3>
            <input
              value={dogName}
              onChange={(e) => {
                setDogName(e.target.value);
              }}
            />
          </h3>
          <h4>
            <input
              value={dogBreed}
              onChange={(e) => {
                setDogBreed(e.target.value);
              }}
            />
          </h4>
          <h4>
            <input
              value={unformattedDate}
              type={"date"}
              onChange={(e) => {
                setUnformattedDate(e.target.value);
              }}
            />
          </h4>
          <button>Submit</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setToggleEdit(!toggleEdit);
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    );
}
