import React from "react";
import "./DayBox.css";

export default function DayBox(props) {
  let emptyBox = "";
  if (!props.date) emptyBox = "empty";
  let range = "";
  if (props.aggregate) {
    if (props.aggregate <= 10) range = "green";
    if (props.aggregate <= 7) range = "yellow";
    if (props.aggregate <= 3) range = "red";
  }

  return (
    <div className={"daybox " + emptyBox + " " + range}>
      {props.date ? props.date : null}
    </div>
  );
}
