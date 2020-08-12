import React from "react";
import "./DateBox.css";

export default function DateBox(props) {
  return (
    <div className={"datebox"}>
      {props.date ? props.date.toLocaleDateString() : <span />}
    </div>
  );
}
