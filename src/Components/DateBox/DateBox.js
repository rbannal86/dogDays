import React from "react";
import "./DateBox.css";

export default function DateBox(props) {
  return (
    <div className={"datebox"} onClick={() => console.log(props.date)}>
      {typeof props.date === "string" ? (
        props.date
      ) : props.date ? (
        props.date.toLocaleDateString()
      ) : (
        <span />
      )}
    </div>
  );
}
