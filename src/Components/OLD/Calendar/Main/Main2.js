import React, { useState, useEffect } from "react";
import store from "../../Services/STORE";
import Calendar from "../Calendar/Calendar";

export default function Main() {
  const [records, setRecords] = useState(null);

  useEffect(() => {
    setRecords(store);
  }, []);

  return (
    <div>
      <Calendar records={records} />
    </div>
  );
}
