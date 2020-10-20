import React from "react";
import "./DateBox.css";

export default function DateBox(props) {
  let emptyBox = "";
  if (!props.date) emptyBox = "empty_box";
  let aggregateShade = "empty";

  if (props.aggregate <= 10) aggregateShade = "high";
  if (props.aggregate <= 6) aggregateShade = "medium";
  if (props.aggregate <= 3) aggregateShade = "low";

  return (
    <div
      className={"datebox" + props.view + " " + emptyBox + " " + aggregateShade}
      onClick={() => props.handleClick(props.date)}
    >
      {props.view !== "year" ? (
        typeof props.date === "string" ? (
          props.date
        ) : props.date ? (
          props.date.getDate()
        ) : (
          <span />
        )
      ) : null}
      {props.dayRecords ? <div>{props.dayRecords.aggregate}</div> : <></>}
    </div>
  );
}
