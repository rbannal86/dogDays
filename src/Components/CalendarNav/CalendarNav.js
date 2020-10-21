import React from "react";

export default function CalendarNav(props) {
  return (
    <div className={"calendarnav_main"}>
      <button
        value={"back"}
        onClick={(e) => props.handleNavClick(e.target.value)}
      >
        {"<"}
      </button>
      <button
        value={"forward"}
        onClick={(e) => props.handleNavClick(e.target.value)}
      >
        {">"}
      </button>
    </div>
  );
}
