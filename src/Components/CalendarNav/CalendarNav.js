import React from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import "./CalendarNav.css";

export default function CalendarNav(props) {
  return (
    <div className={"calendarnav_main"}>
      <button
        className={"calendarnav_button"}
        value={"back"}
        onClick={() => props.handleNavClick("back")}
      >
        <ArrowBackIosIcon fontSize={"inherit"} />
      </button>
      <button
        className={"calendarnav_button"}
        value={"forward"}
        onClick={() => props.handleNavClick("forward")}
      >
        <ArrowForwardIosIcon fontSize={"inherit"} />
      </button>
    </div>
  );
}
