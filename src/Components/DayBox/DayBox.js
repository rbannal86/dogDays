import React from "react";

export default function DayBox(props) {
  let emptyBox = "";
  if (!props.date) emptyBox = "empty";

  return <div className={"daybox"}>{props.date ? props.date : null}</div>;
}
