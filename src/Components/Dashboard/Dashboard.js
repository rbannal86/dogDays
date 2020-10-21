import React, { useState, useEffect } from "react";
import Calendar from "../Calendar/Calendar";
import ViewButtons from "../ViewButtons/ViewButtons";
import AddActivity from "../AddActivity/AddActivity";
import STORE from "../../Services/STORE";

import FSServices from "../../Services/FSServices";

export default function Dashboard() {
  const [currentDate, setCurrentDate] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [view, setView] = useState("week");
  const [openAddActivity, setOpenAddActivity] = useState(false);
  const [recordKey, setRecordKey] = useState(null);
  const [day, setDay] = useState(null);

  useEffect(() => {
    let date = new Date();
    setSelectedDate(date);
    setCurrentDate(date.toLocaleDateString());
  }, []);

  const handleAddActivity = (day, recordKey) => {
    setOpenAddActivity(true);
    setRecordKey(recordKey);
    setDay(day);
  };

  const handleAddActivitySubmit = (activity, value) => {
    setOpenAddActivity(false);
    let updatedStore = STORE;
    if (!updatedStore[recordKey]) updatedStore[recordKey] = {};
    if (!updatedStore[recordKey][day])
      updatedStore[recordKey][day] = { aggregate: 0, activities: [] };
    updatedStore[recordKey][day].activities.push({
      [activity]: parseInt(value),
    });
    let activityTotal = 0;
    let activityNumber = 0;
    updatedStore[recordKey][day].activities.forEach((activity) => {
      activityTotal += Object.values(activity)[0];
      activityNumber++;
    });
    let newAggregate = activityTotal / activityNumber;
    updatedStore[recordKey][day].aggregate = newAggregate;
  };

  return (
    <div id={"dashboard_main"}>
      <h3
        className={"dashboard_date"}
        onClick={() => setSelectedDate(new Date())}
      >
        {currentDate ? currentDate : null}
      </h3>
      {openAddActivity ? (
        <AddActivity handleAddActivitySubmit={handleAddActivitySubmit} />
      ) : null}
      <ViewButtons view={view} setView={setView} />
      <Calendar
        view={view}
        selectedDate={selectedDate}
        setView={setView}
        setSelectedDate={setSelectedDate}
        handleAddActivity={handleAddActivity}
      />
    </div>
  );
}
