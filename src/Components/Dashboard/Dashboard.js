import React, { useState, useEffect } from "react";
import Calendar from "../Calendar/Calendar";
import ViewButtons from "../ViewButtons/ViewButtons";
import AddActivity from "../AddActivity/AddActivity";
import Sidebar from "../Sidebar/Sidebar";
import DetailList from "../DetailList/DetailList";

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
  const [toggleDetails, setToggleDetails] = useState(false);
  const [toggleDetailList, setToggleDetailList] = useState(false);
  const [details, setDetails] = useState(null);
  const [detailsUpdated, setDetailsUpdated] = useState(false);

  useEffect(() => {
    if (detailsUpdated) setDetailsUpdated(false);
  }, [detailsUpdated]);

  useEffect(() => {
    setDogId("9wqBrOjny3hZzOu9voV0");
  }, []);

  useEffect(() => {
    if (toggleDetailList && !toggleDetails) setToggleDetailList(false);
    if (toggleDetails && openAddActivity) setOpenAddActivity(false);
  }, [openAddActivity, toggleDetailList, toggleDetails]);

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
    if (!toggleDetails) {
      setOpenAddActivity(!openAddActivity);
      setRecordKey(recordKey);
      setDay(day);
    } else {
      if (record[recordKey]) {
        if (record[recordKey][day]) {
          setDay(day);
          setRecordKey(recordKey);
          setToggleDetailList(true);
          setDetails(record[recordKey][day].activities);
        } else setDetails("empty");
      }
    }
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
    setRecord(updatedStore);
    FSServices.updateDogRecord(dogId, updatedStore);
  };

  const handleActivityDelete = (index) => {
    let updatedStore = record;
    if (updatedStore[recordKey][day].activities.length === 1) {
      updatedStore[recordKey][day] = null;
      setDetails("empty");
    } else {
      let updatedAggregate =
        updatedStore[recordKey][day].aggregate *
          updatedStore[recordKey][day].activities.length -
        Object.values(updatedStore[recordKey][day].activities[index])[0];
      updatedStore[recordKey][day].activities.splice(index, 1);
      updatedAggregate =
        updatedAggregate / updatedStore[recordKey][day].activities.length;
      updatedStore[recordKey][day].aggregate = updatedAggregate;
    }
    setRecord(updatedStore);
    setDetailsUpdated(true);
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
      <Sidebar
        setToggleDetails={setToggleDetails}
        toggleDetails={toggleDetails}
      />
      {toggleDetailList ? (
        <DetailList
          details={details}
          handleActivityDelete={handleActivityDelete}
        />
      ) : null}
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
