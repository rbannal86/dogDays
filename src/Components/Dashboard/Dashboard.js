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

  //View Toggles
  const [toggleDetails, setToggleDetails] = useState(false);
  const [toggleDetailList, setToggleDetailList] = useState(false);
  const [details, setDetails] = useState(null);
  const [detailsUpdated, setDetailsUpdated] = useState(false);
  const [toggleDogDetails, setToggleDogDetails] = useState(false);
  const [toggleAddDog, setToggleAddDog] = useState(false);
  const [toggleHelpPage, setToggleHelpPage] = useState(false);

  //Dog Information State
  const [dogId, setDogId] = useState(null);
  const [dogName, setDogName] = useState(null);
  const [record, setRecord] = useState(null);
  const [dogBreed, setDogBreed] = useState(null);
  const [dogBirthday, setDogBirthday] = useState(null);

  //Loading/Deleting toggles to make transitions on loading dashboard and
  //deleting records smoother
  const [loading, setLoading] = useState(true);
  const [deletingRecords, setDeletingRecords] = useState(false);

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

  //'Fake Loading' avoids jarring transition on log
  useEffect(() => {
    if (loading)
      setTimeout(() => {
        setLoading(false);
      }, 2000);
  }, [loading]);

  //Trigger to make sure that everything rerenders when details are updated
  useEffect(() => {
    if (detailsUpdated) setDetailsUpdated(false);
  }, [detailsUpdated]);

  //Makes sure that a user isn't directed to the dog selection component
  //when there is only one dog for that user
  useEffect(() => {
    if (props.userData.dogs.length === 1 && props.dogList[0]) {
      setDogId(props.userData.dogs[0]);
      let dog = props.dogList[0];
      setDogBirthday(dog.dogBirthday);
      setDogBreed(dog.dogBreed);
      setRecord(dog.record);
      setDogName(dog.dogName);
    }
  }, [props.dogList, props.userData.dogs, deletingRecords]);

  //Closes currently open forms or displays when a user selects a new one
  useEffect(() => {
    if (toggleDetailList && !toggleDetails) setToggleDetailList(false);
    if (toggleDetails && openAddActivity) setOpenAddActivity(false);
  }, [openAddActivity, toggleDetailList, toggleDetails]);

  //Sets the selected date when a user logs in. If the user
  //is using the sample account, sets the date to 11/1/2020,
  //else sets the date to today's date. Sets current date
  //based on selected date in a readable format
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

  //Handles creating of a new dog by setting all of the dog info
  //to the newly created dog info
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

  //Sets the loading transition after deleting dog records
  const deleteTransition = () => {
    setDeletingRecords(true);
    setTimeout(() => {
      setDeletingRecords(false);
    }, 5000);
  };

  //Removes all dog information when deleting its records
  //and begins the deleteTransition timeout
  const handleDeleteDog = (dogList) => {
    props.setDogList(dogList);
    setDogName(null);
    setDogBreed(null);
    setRecord(null);
    setDogBirthday(null);
    setDogId(null);
    deleteTransition();
  };

  //Dual function - if the user has selected the day details mode,
  //will open the day details display using the recordKey and day.
  //Otherwise, it will open the add activity form and set the new
  //data in the record using the recordKey and day.
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

  //Called when submitting a new activity. Closes the add activity form. Creates
  //a new record by checking for the recordKey, then day, and either adds to the
  //appropriate key or creates one. Changes the aggregate score. Updates the record
  //in state, then updates the database.
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

  //Handles the deletion of an activity by removing the activity from the
  //appropriate spot using recordKey and day, changes the aggregate score,
  //then updates the record state and triggers the details updated, then
  //updates the database.
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

  //Loads the Loading Display after deleting records
  if (deletingRecords)
    return (
      <>
        <h2>Deleting Records</h2>
        <LoadingDisplay />
      </>
    );
  //Loads the Loading Display when logging in or returning to the site
  else if (loading)
    return (
      <>
        <h2>Fetching Dogs</h2>
        <LoadingDisplay />
      </>
    );
  //Loads the add dog form when the user first registers or has no dogs
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
  //Checks for all information required for the Calendar component, then loads the dashboard
  //with conditional checks for various forms based on the user pressing buttons in the sidebar
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
  //Loads the DogSelection component when the user logs in and has more than one dog
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
