import React from "react";

export default function Sidebar(props) {
  return (
    <div className={"sidebar_main"}>
      <button onClick={() => props.setToggleDetails(!props.toggleDetails)}>
        Details
      </button>
      <button
        onClick={() => {
          props.setDogId(null);
          props.setRecord(null);
          props.setDogName(null);
        }}
      >
        Dog List
      </button>
      <button
        onClick={() => props.setToggleDogDetails(!props.toggleDogDetails)}
      >
        Dog Details
      </button>
      <button onClick={() => props.setToggleAddDog(!props.toggleAddDog)}>
        Add Dog
      </button>
    </div>
  );
}
