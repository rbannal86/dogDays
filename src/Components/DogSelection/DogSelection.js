import React, { useEffect } from "react";
import FSServices from "../../Services/FSServices";

export default function DogSelection(props) {
  const fetchDogNames = async () => {
    return (
      <ul>
        {
          await props.dogList.map((dogId, index) => {
            return (
              <li key={index}>
                {FSServices.fetchDogRecords(dogId).then((res) => {
                  console.log(res);
                  return res.dogName;
                })}
              </li>
            );
          })
        }
      </ul>
    );
  };

  return <div className={"dog_selection_main"}>{fetchDogNames()}</div>;
}
