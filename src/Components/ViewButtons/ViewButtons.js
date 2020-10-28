import React, { useState, useEffect } from "react";
import ViewWeekIcon from "@material-ui/icons/ViewWeek";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ViewComfyIcon from "@material-ui/icons/ViewComfy";
import Tooltip from "@material-ui/core/Tooltip";

import "./ViewButtons.css";

export default function ViewButtons(props) {
  const [weekView, setWeekView] = useState("");
  const [monthView, setMonthView] = useState("");
  const [yearView, setYearView] = useState("");

  useEffect(() => {
    props.view === "week" ? setWeekView("active") : setWeekView("");
    props.view === "month" ? setMonthView("active") : setMonthView("");
    props.view === "year" ? setYearView("active") : setYearView("");
  }, [props.view]);

  return (
    <div className="viewbuttons_main">
      <Tooltip title={"Week"} placement={"top"}>
        <button
          className={"viewbuttons_button " + weekView}
          onClick={() => props.setView("week")}
        >
          <ViewWeekIcon />
        </button>
      </Tooltip>
      <Tooltip title={"Month"} placement={"top"}>
        <button
          className={"viewbuttons_button " + monthView}
          onClick={() => props.setView("month")}
        >
          <ViewModuleIcon />
        </button>
      </Tooltip>
      <Tooltip title={"year"} placement={"top"}>
        <button
          className={"viewbuttons_button " + yearView}
          onClick={() => props.setView("year")}
        >
          <ViewComfyIcon />
        </button>
      </Tooltip>
    </div>
  );
}
