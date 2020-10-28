import React, { useState, useEffect } from "react";
import FSServices from "../../Services/FSServices";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import EditIcon from "@material-ui/icons/Edit";

import "./DogDetails.css";

export default function DogDetails(props) {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [dogName, setDogName] = useState(props.dogName);
  const [dogBreed, setDogBreed] = useState(props.dogBreed);
  const [unformattedDate, setUnformattedDate] = useState(props.dogBirthday);
  const [dogBirthday, setDogBirthday] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [toggleConfirm, setToggleConfirm] = useState(false);

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

  useEffect(() => {
    if (confirmDelete && !toggleConfirm) handleDelete();
  });

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

  const handleDelete = async () => {
    if (confirmDelete) {
      let newUserData = await FSServices.deleteDog(props.dogId, props.userData);
      props.setUserData(newUserData);
      let newDogList = [];
      await FSServices.fetchAllDogRecords(props.userData.id).then((res) => {
        res.forEach((doc) => {
          newDogList.push(doc.data());
        });
      });
      props.setDogList(newDogList);
      props.setDogId(null);
      props.setToggleDogDetails(false);
    } else setToggleConfirm(true);
  };

  if (!toggleEdit)
    return (
      <div className={"dog_details_main"}>
        <h2 className={"dog_details_title"}>Your Dog's Details</h2>
        <h3 className={"dog_details_label"}>Name</h3>
        <div className={"dog_details_name"}>{dogName}</div>
        <h3 className={"dog_details_label"}>Breed</h3>
        <div className={"dog_details_details"}>{dogBreed}</div>
        <h3 className={"dog_details_label"}>Birthday</h3>
        <div className={"dog_details_details"}>{dogBirthday}</div>
        {toggleConfirm ? (
          <div className={"dog_details_confirm"}>
            <h5>Confirm Delete?</h5>
            <p>
              Are you sure you want to delete this dog? All records will be
              permanently deleted!
            </p>
            <button
              onClick={() => {
                setConfirmDelete(true);
                setToggleConfirm(false);
              }}
            >
              Confirm
            </button>
            <button
              onClick={() => {
                setToggleConfirm(false);
              }}
            >
              Cancel
            </button>
          </div>
        ) : null}
        <div className={"dog_details_buttons"}>
          <button
            className={"dog_details_button"}
            onClick={() => {
              setToggleEdit(!toggleEdit);
            }}
          >
            <EditIcon fontSize={"inherit"} />
          </button>
          <button
            className={"dog_details_button"}
            onClick={() => {
              handleDelete();
            }}
          >
            <HighlightOffIcon fontSize={"inherit"} />
          </button>
        </div>
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
