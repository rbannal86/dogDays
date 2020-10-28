import React, { useEffect, useRef, useState } from "react";

import "./LoadingDisplay.css";

export default function LoadingDisplay() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let finished = false;
    const renderLoadingDisplay = () => {
      setTimeout(() => {
        if (!finished && step < 9) setStep(step + 1);
        else if (!finished && step >= 9) setStep(0);
      }, 100);
    };

    renderLoadingDisplay();
    return () => {
      finished = true;
    };
  });

  return (
    <div className={"loading_display_main"}>
      {step >= 0 ? (
        <div className={"loading_display_box zero"} />
      ) : (
        <div className={"loading_display_box empty"} />
      )}
      {step >= 1 ? (
        <div className={"loading_display_box one"} />
      ) : (
        <div className={"loading_display_box empty"} />
      )}
      {step >= 2 ? (
        <div className={"loading_display_box two"} />
      ) : (
        <div className={"loading_display_box empty"} />
      )}
      {step >= 3 ? (
        <div className={"loading_display_box three"} />
      ) : (
        <div className={"loading_display_box empty"} />
      )}
      {step >= 4 ? (
        <div className={"loading_display_box four"} />
      ) : (
        <div className={"loading_display_box empty"} />
      )}
      {step >= 5 ? (
        <div className={"loading_display_box five"} />
      ) : (
        <div className={"loading_display_box empty"} />
      )}
      {step >= 6 ? (
        <div className={"loading_display_box six"} />
      ) : (
        <div className={"loading_display_box empty"} />
      )}
      {step >= 7 ? (
        <div className={"loading_display_box seven"} />
      ) : (
        <div className={"loading_display_box empty"} />
      )}
      {step >= 8 ? (
        <div className={"loading_display_box eight"} />
      ) : (
        <div className={"loading_display_box empty"} />
      )}
      {step >= 9 ? (
        <div className={"loading_display_box nine"} />
      ) : (
        <div className={"loading_display_box empty"} />
      )}
    </div>
  );
}
