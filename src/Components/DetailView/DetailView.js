import React from "react";

export default function DetailView(props) {
  return (
    <div className={"detailview_main"}>
      <h4>Details for {props.day.toLocaleDateString()}</h4>
    </div>
  );
}
