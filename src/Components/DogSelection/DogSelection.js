import React, { useEffect, useState } from "react";
import FSServices from "../../Services/FSServices";

export default function DogSelection(props) {
  const renderDogList = () => {
    return (
      <ul>
        {props.dogList.map((dog, index) => {
          return <li key={index}>{dog.dogName}</li>;
        })}
      </ul>
    );
  };
  if (props.dogList)
    return <div className={"dog_selection_main"}>{renderDogList()}</div>;
  else return <h3>Loading Dogs</h3>;
}
