import React from "react";
import DayBox from "../DayBox/DayBox";
import CakeIcon from "@material-ui/icons/Cake";

import "./Week.css";

export default function Week(props) {
  let weekArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let recordArray = [null, null, null, null, null, null, null];
  let recordKeyObject = {};
  let weekStart = props.date - props.day;

  for (let i = weekStart; i < weekStart + 7; i++) {
    let newDay = new Date(props.year, props.month, i);
    let recordKey = newDay.getMonth();
    recordKey = recordKey + 1;
    if (recordKey < 10) recordKey = "0" + recordKey;
    recordKey = recordKey + newDay.getFullYear().toString();
    if (props.record[recordKey] && props.record[recordKey][newDay.getDate()]) {
      if (props.record[recordKey][newDay.getDate()].aggregate)
        recordArray.push(props.record[recordKey][newDay.getDate()].aggregate);
      if (
        props.record[recordKey][newDay.getDate()].aggregate.toString() === "0"
      )
        recordArray.push("0");
    } else recordArray.push(null);
    recordKeyObject[newDay.getDate()] = recordKey;
    weekArray.push(newDay.getDate());
  }

  const renderDays = () => {
    return (
      <ul className={"week_list"}>
        {weekArray.map((day, index) => {
          let clickFunc;
          if (typeof day === "string")
            clickFunc = () => {
              return null;
            };
          else clickFunc = props.handleAddActivity;
          let birthdayToggle = "";
          if (recordKeyObject[day]) {
            let dateMonth = parseInt(recordKeyObject[day].slice(0, 2));
            if (
              dateMonth === parseInt(props.birthMonth) &&
              day === parseInt(props.birthDay)
            )
              birthdayToggle = "birthday";
          }
          return (
            <li
              key={index}
              className={"week_list_item " + birthdayToggle}
              onClick={() => clickFunc(day, recordKeyObject[day])}
            >
              {birthdayToggle === "birthday" ? (
                <CakeIcon />
              ) : (
                <DayBox date={day} aggregate={recordArray[index]} />
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className={"week_main"}>
      <h3 className={"week_title"}>
        Week of {props.month + 1}/{props.date}/{props.year}
      </h3>
      {props.CalendarNav}
      {renderDays()}
    </div>
  );
}
