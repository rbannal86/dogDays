import React from "react";
import DateBox from "../DateBox/DateBox";
import "./MonthView.css";

export default function MonthView(props) {
  const year = props.selectedDate.getFullYear();
  const month = props.selectedDate.getMonth();

  let days;
  let dateBoxGroup = [[], [], [], [], [], [], []];
  let monthArray = [];

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
    for (let i = 0; i < startDay; i++) monthArray.push("");
    for (let j = 1; j <= days; j++) {
      monthArray.push(new Date(year, month, j));
    }
    console.log(monthArray);
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

  // const generateDays = () => {
  //   for (let i = 1; i <= days; i++) {
  //     let day = new Date(year, month, i);
  //     let dayOfTheWeek = day.getDay();
  //     dateBoxGroup[dayOfTheWeek].push(day);
  //   }
  // };

  // const renderDateBoxes = () => {
  //   let startDay = new Date(year, month, 1).getDay();
  //   let orderedArray = [];
  //   let i = 1;
  //   let arraySpot = 1;

  //   while (i <= days) {
  //     orderedArray.push({
  //       date: dateBoxGroup[startDay][arraySpot - 1],
  //       dayOfTheWeek: startDay,
  //     });
  //     if (i % 7 === 0) arraySpot++;
  //     if (startDay === 6) startDay = 0;
  //     else startDay++;

  //     i++;
  //   }
  //   console.log(orderedArray);
  //   return (
  //     <ul className={"MonthView_calendar"}>
  //       {orderedArray.map((day, index) => {
  //         if (day !== undefined)
  //           return (
  //             <li key={index}>
  //               <DateBox day={day} />
  //             </li>
  //           );
  //         else return null;
  //       })}
  //     </ul>
  //   );
  // };

  // generateDays();

  return (
    <>
      <h3>Month of {props.month}</h3>
      <div>
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        {renderDateBoxes()}
      </div>
    </>
  );
}
