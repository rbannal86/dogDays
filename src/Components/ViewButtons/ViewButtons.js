import React from "react";

export default function ViewButtons(props) {
  return (
    <div id="viewbuttons_main">
      {props.view === "year" ? null : (
        <button onClick={() => props.setView("year")}>year</button>
      )}
      {props.view === "month" ? null : (
        <button onClick={() => props.setView("month")}>month</button>
      )}
      {props.view === "week" ? null : (
        <button onClick={() => props.setView("week")}>week</button>
      )}
    </div>
  );
}
