import React, { useState, useEffect } from "react";
import DayBox from "../DayBox/DayBox";
import CakeIcon from "@material-ui/icons/Cake";

import "./Month.css";

export default function Month(props) {
  const [days, setDays] = useState();
  const [recordKey, setRecordKey] = useState();

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

  let monthArray = [];
  if (!props.monthName)
    monthArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

  useEffect(() => {
    let dateKey = props.month + 1;
    if (props.month + 1 < 10) dateKey = "0" + (props.month + 1);
    dateKey = dateKey.toString() + props.year.toString();
    setRecordKey(dateKey);
  }, [props.month, props.year, recordKey]);

  const generateMonthArray = () => {
    let startDay = new Date(props.year, props.month, 1).getDay();
    for (let i = 0; i < startDay; i++) monthArray.push(null);
    for (let j = 1; j <= days; j++) {
      let date = new Date(props.year, props.month, j);
      monthArray.push(date.getDate());
    }
  };

  generateMonthArray();

  let handleClick = () => {};
  if (props.handleMonthClick) handleClick = props.handleMonthClick;
  const renderDays = () => {
    return (
      <>
        {!props.monthName ? null : (
          <h4 className={"month_list_header"}>{props.monthName}</h4>
        )}
        <ul className={"month_list"}>
          {monthArray.map((day, index) => {
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

            return (
              <li
                className={
                  "month_list_item " + birthdayToggle + " " + emptyToggle
                }
                key={index}
                onClick={() => handleClick(day)}
              >
                {birthdayToggle === "birthday" ? <CakeIcon /> : null}
                <DayBox date={day} aggregate={aggregate} />
              </li>
            );
          })}
        </ul>
      </>
    );
  };

  return (
    <>
      <h3>{monthNames[props.month]}</h3>
      {props.view === "month" ? props.CalendarNav : null}
      <div id={"month_main"}>{renderDays()}</div>
    </>
  );
}
