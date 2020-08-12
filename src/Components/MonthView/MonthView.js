import React, { useEffect } from "react";
import DateBox from "../DateBox/DateBox";
import "./MonthView.css";

export default function MonthView(props) {
  const year = props.selectedDate.getFullYear();
  const month = props.selectedDate.getMonth();

  let days;
  let monthArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  if (props.month === "February") {
    if (year % 100 === 0 ? year % 400 === 0 : year % 4 === 0) days = 29;
    else days = 28;
  } else if (
    props.month === "January" ||
    "March" ||
    "May" ||
    "July" ||
    "August" ||
    "October" ||
    "December"
  )
    days = 31;
  else days = 30;

  const generateMonthArray = () => {
    let startDay = new Date(year, month, 1).getDay();
    for (let i = 0; i < startDay; i++) monthArray.push(null);
    for (let j = 1; j <= days; j++) {
      monthArray.push(new Date(year, month, j));
    }
  };

  generateMonthArray();

  const renderDateBoxes = () => {
    return (
      <ul className={"monthview_calendar"}>
        {monthArray.map((day, index) => {
          return (
            <li key={index} className={"calendar_listitem"}>
              <DateBox date={day} />
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <>
      <h3>Month of {props.month}</h3>
      <div>{renderDateBoxes()}</div>
    </>
  );
}
