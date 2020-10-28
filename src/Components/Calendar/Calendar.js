import React, { useState, useEffect } from "react";
import Year from "../Year/Year";
import Month from "../Month/Month";
import Week from "../Week/Week";
import CalendarNav from "../CalendarNav/CalendarNav";

import "./Calendar.css";

export default function Calendar(props) {
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);
  const [date, setDate] = useState(null);
  const [dayLoaded, setDayLoaded] = useState(false);
  const [record, setRecord] = useState(props.record);
  const [birthMonth, setBirthMonth] = useState(null);
  const [birthDay, setBirthDay] = useState(null);

  useEffect(() => {
    setBirthMonth(props.birthday.slice(5, 7));
    setBirthDay(props.birthday.slice(8));
  }, [props.birthday]);

  useEffect(() => {
    setRecord(props.record);
  }, [props.record]);

  useEffect(() => {
    if (props.selectedDate) {
      setYear(props.selectedDate.getFullYear());
      setMonth(props.selectedDate.getMonth());
      setDay(props.selectedDate.getDay());
      setDate(props.selectedDate.getDate());
      setDayLoaded(true);
    }
  }, [props.selectedDate]);

  const handleYearClick = (month) => {
    props.setSelectedDate(new Date(year, month, 1));
    props.setView("month");
  };

  const handleMonthClick = (day) => {
    props.setSelectedDate(new Date(year, month, day));
    if (!props.toggleDetails) props.setView("week");
    else {
      let recordKey;
      if (month < 9) recordKey = "0" + (month + 1).toString() + year;
      else recordKey = (month + 1).toString() + year;
      props.handleAddActivity(day, recordKey);
    }
  };

  const handleNavClick = (direction) => {
    if (direction === "back") {
      if (props.view === "year")
        props.setSelectedDate(new Date(year - 1, month, date));
      if (props.view === "month")
        props.setSelectedDate(new Date(year, month - 1, date));
      if (props.view === "week")
        props.setSelectedDate(new Date(year, month, date - 7));
    } else {
      if (props.view === "year")
        props.setSelectedDate(new Date(year + 1, month, date));
      if (props.view === "month")
        props.setSelectedDate(new Date(year, month + 1, date));
      if (props.view === "week")
        props.setSelectedDate(new Date(year, month, date + 7));
    }
  };
  if (record)
    return (
      <div className="calendar_main">
        {dayLoaded ? (
          <>
            {props.view === "year" ? (
              <Year
                year={year}
                handleYearClick={handleYearClick}
                record={record}
                handleAddActivity={null}
                birthMonth={birthMonth}
                birthDay={birthDay}
              />
            ) : null}
            {props.view === "month" ? (
              <Month
                year={year}
                month={month}
                handleMonthClick={handleMonthClick}
                record={record}
                handleAddActivity={props.handleAddActivity}
                birthMonth={birthMonth}
                birthDay={birthDay}
              />
            ) : null}
            {props.view === "week" ? (
              <Week
                date={date}
                day={day}
                month={month}
                year={year}
                record={record}
                handleAddActivity={props.handleAddActivity}
                birthMonth={birthMonth}
                birthDay={birthDay}
              />
            ) : null}
          </>
        ) : null}
        <CalendarNav handleNavClick={handleNavClick} />
      </div>
    );
  else return <h2>Fetching Data</h2>;
}
