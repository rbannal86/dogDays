import React, { useState, useEffect } from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import "./DetailList.css";

export default function DetailList(props) {
  //Readable date
  const [formattedDate, setFormattedDate] = useState("");

  //Checks the recordKey and breaks it into the readable date for display
  useEffect(() => {
    if (props.recordKey) {
      let month = props.recordKey.slice(0, 2);
      if (month[0] === "0") month = month.slice(0);
      let year = props.recordKey.slice(2);
      let newFormattedDate = month + "/" + props.day + "/" + year;
      setFormattedDate(newFormattedDate);
    }
  }, [props.day, props.recordKey]);

  //Renders the activity list. If there are no activities for a day, displays Nothing Recorded.
  //Checks activity 'level' and sets a class tag that determines background color. Activity
  //Delete button calls function from dashboard that removes the activity from the record.
  const renderDetails = () => {
    if (props.details === "empty") return <div>Nothing Recorded</div>;
    else {
      return (
        <ul className={"detail_list"}>
          {props.details.map((detail, index) => {
            let activityLevel;
            let activityValue = detail[Object.keys(detail)[0]];
            if (activityValue === 10) activityLevel = "ten";
            else if (activityValue === 5) activityLevel = "five";
            else if (activityValue.toString() === "0") activityLevel = "zero";
            return (
              <li
                key={"detail" + index}
                className={"detail_list_item " + activityLevel}
              >
                {Object.keys(detail)}
                <button
                  className={"detail_list_item_button"}
                  onClick={() => props.handleActivityDelete(index)}
                >
                  <HighlightOffIcon fontSize={"inherit"} />
                </button>
              </li>
            );
          })}
        </ul>
      );
    }
  };

  return (
    <div className={"detail_list_main"}>
      <h3 className={"detail_list_title"}>Activities for {formattedDate}</h3>
      {renderDetails()}
    </div>
  );
}
