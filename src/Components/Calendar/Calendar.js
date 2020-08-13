import React, { useState } from "react";
import MonthView from "../MonthView/MonthView";
import DetailView from "../DetailView/DetailView";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("week");
  const [openView, setOpenView] = useState(false);

  const todaysDate = new Date();

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
    setOpenView(true);
  };

  return (
    <>
      <div>{todaysDate.toLocaleDateString()}</div>
      {openView ? <DetailView day={selectedDate} /> : <></>}
      <button value="day" onClick={(e) => handleView(e)}>
        Day
      </button>
      <button value="week" onClick={(e) => handleView(e)}>
        Week
      </button>
      <button value="month" onClick={(e) => handleView(e)}>
        Month
      </button>
      {view === "month" ? (
        <MonthView
          selectedDate={selectedDate}
          month={months[selectedDate.getMonth()]}
          handleClick={handleClick}
        />
      ) : (
        <></>
      )}
    </>
  );
}
