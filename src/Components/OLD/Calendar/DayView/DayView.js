import React from "react";

export default function DayView(props) {
  const renderActivities = () => {
    if (!props.dayRecords) return <li>No Activities Registered</li>;
    else {
      return props.dayRecords.activities.map((activity, index) => {
        return (
          <li key={index}>
            {activity.type}: {activity.score}
          </li>
        );
      });
    }
  };

  return (
    <div className={"dayview"}>
      <ul>{renderActivities()}</ul>
      <button onClick={() => props.setShowActivityRegister(true)}>
        Add Activity
      </button>
    </div>
  );
}
