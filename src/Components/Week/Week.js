import React from "react";
import DayBox from "../DayBox/DayBox";

import "./Week.css";

export default function Week(props) {
  let weekArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let weekStart = props.date - props.day;

  for (let i = weekStart; i < weekStart + 7; i++) {
    weekArray.push(new Date(props.year, props.month, i).getDate());
  }

  const renderDays = () => {
    return (
      <ul className={"week_list"}>
        {weekArray.map((day, index) => {
          return (
            <li key={index} className={"week_list_item"}>
              <DayBox date={day} />
            </li>
          );
        })}
      </ul>
    );
  };

  return <div id={"week_main"}>{renderDays()}</div>;
}
