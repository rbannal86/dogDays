import React, { useState, useEffect } from "react";
import FSServices from "../../Services/FSServices";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import PublishIcon from "@material-ui/icons/Publish";
import CancelIcon from "@material-ui/icons/Cancel";
import Tooltip from "@material-ui/core/Tooltip";
import CloseIcon from "@material-ui/icons/Close";

import "./DogDetails.css";

export default function DogDetails(props) {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [dogName, setDogName] = useState(props.dogName);
  const [dogBreed, setDogBreed] = useState(props.dogBreed);
  const [unformattedDate, setUnformattedDate] = useState(props.dogBirthday);
  const [dogBirthday, setDogBirthday] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [toggleConfirm, setToggleConfirm] = useState(false);
  const [deleted, setDeleted] = useState(false);

  //Scrolls page so that entire form is visible upon loading and focuses on first input
  useEffect(() => {
    document
      .getElementById("dog_details_top")
      .scrollIntoView({ behavior: "smooth" });
    if (document.getElementById("dog_details_name"))
      document.getElementById("dog_details_name").focus();
  });

  //Updates database with new details and updates information in Dashboard state
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

  //Checks current state of delete flow
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

  //Checks which stage of deleting records user is at. If at final stage, calls deleteDog from FSServices
  //Then updates dogList and sends dogList back to Dashboar for processing. Otherwise, toggles confirmation
  //screen.
  const handleDelete = async () => {
    if (confirmDelete) {
      if (!deleted) {
        setDeleted(true);
        setToggleConfirm(false);
        let newUserData = await FSServices.deleteDog(
          props.dogId,
          props.userData
        );
        props.setUserData(newUserData);
        let newDogList = [];
        await FSServices.fetchAllDogRecords(props.userData.id).then((res) => {
          res.forEach((doc) => {
            newDogList.push(doc.data());
          });
        });
        props.setToggleDogDetails(false);
        props.handleDeleteDog(newDogList);
      }
    } else setToggleConfirm(true);
  };

  //Checks if user is editing. If not, shows details. Has buttons for edit and delete.
  //Displays delete confirmation if delete is pressed.
  if (!toggleEdit)
    return (
      <div className={"dog_details_main"} id={"dog_details_top"}>
        <h2 className={"dog_details_title"}>Your Dog's Details</h2>
        <h3 className={"dog_details_label"}>Name</h3>
        <div className={"dog_details_details"}>{dogName}</div>
        <h3 className={"dog_details_label"}>Breed</h3>
        <div className={"dog_details_details"}>{dogBreed}</div>
        <h3 className={"dog_details_label"}>Birthday</h3>
        <div className={"dog_details_details"}>{dogBirthday}</div>
        {toggleConfirm ? (
          <div className={"dog_details_confirm"}>
            <h5 className={"dog_details_title"} id={"details_confirm_title"}>
              Confirm Delete?
            </h5>
            <p className={"dog_details_copy"}>
              Are you sure you want to delete this dog? All records will be
              permanently deleted!
            </p>
            <div className={"dog_details_buttons"}>
              <button
                className={"dog_details_button"}
                onClick={() => {
                  setConfirmDelete(true);
                  setToggleConfirm(false);
                }}
              >
                Confirm
              </button>
              <button
                className={"dog_details_button"}
                onClick={() => {
                  setToggleConfirm(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : null}
        {toggleConfirm ? null : (
          <div className={"dog_details_buttons"}>
            <Tooltip title={"Edit Dog Details"} placement={"top"}>
              <button
                className={"dog_details_button"}
                onClick={() => {
                  setToggleEdit(!toggleEdit);
                }}
              >
                <EditIcon fontSize={"inherit"} />
              </button>
            </Tooltip>
            <Tooltip title={"Delete Dog"} placement={"top"}>
              <button
                className={"dog_details_button"}
                onClick={() => {
                  handleDelete();
                }}
              >
                <DeleteForeverIcon fontSize={"inherit"} />
              </button>
            </Tooltip>
          </div>
        )}
        <div className={"dog_details_buttons"}>
          <Tooltip title={"Close Details"} placement={"top"}>
            <button
              className={"dog_details_button"}
              onClick={() => props.setToggleDogDetails(false)}
            >
              <CloseIcon fontSize={"inherit"} />
            </button>
          </Tooltip>
        </div>
      </div>
    );
  //Edit details form.
  else
    return (
      <div className={"dog_details_main"} id={"dog_details_top"}>
        <h2 className={"dog_details_title"}>Edit Details</h2>
        <form
          className={"dog_details_form"}
          onSubmit={(e) => {
            e.preventDefault();
            setToggleEdit(!toggleEdit);
            handleSubmit();
          }}
        >
          <h3 className={"dog_details_label"}>Name</h3>
          <div className={"dog_details_edit"}>
            <input
              id={"dog_details_name"}
              className={"dog_details_input"}
              value={dogName}
              onChange={(e) => {
                setDogName(e.target.value);
              }}
              required
            />
          </div>
          <h3 className={"dog_details_label"}>Breed</h3>
          <div className={"dog_details_edit"}>
            <input
              className={"dog_details_input"}
              value={dogBreed}
              onChange={(e) => {
                setDogBreed(e.target.value);
              }}
              required
            />
          </div>
          <h3 className={"dog_details_label"}>Birthday</h3>
          <div className={"dog_details_edit"}>
            <input
              className={"dog_details_input"}
              value={unformattedDate}
              type={"date"}
              onChange={(e) => {
                setUnformattedDate(e.target.value);
              }}
              required
            />
          </div>
          <div className={"dog_details_buttons"}>
            <Tooltip title={"Save Changes"} placement={"top"}>
              <button className={"dog_details_button"}>
                <PublishIcon fontSize={"inherit"} />
              </button>
            </Tooltip>
            <Tooltip title={"Discard Changes"} placement={"top"}>
              <button
                className={"dog_details_button"}
                onClick={(e) => {
                  e.preventDefault();
                  setToggleEdit(!toggleEdit);
                }}
              >
                <CancelIcon fontSize={"inherit"} />
              </button>
            </Tooltip>
          </div>
        </form>
      </div>
    );
}
