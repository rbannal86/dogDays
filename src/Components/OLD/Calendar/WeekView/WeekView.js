import React from "react";
import DateBox from "../DateBox/DateBox";
import "./WeekView.css";

export default function WeekView(props) {
  let weekArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let dayOfWeek = props.selectedDate.getDay();

  let weekStart = props.selectedDate.getDate() - dayOfWeek;

  for (let i = weekStart; i < weekStart + 7; i++) {
    weekArray.push(
      new Date(
        props.selectedDate.getFullYear(),
        props.selectedDate.getMonth(),
        i
      )
    );
  }

  const renderDateBoxes = () => {
    return (
      <ul className={"weekview_calendar"}>
        {weekArray.map((day, index) => {
          let dayRecords;
          if (props.monthRecords && typeof day !== "string")
            dayRecords = props.monthRecords[day.getDate()];
          return (
            <li key={index} className={"calendar_listitem"}>
              <DateBox
                date={day}
                handleClick={props.handleClick}
                dayRecords={dayRecords}
              />
            </li>
          );
        })}
      </ul>
    );
  };

  return <div>{renderDateBoxes()}</div>;
}
