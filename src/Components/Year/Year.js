import React from "react";
import Month from "../Month/Month";

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
      <ul>
        {monthNames.map((month, index) => {
          return (
            <li key={index + month}>
              <Month year={props.year} month={index} monthName={month} />
            </li>
          );
        })}
      </ul>
    );
  };

  return <div id={"year_main"}>{renderMonths()}</div>;
}
