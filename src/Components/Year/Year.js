import React from "react";
import Month from "../Month/Month";

import "./Year.css";

export default function Year(props) {
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
              />
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <>
      <h3>{props.year}</h3>
      {props.CalendarNav}
      <div id={"year_main"}>{renderMonths()}</div>
    </>
  );
}
