import React, { useState } from "react";
import MonthView from "../MonthView/MonthView";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("week");

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
      {view === "month" ? (
        <MonthView
          selectedDate={selectedDate}
          month={months[selectedDate.getMonth()]}
        />
      ) : (
        <></>
      )}
    </>
  );
}
