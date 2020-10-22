import React, { useState, useEffect } from "react";
import Calendar from "../Calendar/Calendar";
import ViewButtons from "../ViewButtons/ViewButtons";
import AddActivity from "../AddActivity/AddActivity";
import Sidebar from "../Sidebar/Sidebar";

import FSServices from "../../Services/FSServices";

export default function Dashboard() {
  const [currentDate, setCurrentDate] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [view, setView] = useState("week");
  const [openAddActivity, setOpenAddActivity] = useState(false);
  const [recordKey, setRecordKey] = useState(null);
  const [day, setDay] = useState(null);
  const [dogId, setDogId] = useState(null);
  const [record, setRecord] = useState(null);

  useEffect(() => {
    setDogId("9wqBrOjny3hZzOu9voV0");
  }, []);

  useEffect(() => {
    if (dogId) {
      FSServices.fetDogRecords(dogId).then((res) => setRecord(res));
    }
  }, [dogId]);

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
    let updatedStore = record;
    if (!updatedStore[recordKey])
      updatedStore[recordKey] = {
        [day]: { aggregate: 0, activities: [{ [activity]: value }] },
      };
    else if (!updatedStore[recordKey][day])
      updatedStore[recordKey][day] = {
        aggregate: 0,
        activities: [{ [activity]: value }],
      };
    else
      updatedStore[recordKey][day].activities.push({
        [activity]: value,
      });
    let activityTotal = 0;
    let activityNumber = 0;
    updatedStore[recordKey][day].activities.forEach((activity) => {
      activityTotal += Object.values(activity)[0];
      activityNumber++;
    });
    let newAggregate = activityTotal / activityNumber;
    updatedStore[recordKey][day].aggregate = newAggregate;
    console.log(updatedStore);
    setRecord(updatedStore);
    FSServices.updateDogRecord(dogId, updatedStore);
  };

  return (
    <div id={"dashboard_main"}>
      <h3
        className={"dashboard_date"}
        onClick={() => setSelectedDate(new Date())}
      >
        {currentDate ? currentDate : null}
      </h3>
      <Sidebar />
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
        record={record}
      />
    </div>
  );
}
