import React from "react";

export default function DetailList(props) {
  const renderDetails = () => {
    if (props.details === "empty") return <div>Nothing Recorded</div>;
    else {
      return (
        <ul>
          {props.details.map((detail, index) => {
            return (
              <li key={"detail" + index}>
                {Object.keys(detail)}: {detail[Object.keys(detail)[0]]}
                <button onClick={() => props.handleActivityDelete(index)}>
                  x
                </button>
              </li>
            );
          })}
        </ul>
      );
    }
  };

  return <div className={"detail_list_main"}>{renderDetails()}</div>;
}
