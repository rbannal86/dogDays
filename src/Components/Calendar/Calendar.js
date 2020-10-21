import React, { useState, useEffect } from "react";
import Year from "../Year/Year";
import Month from "../Month/Month";
import Week from "../Week/Week";

export default function Calendar(props) {
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);
  const [date, setDate] = useState(null);
  const [dayLoaded, setDayLoaded] = useState(false);

  useEffect(() => {
    if (props.selectedDate) {
      setYear(props.selectedDate.getFullYear());
      setMonth(props.selectedDate.getMonth());
      setDay(props.selectedDate.getDay());
      setDate(props.selectedDate.getDate());
      setDayLoaded(true);
    }
  }, [props.selectedDate]);

  return (
    <div id="calendar_main">
      {dayLoaded ? (
        <>
          {props.view === "year" ? <Year year={year} /> : null}
          {props.view === "month" ? <Month year={year} month={month} /> : null}
          {props.view === "week" ? (
            <Week date={date} day={day} month={month} year={year} />
          ) : null}
        </>
      ) : null}
    </div>
  );
}
