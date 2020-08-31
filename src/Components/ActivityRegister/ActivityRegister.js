import React, { useState } from "react";
import DogForm from "../Forms/DogForm";
import FSServices from "../../Services/FSServices";

export default function ActivityRegister(props) {
  const [activityType, setActivityType] = useState("");
  const [activityRating, setActivityRating] = useState(0);
  const [activityNotes, setActivityNotes] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!activityType || !activityRating)
      setError("You must enter an activity and a rating before submitting!");
    else {
      let monthString = (props.selectedDate.getMonth() + 1).toString();
      let yearString = props.selectedDate.getFullYear().toString();
      if (monthString.length === 1) monthString = "0" + monthString;
      let documentId = monthString + yearString;
      let dayId = props.selectedDate.getDate().toString();
      let activityObject = {
        score: parseInt(activityRating),
        type: activityType,
        note: activityNotes,
      };
      await FSServices.submitActivity(
        documentId,
        dayId,
        activityObject,
        props.dogId
      ).then(() => {
        props.setShowActivityRegister(false);
      });
    }
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
