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

  //Takes the birthday date string and splits it into the day and month
  //for easier use
  useEffect(() => {
    setBirthMonth(props.birthday.slice(5, 7));
    setBirthDay(props.birthday.slice(8));
  }, [props.birthday]);

  //Trigger for when the records change. Makes sure to rerender with updated
  //information.
  useEffect(() => {
    setRecord(props.record);
  }, [props.record]);

  //Takes the selected date (either today's date or a date clicked on by user)
  //and breaks down the date object to determine later which year/month/week to
  //show. Also helps with comparing to birthday information
  useEffect(() => {
    if (props.selectedDate) {
      setYear(props.selectedDate.getFullYear());
      setMonth(props.selectedDate.getMonth());
      setDay(props.selectedDate.getDay());
      setDate(props.selectedDate.getDate());
      setDayLoaded(true);
    }
  }, [props.selectedDate]);

  //Passed as prop to ViewButtons, sets the view to month in dashboard
  const handleYearClick = (month) => {
    props.setSelectedDate(new Date(year, month, 1));
    props.setView("month");
  };

  //Passed as prop to ViewButtons, set the view to week in dashboard
  //Checks if toggleDetails is true and, if it is, instead packages
  //date information into a recordKey so the appropriate details are displayed
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

  //Passed as prop to CalendarNav, changes selectedDate to move calendar view
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
  //Conditional to make sure record exists (or everything will break). Fetching Data displays above loading component
  //To avoid jarring jump when loading in data.
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
                CalendarNav={CalendarNav({ handleNavClick })}
              />
            ) : null}
            {props.view === "month" ? (
              <Month
                CalendarNav={CalendarNav({ handleNavClick })}
                year={year}
                month={month}
                handleMonthClick={handleMonthClick}
                record={record}
                handleAddActivity={props.handleAddActivity}
                birthMonth={birthMonth}
                birthDay={birthDay}
                view={props.view}
              />
            ) : null}
            {props.view === "week" ? (
              <Week
                CalendarNav={CalendarNav({ handleNavClick })}
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
      </div>
    );
  else return <h2>Fetching Data</h2>;
}
