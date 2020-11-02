import React from "react";
import Month from "../Month/Month";

import "./Year.css";

export default function Year(props) {
  //Sets month names for display
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //Uses Month component to render each month for the year
  const renderMonths = () => {
    return (
      <ul className={"year_list"}>
        {monthNames.map((month, index) => {
          return (
            <li
              className={"year_list_item"}
              key={index + month}
              onClick={() => props.handleYearClick(index)}
            >
              <Month
                year={props.year}
                month={index}
                monthName={month}
                record={props.record}
                birthMonth={props.birthMonth}
                birthDay={props.birthDay}
                view={"year"}
              />
            </li>
          );
        })}
      </ul>
    );
  };

  //Shows entire year
  return (
    <>
      <h3>{props.year}</h3>
      {props.CalendarNav}
      <div id={"year_main"}>{renderMonths()}</div>
    </>
  );
}
