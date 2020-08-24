import React, { useState } from "react";
import MonthView from "../MonthView/MonthView";
import WeekView from "../WeekView/WeekView";
import DayView from "../DayView/DayView";

export default function Calendar(props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("week");
  const [openView, setOpenView] = useState(false);
  const [showActivityRegister, setShowActivityRegister] = useState(false);
  // const [dayRecords, setDayRecords] = useState(null);

  let dayRecords;

  if (props.monthRecords) {
    dayRecords = props.monthRecords[selectedDate.getDate()];
  }

  // const todaysDate = new Date();

  const months = [
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

  const handleView = (e) => {
    setView(e.target.value);
  };

  const handleClick = (day) => {
    console.log(typeof day);
    if (typeof day !== "object" || day === null) return null;
    setSelectedDate(day);
    props.setSelectedDate(day);
    setOpenView(true);
  };

  return (
    <>
      <div>{selectedDate.toLocaleDateString()}</div>
      <button value="day" onClick={(e) => handleView(e)}>
        Day
      </button>
      <button value="week" onClick={(e) => handleView(e)}>
        Week
      </button>
      <button value="month" onClick={(e) => handleView(e)}>
        Month
      </button>
      {view === "day" || openView === true ? (
        <DayView
          dayRecords={dayRecords}
          selectedDate={selectedDate}
          handleClick={handleClick}
          setShowActivityRegister={setShowActivityRegister}
        />
      ) : (
        <></>
      )}
      {showActivityRegister ? <div>Activity Form</div> : null}
      {view === "month" ? (
        <MonthView
          selectedDate={selectedDate}
          month={months[selectedDate.getMonth()]}
          handleClick={handleClick}
        />
      ) : (
        <></>
      )}
      {view === "week" ? (
        <WeekView
          monthRecords={props.monthRecords}
          selectedDate={selectedDate}
          handleClick={handleClick}
        />
      ) : (
        <></>
      )}
    </>
  );
}
