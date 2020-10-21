import React, { useState, useEffect } from "react";
import Calendar from "../Calendar/Calendar";
import ViewButtons from "../ViewButtons/ViewButtons";

export default function Dashboard() {
  const [currentDate, setCurrentDate] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [view, setView] = useState("week");

  useEffect(() => {
    let date = new Date();
    setSelectedDate(date);
    setCurrentDate(date.toLocaleDateString());
  }, []);

  return (
    <div id={"dashboard_main"}>
      <h3>{currentDate ? currentDate : null}</h3>
      <ViewButtons view={view} setView={setView} />
      <Calendar view={view} selectedDate={selectedDate} />
    </div>
  );
}
