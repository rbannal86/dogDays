import React from "react";
import "./DateBox.css";

export default function DateBox(props) {
  let emptyBox = "";
  if (!props.date) emptyBox = "empty_box";

  console.log(props.view);

  return (
    <div
      className={"datebox" + props.view + " " + emptyBox}
      onClick={() => props.handleClick(props.date)}
    >
      {props.view !== "year" ? (
        typeof props.date === "string" ? (
          props.date
        ) : props.date ? (
          props.date.toLocaleDateString()
        ) : (
          <span />
        )
      ) : null}
      {props.dayRecords ? <div>{props.dayRecords.aggregate}</div> : <></>}
    </div>
  );
}
