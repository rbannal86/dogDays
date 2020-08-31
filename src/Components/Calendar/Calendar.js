import React, { useState } from "react";
import MonthView from "../MonthView/MonthView";
import WeekView from "../WeekView/WeekView";
import DayView from "../DayView/DayView";
import ActivityRegister from "../ActivityRegister/ActivityRegister";
import CalendarNav from "../CalendarNav/CalendarNav";

export default function Calendar(props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("week");
  const [openView, setOpenView] = useState(false);
  const [showActivityRegister, setShowActivityRegister] = useState(false);
  // const [dayRecords, setDayRecords] = useState(null);

  let dayRecords;

  if (props.monthRecords && selectedDate) {
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
    if (typeof day !== "object" || day === null) return null;
    setSelectedDate(day);
    props.setSelectedDate(day);
    setOpenView(true);
  };

  return (
    <>
      <div>{selectedDate.toLocaleDateString()}</div>
      {/* <button value="day" onClick={(e) => handleView(e)}>
        Day
      </button> */}
      <button value="week" onClick={(e) => handleView(e)}>
        Week
      </button>
      <button value="month" onClick={(e) => handleView(e)}>
        Month
      </button>

      <CalendarNav
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        view={view}
      />

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
      {showActivityRegister ? (
        <ActivityRegister
          selectedDate={selectedDate}
          dogId={props.dogId.id}
          setShowActivityRegister={setShowActivityRegister}
        />
      ) : null}
      {view === "month" ? (
        <MonthView
          selectedDate={selectedDate}
          month={months[selectedDate.getMonth()]}
          handleClick={handleClick}
          monthRecords={props.monthRecords}
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
