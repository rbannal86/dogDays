import React, { useState, useEffect } from "react";
import DayBox from "../DayBox/DayBox";
import CakeIcon from "@material-ui/icons/Cake";

import "./Month.css";

export default function Month(props) {
  const [days, setDays] = useState();
  const [recordKey, setRecordKey] = useState();

  //Month names for display
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

  //Starts month array with day names
  let monthArray = [];
  if (!props.monthName)
    monthArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  //Determines the number of days in the selected month.
  useEffect(() => {
    const makeDays = () => {
      if (monthNames[props.month] === "February") {
        if (
          props.year % 100 === 0 ? props.year % 400 === 0 : props.year % 4 === 0
        )
          setDays(29);
        else setDays(28);
      } else if (
        [
          "January",
          "March",
          "May",
          "July",
          "August",
          "October",
          "December",
        ].includes(monthNames[props.month])
      ) {
        setDays(31);
      } else setDays(30);
    };
    makeDays();
  }, [monthNames, props.month, props.year]);

  //Creates a record key based on the month and year props. Used to access correct data.
  useEffect(() => {
    let dateKey = props.month + 1;
    if (props.month + 1 < 10) dateKey = "0" + (props.month + 1);
    dateKey = dateKey.toString() + props.year.toString();
    setRecordKey(dateKey);
  }, [props.month, props.year, recordKey]);

  //Fills in month array. Adds empty 'boxes' to pad the start of the month, then
  //adds days from 1 to end of the month.
  const generateMonthArray = () => {
    let startDay = new Date(props.year, props.month, 1).getDay();
    for (let i = 0; i < startDay; i++) monthArray.push(null);
    for (let j = 1; j <= days; j++) {
      let date = new Date(props.year, props.month, j);
      monthArray.push(date.getDate());
    }
  };

  //calls month array function
  generateMonthArray();

  //creates handleClick function that determines the action taken when a date is clicked.
  //If the user is in the day details mode, will open up details for the day. Determined
  //by the existence of the handleMonthClick prop.
  let handleClick = () => {};
  if (props.handleMonthClick) handleClick = props.handleMonthClick;

  //Renders the month array. Checks if each day is the dog's birthday and renders an icon.
  //Gives each item the appropriate aggregate score for the DateBox to render the correct
  //background color.
  const renderDays = () => {
    let i = 0;
    return (
      <>
        {!props.monthName ? null : (
          <h4 className={"month_list_header"}>{props.monthName}</h4>
        )}
        <ul className={"month_list"}>
          {monthArray.map((day, index) => {
            let dayName = "";
            if (i < 7 && props.view === "month") {
              i++;
              dayName = "day_name";
            }

            let birthdayToggle = "";
            let emptyToggle = "";
            if (
              parseInt(props.month) + 1 === parseInt(props.birthMonth) &&
              day === parseInt(props.birthDay)
            )
              birthdayToggle = "birthday";
            let aggregate = null;
            if (day === null) emptyToggle = "empty_box";
            if (props.record[recordKey] && props.record[recordKey][day]) {
              if (props.record[recordKey][day].aggregate)
                aggregate = props.record[recordKey][day].aggregate;

              if (props.record[recordKey][day].aggregate.toString() === "0") {
                aggregate = "0";
              }
            }

            if (birthdayToggle === "birthday") aggregate = null;

            return (
              <li
                className={
                  "month_list_item " +
                  birthdayToggle +
                  " " +
                  emptyToggle +
                  " " +
                  props.view +
                  " " +
                  dayName
                }
                key={index}
                onClick={() => {
                  if (typeof day === "string") {
                    return null;
                  } else handleClick(day);
                }}
              >
                {birthdayToggle === "birthday" ? (
                  <CakeIcon fontSize={"inherit"} />
                ) : (
                  <DayBox date={day} aggregate={aggregate} />
                )}
              </li>
            );
          })}
        </ul>
      </>
    );
  };

  //Returns month name and year and the display of the days in the month
  return (
    <>
      {props.view === "month" ? (
        <h3>{monthNames[props.month] + " " + props.year}</h3>
      ) : null}
      {props.view === "month" ? props.CalendarNav : null}
      <div id={"month_main"}>{renderDays()}</div>
    </>
  );
}
