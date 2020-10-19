import React, { useState, useEffect } from "react";
import MonthView from "../MonthView/MonthView";
import "./YearView.css";

export default function YearView(props) {
  const [year, setYear] = useState(props.selectedDate.getFullYear());

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
    return monthNames.map((month, index) => {
      return (
        <MonthView
          view={"year"}
          key={index}
          selectedDate={new Date(year, index, 1)}
          month={month}
        />
      );
    });
  };

  useEffect(() => {
    if (props.selectedDate.getFullYear() !== year)
      setYear(props.selectedDate.getFullYear());
  }, [props.selectedDate, year]);

  return <div className={"yearview_div"}>{renderMonths()}</div>;
}
