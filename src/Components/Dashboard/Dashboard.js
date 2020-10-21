import React, { useState, useEffect } from "react";
import Calendar from "../Calendar/Calendar";
import ViewButtons from "../ViewButtons/ViewButtons";

export default function Dashboard() {
  const [currentDate, setCurrentDate] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [view, setView] = useState("month");

  useEffect(() => {
    let date = new Date();
    setSelectedDate(date);
    setCurrentDate(date.toLocaleDateString());
  }, []);

  return (
    <div id={"dashboard_main"}>
      <h3
        className={"dashboard_date"}
        onClick={() => setSelectedDate(new Date())}
      >
        {currentDate ? currentDate : null}
      </h3>
      <ViewButtons view={view} setView={setView} />
      <Calendar
        view={view}
        selectedDate={selectedDate}
        setView={setView}
        setSelectedDate={setSelectedDate}
      />
    </div>
  );
}
