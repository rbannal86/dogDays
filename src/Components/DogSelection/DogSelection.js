import React from "react";

export default function DogSelection(props) {
  const renderDogList = () => {
    return (
      <ul>
        {props.dogList.map((dog, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                props.setDogId(dog.id);
                props.setRecord(dog.record);
                props.setDogName(dog.dogName);
                props.setDogBirthday(dog.dogBirthday);
                props.setDogBreed(dog.dogBreed);
              }}
            >
              {dog.dogName}
            </li>
          );
        })}
      </ul>
    );
  };
  if (props.dogList)
    return <div className={"dog_selection_main"}>{renderDogList()}</div>;
  else return <h3>Loading Dogs</h3>;
}
