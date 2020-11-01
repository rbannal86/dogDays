import React, { useState, useEffect } from "react";

import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import DetailsIcon from "@material-ui/icons/Details";
import PetsIcon from "@material-ui/icons/Pets";
import EventNoteIcon from "@material-ui/icons/EventNote";
import Tooltip from "@material-ui/core/Tooltip";

import "./Sidebar.css";

export default function Sidebar(props) {
  const [dayDetails, setDayDetails] = useState("");
  const [dogDetails, setDogDetails] = useState("");
  const [addNewDog, setAddNewDog] = useState("");

  useEffect(() => {
    if (addNewDog && !props.toggleAddDog) setAddNewDog(false);
  }, [addNewDog, props.toggleAddDog]);

  const handleDayDetails = () => {
    if (dayDetails === "") setDayDetails("open");
    else setDayDetails("");
  };

  const handleDogDetails = () => {
    if (dogDetails === "") setDogDetails("open");
    else setDogDetails("");
  };

  const handleAddNewDog = () => {
    if (addNewDog === "") setAddNewDog("open");
    else setAddNewDog("");
  };

  return (
    <div className={"sidebar_main"}>
      <Tooltip title={"Show Day Details"} placement={"top"}>
        <button
          className={"sidebar_button " + dayDetails}
          onClick={() => {
            handleDayDetails();
            if (props.toggleAddDog) {
              props.setToggleAddDog(!props.toggleAddDog);
              handleAddNewDog();
            }
            if (props.toggleDogDetails) {
              props.setToggleDogDetails(!props.toggleDogDetails);
              handleDogDetails();
            }
            props.setToggleDetails(!props.toggleDetails);
          }}
        >
          <EventNoteIcon />
        </button>
      </Tooltip>
      <Tooltip title={"Show Dog Details"} placement={"top"}>
        <button
          className={"sidebar_button " + dogDetails}
          onClick={() => {
            handleDogDetails();
            if (props.addNewDog) {
              props.setToggleAddDog(!props.addNewDog);
              handleAddNewDog();
            }
            if (props.toggleDetails) {
              props.setToggleDetails(!props.toggleDetails);
              handleDayDetails();
            }
            props.setToggleDogDetails(!props.toggleDogDetails);
          }}
        >
          <DetailsIcon />
        </button>
      </Tooltip>
      <Tooltip title={"Open Dog List"} placement={"top"}>
        <button
          className={"sidebar_button"}
          onClick={() => {
            props.setDogId(null);
            props.setRecord(null);
            props.setDogName(null);
          }}
        >
          <PetsIcon />
        </button>
      </Tooltip>
      <Tooltip title={"Add New Dog"} placement={"top"}>
        <button
          className={"sidebar_button " + addNewDog}
          onClick={() => {
            handleAddNewDog();
            if (props.toggleDetails) {
              props.setToggleAddDog(!props.toggleDetails);
              handleAddNewDog();
            }
            if (props.toggleDogDetails) {
              props.setToggleDogDetails(!props.toggleDogDetails);
              handleDogDetails();
            }
            props.setToggleAddDog(!props.toggleAddDog);
          }}
        >
          <PlaylistAddIcon />
        </button>
      </Tooltip>
    </div>
  );
}
