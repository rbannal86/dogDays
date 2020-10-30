import React from "react";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import "./CalendarNav.css";

export default function CalendarNav(props) {
  return (
    <div className={"calendarnav_main"}>
      <button
        className={"calendarnav_button"}
        value={"back"}
        onClick={() => props.handleNavClick("back")}
      >
        <ArrowBackIcon fontSize={"inherit"} />
      </button>
      <button
        className={"calendarnav_button"}
        value={"forward"}
        onClick={() => props.handleNavClick("forward")}
      >
        <ArrowForwardIcon fontSize={"inherit"} />
      </button>
    </div>
  );
}
