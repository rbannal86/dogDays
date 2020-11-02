import React, { useState, useEffect } from "react";
import Calendar from "../Calendar/Calendar";
import ViewButtons from "../ViewButtons/ViewButtons";
import AddActivity from "../AddActivity/AddActivity";
import Sidebar from "../Sidebar/Sidebar";
import DetailList from "../DetailList/DetailList";
import DogDetails from "../DogDetails/DogDetails";
import AddDog from "../AddDog/AddDog";
import LoadingDisplay from "../LoadingDisplay/LoadingDisplay";
import UserGuide from "../UserGuide/UserGuide";

import FSServices from "../../Services/FSServices";
import DogSelection from "../DogSelection/DogSelection";

import "./Dashboard.css";

export default function Dashboard(props) {
  const [currentDate, setCurrentDate] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [view, setView] = useState("year");
  const [openAddActivity, setOpenAddActivity] = useState(false);
  const [recordKey, setRecordKey] = useState(null);
  const [day, setDay] = useState(null);

  const [toggleDetails, setToggleDetails] = useState(false);
  const [toggleDetailList, setToggleDetailList] = useState(false);
  const [details, setDetails] = useState(null);
  const [detailsUpdated, setDetailsUpdated] = useState(false);
  const [toggleDogDetails, setToggleDogDetails] = useState(false);
  const [toggleAddDog, setToggleAddDog] = useState(false);
  const [toggleHelpPage, setToggleHelpPage] = useState(false);
  const [deletingRecords, setDeletingRecords] = useState(false);

  //Dog Information State
  const [dogId, setDogId] = useState(null);
  const [dogName, setDogName] = useState(null);
  const [record, setRecord] = useState(null);
  const [dogBreed, setDogBreed] = useState(null);
  const [dogBirthday, setDogBirthday] = useState(null);

  const [loading, setLoading] = useState(true);

  //Handles scrolling entire dashboard into view
  const handleScroll = () => {
    if (
      document.getElementById("dashboard_bottom") &&
      !toggleDetailList &&
      !toggleDogDetails &&
      !toggleAddDog &&
      !loading
    ) {
      document
        .getElementById("dashboard_bottom")
        .scrollIntoView({ behavior: "smooth" });
    }
  };

  setTimeout(() => {
    handleScroll();
  }, 200);

  useEffect(() => {
    if (loading)
      setTimeout(() => {
        setLoading(false);
      }, 2000);
  }, [loading]);

  useEffect(() => {
    if (detailsUpdated) setDetailsUpdated(false);
  }, [detailsUpdated]);

  useEffect(() => {
    if (props.userData.dogs.length === 1 && props.dogList[0]) {
      setDogId(props.userData.dogs[0]);
      let dog = props.dogList[0];
      setDogBirthday(dog.dogBirthday);
      setDogBreed(dog.dogBreed);
      setRecord(dog.record);
      setDogName(dog.dogName);
    }
  }, [props.dogList, props.userData.dogs]);

  useEffect(() => {
    if (toggleDetailList && !toggleDetails) setToggleDetailList(false);
    if (toggleDetails && openAddActivity) setOpenAddActivity(false);
  }, [openAddActivity, toggleDetailList, toggleDetails]);

  useEffect(() => {
    if (props.userId !== "qf6wsu9crIflZ7f980XDzHxAxrz2") {
      let date = new Date();
      setSelectedDate(date);
      setCurrentDate(date.toLocaleDateString());
    } else {
      let date = new Date(2020, 10, 1);
      setSelectedDate(date);
      setCurrentDate(date.toLocaleDateString());
    }
  }, [props.userId]);

  const handleNewDog = (dogId, dogList) => {
    let newDog = dogList.filter((dog) => dog.id === dogId)[0];
    setDogId(dogId);
    props.setDogList(dogList);
    setDogName(newDog.dogName);
    setDogBreed(newDog.dogBreed);
    setRecord(newDog.record);
    setDogBirthday(newDog.dogBirthday);
    setToggleAddDog(false);
  };

  const deleteTransition = () => {
    setDeletingRecords(true);
    setTimeout(() => {
      setDeletingRecords(false);
    }, 5000);
  };

  const handleDeleteDog = (dogList) => {
    props.setDogList(dogList);
    setDogName(null);
    setDogBreed(null);
    setRecord(null);
    setDogBirthday(null);
    setDogId(null);
    deleteTransition();
  };

  const handleAddActivity = (day, recordKey) => {
    if (!toggleDetails) {
      setOpenAddActivity(!openAddActivity);
      setRecordKey(recordKey);
      setDay(day);
    } else {
      setRecordKey(recordKey);
      setDay(day);
      if (record[recordKey]) {
        if (record[recordKey][day]) {
          setDay(day);
          setToggleDetailList(true);
          setDetails(record[recordKey][day].activities);
        } else {
          setToggleDetailList(true);
          setDetails("empty");
        }
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
  if (deletingRecords)
    return (
      <>
        <h2>Deleting Records</h2>
        <LoadingDisplay />
      </>
    );
  else if (loading)
    return (
      <>
        <h2>Fetching Dogs</h2>
        <LoadingDisplay />
      </>
    );
  else if (props.dogList.length === 0)
    return (
      <div className={"dashboard_main"}>
        <AddDog
          setToggleAddDog={setToggleAddDog}
          dogs={props.userData.dogs}
          setUserData={props.setUserData}
          userId={props.userData.id}
          setDogList={props.setDogList}
          handleNewDog={handleNewDog}
        />
      </div>
    );
  if (dogId && dogName && dogBreed && dogBirthday)
    return (
      <div className={"dashboard_main"} id={"dashboard_main_id"}>
        <div className={"dashboard_information"}>
          <h4
            className={"dashboard_date"}
            onClick={() => {
              setSelectedDate(new Date());
              setView("week");
            }}
          >
            {currentDate ? currentDate : null}
          </h4>
          <h4 className={"dashboard_display_name"}>
            {props.userData.displayName ? props.userData.displayName : null}
          </h4>
        </div>
        <Sidebar
          setToggleDetails={setToggleDetails}
          toggleDetails={toggleDetails}
          setRecord={setRecord}
          setDogId={setDogId}
          setDogName={setDogName}
          setToggleDogDetails={setToggleDogDetails}
          toggleDogDetails={toggleDogDetails}
          setToggleAddDog={setToggleAddDog}
          toggleAddDog={toggleAddDog}
          setToggleHelpPage={setToggleHelpPage}
          toggleHelpPage={toggleHelpPage}
        />

        <div className={"dashboard_dog_name_div"}>
          <h5 className={"dashboard_dog_name"}>{dogName ? dogName : null}</h5>
        </div>
        {toggleAddDog ? (
          <AddDog
            setToggleAddDog={setToggleAddDog}
            dogs={props.userData.dogs}
            setUserData={props.setUserData}
            userId={props.userData.id}
            setDogList={props.setDogList}
            handleNewDog={handleNewDog}
          />
        ) : null}
        {toggleDogDetails ? (
          <DogDetails
            dogName={dogName}
            dogBirthday={dogBirthday}
            dogBreed={dogBreed}
            dogId={dogId}
            setDogBirthday={setDogBirthday}
            setDogName={setDogName}
            setDogBreed={setDogBreed}
            setDogList={props.setDogList}
            setUserData={props.setUserData}
            userData={props.userData}
            setDogId={setDogId}
            setToggleDogDetails={setToggleDogDetails}
            handleDeleteDog={handleDeleteDog}
          />
        ) : null}
        {toggleDetailList ? (
          <DetailList
            details={details}
            recordKey={recordKey}
            day={day}
            handleActivityDelete={handleActivityDelete}
          />
        ) : null}
        {openAddActivity ? (
          <AddActivity handleAddActivitySubmit={handleAddActivitySubmit} />
        ) : null}
        <div id={"dashboard_bottom"} />
        {toggleHelpPage ? (
          <UserGuide />
        ) : (
          <>
            <ViewButtons view={view} setView={setView} />
            <Calendar
              view={view}
              selectedDate={selectedDate}
              setView={setView}
              setSelectedDate={setSelectedDate}
              handleAddActivity={handleAddActivity}
              record={record}
              birthday={dogBirthday}
              toggleDetails={toggleDetails}
              toggleDetailList={toggleDetailList}
              setToggleDetailList={setToggleDetailList}
            />
          </>
        )}
      </div>
    );
  else
    return (
      <>
        <DogSelection
          dogList={props.dogList}
          setDogId={setDogId}
          setRecord={setRecord}
          setDogName={setDogName}
          setDogBirthday={setDogBirthday}
          setDogBreed={setDogBreed}
        />
      </>
    );
}
