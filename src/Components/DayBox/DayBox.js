import React from "react";
import "./DayBox.css";

export default function DayBox(props) {
  //Checks if the box is 'structural' and, if it is, gives it
  //a class tag that essentially hides it.
  let emptyBox = "";
  if (!props.date) emptyBox = "empty";

  //Checks for an aggregate score and sets a class tag that
  //determines what color the box should be
  let range = "";
  if (props.aggregate) {
    if (props.aggregate <= 10) range = "ten";
    if (props.aggregate <= 9) range = "nine";
    if (props.aggregate <= 8) range = "eight";
    if (props.aggregate <= 7) range = "seven";
    if (props.aggregate <= 6) range = "six";
    if (props.aggregate <= 5) range = "five";
    if (props.aggregate <= 4) range = "four";
    if (props.aggregate <= 3) range = "three";
    if (props.aggregate <= 2) range = "two";
    if (props.aggregate <= 1) range = "one";
  }

  return (
    <div className={"daybox " + emptyBox + " " + range}>
      {props.date ? props.date : null}
    </div>
  );
}
