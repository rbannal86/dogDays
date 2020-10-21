import React, { useState, useEffect } from "react";

export default function AddActivity(props) {
  const [step, setStep] = useState("first");
  const [value, setValue] = useState(null);
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const submitActivity = () => {
      props.handleAddActivitySubmit(activity, value);
    };
    if (activity) submitActivity(activity, value);
  }, [activity, props, value]);

  const handleSetValue = (value) => {
    setValue(value);
    setStep("second");
  };

  const handleSetActivity = (type) => {
    setActivity(type);
  };

  return (
    <div className={"add_activity_main"}>
      {step === "first" ? (
        <div>
          <button value={0} onClick={(e) => handleSetValue(e.target.value)}>
            {":("}
          </button>
          <button value={5} onClick={(e) => handleSetValue(e.target.value)}>
            {":|"}
          </button>
          <button value={10} onClick={(e) => handleSetValue(e.target.value)}>
            {":)"}
          </button>
        </div>
      ) : null}
      {step === "second" ? (
        <div>
          <button
            value={"Walk"}
            onClick={(e) => handleSetActivity(e.target.value)}
          >
            Walk
          </button>
          <button
            value={"Training"}
            onClick={(e) => handleSetActivity(e.target.value)}
          >
            Training
          </button>
          <button
            value={"Play"}
            onClick={(e) => handleSetActivity(e.target.value)}
          >
            Play
          </button>
          <button
            value={"Other"}
            onClick={(e) => handleSetActivity(e.target.value)}
          >
            Other
          </button>
        </div>
      ) : null}
    </div>
  );
}
