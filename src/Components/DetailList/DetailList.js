import React, { useState, useEffect } from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import "./DetailList.css";
import { act } from "@testing-library/react";

export default function DetailList(props) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (props.recordKey) {
      let month = props.recordKey.slice(0, 2);
      if (month[0] === "0") month = month.slice(0);
      let year = props.recordKey.slice(2);
      let newFormattedDate = month + "/" + props.day + "/" + year;
      setFormattedDate(newFormattedDate);
    }
  }, [props.day, props.recordKey]);

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
