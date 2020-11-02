import React, { useState, useEffect } from "react";

import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import DetailsIcon from "@material-ui/icons/Details";
import PetsIcon from "@material-ui/icons/Pets";
import EventNoteIcon from "@material-ui/icons/EventNote";
import Tooltip from "@material-ui/core/Tooltip";
import HelpIcon from "@material-ui/icons/Help";

import "./Sidebar.css";

export default function Sidebar(props) {
  const [dayDetails, setDayDetails] = useState("");
  const [dogDetails, setDogDetails] = useState("");
  const [addNewDog, setAddNewDog] = useState("");
  const [helpPage, setHelpPage] = useState("");

  //Checks to make sure that buttons that shouldn't be active aren't
  useEffect(() => {
    if (addNewDog && !props.toggleAddDog) setAddNewDog(false);
    if (dogDetails && !props.toggleDogDetails) setDogDetails(false);
  }, [addNewDog, props.toggleAddDog, dogDetails, props.toggleDogDetails]);

  //the following functions toggle between active and not for styling purposes.
  const handleHelp = () => {
    if (helpPage === "") setHelpPage("open");
    else setHelpPage("");
  };

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

  //Renders buttons with onClick for opening the appropriate view in the Dashboard
  //and highlighting button or turning off the highlighting
  return (
    <div className={"sidebar_main"}>
      <Tooltip title={"Show Day Details"} placement={"top"}>
        <button
          className={"sidebar_button " + dayDetails}
          onClick={() => {
            handleDayDetails();
            if (props.toggleHelpPage) {
              props.setToggleHelpPage(!props.toggleHelpPage);
              handleHelp();
            }
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
            if (props.toggleHelpPage) {
              props.setToggleHelpPage(!props.toggleHelpPage);
              handleHelp();
            }
            if (props.toggleAddDog) {
              props.setToggleAddDog(!props.toggleAddDog);
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
            props.setToggleAddDog(false);
            props.setToggleDetails(false);
            props.setToggleDogDetails(false);
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
            if (props.toggleHelpPage) {
              props.setToggleHelpPage(!props.toggleHelpPage);
              handleHelp();
            }
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
      <Tooltip title={"Open User Guide"} placement={"top"}>
        <button
          className={"sidebar_button " + helpPage}
          onClick={() => {
            handleHelp();
            if (props.toggleDetails) {
              props.setToggleAddDog(!props.toggleDetails);
              handleAddNewDog();
            }
            if (props.toggleDogDetails) {
              props.setToggleDogDetails(!props.toggleDogDetails);
              handleDogDetails();
            }
            if (props.toggleAddDog) {
              props.setToggleAddDog(!props.toggleAddDog);
              handleAddNewDog();
            }
            props.setToggleHelpPage(!props.toggleHelpPage);
          }}
        >
          <HelpIcon />
        </button>
      </Tooltip>
    </div>
  );
}
