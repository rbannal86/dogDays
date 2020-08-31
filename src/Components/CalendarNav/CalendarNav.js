import React from "react";

export default function CalendarNav(props) {
  const handleMoveClick = (e) => {
    if (props.view === "week") {
      if (e.target.value === "back")
        props.setSelectedDate(
          new Date(props.selectedDate.setDate(props.selectedDate.getDate() - 7))
        );
      else
        props.setSelectedDate(
          new Date(props.selectedDate.setDate(props.selectedDate.getDate() + 7))
        );
    }
    if (props.view === "month") {
      if (e.target.value === "back") {
        let day = props.selectedDate.getDate();
        let year = props.selectedDate.getFullYear();
        let month = props.selectedDate.getMonth() - 1;
        props.setSelectedDate(new Date(year, month, day));
      } else {
        let day = props.selectedDate.getDate();
        let year = props.selectedDate.getFullYear();
        let month = props.selectedDate.getMonth() + 1;
        props.setSelectedDate(new Date(year, month, day));
      }
    }
  };

  return (
    <div>
      <button value={"back"} onClick={(e) => handleMoveClick(e)}>
        {"<"}
      </button>
      <button value={"forward"} onClick={(e) => handleMoveClick(e)}>
        {">"}
      </button>
    </div>
  );
}
