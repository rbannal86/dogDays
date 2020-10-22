import React from "react";

export default function Sidebar(props) {
  return (
    <div className={"sidebar_main"}>
      <button onClick={() => props.setToggleDetails(!props.toggleDetails)}>
        Details
      </button>
      <button>Dog List</button>
    </div>
  );
}
