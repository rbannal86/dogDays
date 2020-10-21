import React, { useState } from "react";
import MonthView from "../MonthView/MonthView";
import WeekView from "../WeekView/WeekView";
import DayView from "../DayView/DayView";
import ActivityRegister from "../ActivityRegister/ActivityRegister";
import CalendarNav from "../CalendarNav/CalendarNav";
import YearView from "../YearView/YearView";

import "./Calendar.css";

export default function Calendar(props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("year");
  const [openView, setOpenView] = useState(false);
  const [monthRecords, setMonthRecords] = useState(null);
  const [showActivityRegister, setShowActivityRegister] = useState(false);
  // const [dayRecords, setDayRecords] = useState(null);

  let dayRecords;
  let monthKey = `${selectedDate.getMonth() + 1}${selectedDate.getFullYear()}`;

  // if (props.monthRecords && selectedDate) {
  //   dayRecords = props.monthRecords[selectedDate.getDate()];
  // }
  // if (props.records && !monthRecords) setMonthRecords(props.records[monthKey]);

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
    <div className={"calendar_main"}>
      <button value="year" onClick={(e) => handleView(e)}>
        Year
      </button>
      <button value="week" onClick={(e) => handleView(e)}>
        Week
      </button>
      <button value="month" onClick={(e) => handleView(e)}>
        Month
      </button>
      <div>{selectedDate.toLocaleDateString()}</div>
      <CalendarNav
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        view={view}
      />
      <div className={"calendar_div"}>
        {view === "year" ? (
          <YearView selectedDate={selectedDate} records={props.records} />
        ) : null}
        {view === "week" ? <WeekView selectedDate={selectedDate} /> : null}
        {view === "month" ? (
          <MonthView selectedDate={selectedDate} view={view} />
        ) : null}
      </div>
    </div>
  );

  // return (
  //   <>
  //     <div>{selectedDate.toLocaleDateString()}</div>
  //     {/* <button value="day" onClick={(e) => handleView(e)}>
  //       Day
  //     </button> */}
  //     <button value="week" onClick={(e) => handleView(e)}>
  //       Week
  //     </button>
  //     <button value="month" onClick={(e) => handleView(e)}>
  //       Month
  //     </button>

  //     <CalendarNav
  //       selectedDate={selectedDate}
  //       setSelectedDate={setSelectedDate}
  //       view={view}
  //     />

  //     {view === "day" || openView === true ? (
  //       <DayView
  //         dayRecords={dayRecords}
  //         selectedDate={selectedDate}
  //         handleClick={handleClick}
  //         setShowActivityRegister={setShowActivityRegister}
  //       />
  //     ) : (
  //       <></>
  //     )}
  //     {showActivityRegister ? (
  //       <ActivityRegister
  //         selectedDate={selectedDate}
  //         dogId={props.dogId.id}
  //         setShowActivityRegister={setShowActivityRegister}
  //       />
  //     ) : null}
  //     {view === "month" ? (
  //       <MonthView
  //         selectedDate={selectedDate}
  //         month={months[selectedDate.getMonth()]}
  //         handleClick={handleClick}
  //         // monthRecords={props.monthRecords}
  //       />
  //     ) : (
  //       <></>
  //     )}
  //     {view === "week" ? (
  //       <WeekView
  //         // monthRecords={props.monthRecords}
  //         selectedDate={selectedDate}
  //         handleClick={handleClick}
  //       />
  //     ) : (
  //       <></>
  //     )}
  //   </>
  // );
}
