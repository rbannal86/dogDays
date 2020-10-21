import React from "react";
import DayBox from "../DayBox/DayBox";

import "./Month.css";

export default function Month(props) {
  let days;
  let monthArray = [];
  if (!props.monthName)
    monthArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  if (props.month === "February") {
    if (props.year % 100 === 0 ? props.year % 400 === 0 : props.year % 4 === 0)
      days = 29;
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
    let startDay = new Date(props.year, props.month, 1).getDay();
    for (let i = 0; i < startDay; i++) monthArray.push(null);
    for (let j = 1; j <= days; j++) {
      let date = new Date(props.year, props.month, j);
      monthArray.push(date.getDate());
    }
  };

  generateMonthArray();

  const renderDays = () => {
    return (
      <>
        {!props.monthName ? null : (
          <h4 className={"month_list_header"}>{props.monthName}</h4>
        )}
        <ul className={"month_list"}>
          {monthArray.map((day, index) => {
            return (
              <li className={"month_list_item"} key={index}>
                <DayBox date={day} />
              </li>
            );
          })}
        </ul>
      </>
    );
  };

  return <div id={"month_main"}>{renderDays()}</div>;
}
