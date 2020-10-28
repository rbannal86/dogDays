import React, { useState, useEffect } from "react";
import MoodIcon from "@material-ui/icons/Mood";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";

import "./AddActivity.css";

export default function AddActivity(props) {
  const [step, setStep] = useState("first");
  const [value, setValue] = useState(null);
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const submitActivity = () => {
      props.handleAddActivitySubmit(activity, parseInt(value));
    };
    if (value || value?.toString() === "0") submitActivity();
  }, [activity, props, value]);

  const handleSetValue = (value) => {
    setValue(value);
  };

  const handleSetActivity = (type) => {
    setActivity(type);
    setStep("second");
  };

  return (
    <div className={"add_activity_main"}>
      {step === "first" ? (
        <h2 className={"add_activity_title"}>What Did You Do?</h2>
      ) : (
        <h2 className={"add_activity_title"}>How Did It Go?</h2>
      )}
      {step === "second" ? (
        <div className={"add_activity_buttons"}>
          <button
            className={"add_activity_button"}
            id={"add_activity_button_low"}
            onClick={() => handleSetValue(0)}
          >
            <MoodBadIcon fontSize={"inherit"} />
          </button>
          <button
            className={"add_activity_button"}
            id={"add_activity_button_medium"}
            onClick={() => handleSetValue(5)}
          >
            <SentimentSatisfiedIcon fontSize={"inherit"} />
          </button>
          <button
            className={"add_activity_button"}
            id={"add_activity_button_high"}
            onClick={() => handleSetValue(10)}
          >
            <MoodIcon fontSize={"inherit"} />
          </button>
        </div>
      ) : null}
      {step === "first" ? (
        <div className={"add_activity_buttons"}>
          <div className={"add_activity_buttons_section"}>
            <button
              value={"Walk"}
              className={"add_activity_activity_button"}
              onClick={(e) => handleSetActivity(e.target.value)}
            >
              Walk
            </button>
            <button
              value={"Training"}
              className={"add_activity_activity_button"}
              onClick={(e) => handleSetActivity(e.target.value)}
            >
              Training
            </button>
          </div>
          <div className={"add_activity_buttons_section"}>
            <button
              value={"Play"}
              className={"add_activity_activity_button"}
              onClick={(e) => handleSetActivity(e.target.value)}
            >
              Play
            </button>
            <button
              value={"Other"}
              className={"add_activity_activity_button"}
              onClick={(e) => handleSetActivity(e.target.value)}
            >
              Other
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
