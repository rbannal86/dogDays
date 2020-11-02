import React from "react";

import "./DogSelection.css";

export default function DogSelection(props) {
  //Shows a list of all of the dogs, rendered from dogList prop. Sets state
  //in Dashboard when a dog is selected.
  const renderDogList = () => {
    return (
      <ul className={"dog_selection_list"}>
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
              <button className={"dog_selection_list_button"}>
                {dog.dogName}
              </button>
            </li>
          );
        })}
      </ul>
    );
  };
  //Checks if dogList exists. If not, show "Loading Dogs". Probably won't happen.
  if (props.dogList)
    return (
      <div className={"dog_selection_main"}>
        <h2 className={"dog_selection_title"}>Select Your Dog</h2>
        {renderDogList()}
      </div>
    );
  else return <h3>Loading Dogs</h3>;
}
