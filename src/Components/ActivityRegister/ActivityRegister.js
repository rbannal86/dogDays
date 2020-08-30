import React, { useState } from "react";
import DogForm from "../Forms/DogForm";

export default function ActivityRegister() {
  const [activityType, setActivityType] = useState("");
  const [activityRating, setActivityRating] = useState(null);
  const [activityNotes, setActivityNotes] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!!activityType || !activityRating)
      setError("You must enter an activity and a rating before submitting!");
  };

  return (
    <div>
      {error}
      <form onSubmit={(e) => handleSubmit(e)}>
        <DogForm
          label={"What did you do with your dog?"}
          class={"activityRegister_type"}
          type={"text"}
          placeholder={"walk"}
          value={activityType}
          handleChange={setActivityType}
        />
        <DogForm
          label={"On a scale from 0 to 10, how was it?"}
          class={"activityRegister_rating"}
          type={"number"}
          placeholder={"10"}
          value={activityRating}
          handleChange={setActivityRating}
          min={"0"}
          max={"10"}
        />
        <DogForm
          label={"Is there anything else you'd like to add?"}
          class={"activityRegister_note"}
          type={"textarea"}
          placeholder={"Additional information..."}
          value={activityNotes}
          handleChange={setActivityNotes}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
