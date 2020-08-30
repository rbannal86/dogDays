import React, { useState, useEffect } from "react";
import FSServices from "../../Services/FSServices";

export default function UserSidebar(props) {
  const [dogArray, setDogArray] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const createDogArray = async () => {
      let newDogArray = [];
      try {
        return await FSServices.getDog(props.userDogs, props.userId).then(
          (snapshot) => {
            snapshot.forEach((doc) => {
              newDogArray.push(doc.data());
            });
            newDogArray.sort((a, b) => {
              let nameA = a.dogName.toUpperCase();
              let nameB = b.dogName.toUpperCase();
              if (nameA < nameB) return -1;
              if (nameA > nameB) return 1;
              return 0;
            });
            return newDogArray;
          }
        );
      } catch (error) {
        console.log(error);
      }
    };

    createDogArray().then((res) => {
      setDogArray(res);
      setLoaded(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dogArray.length > 0) {
      console.log("setting focus dog");
      console.log(dogArray[0]);
      props.setFocusDog(dogArray[0]);
    }
  }, [dogArray, props]);

  const renderDogs = () => {
    console.log("rendering dogs");
    return dogArray.map((dog, index) => {
      return (
        <li
          key={index}
          onClick={(e) => {
            e.preventDefault();
            props.setFocusDog(dog);
          }}
        >
          {dog.dogName}
        </li>
      );
    });
  };
  if (loaded)
    return (
      <div className={"usersidebar_main"}>
        {dogArray ? <ul>{renderDogs()}</ul> : <h2>No Dogs Registered</h2>}
        <button onClick={() => props.setShowDogRegister(true)}>
          Add a Dog
        </button>
      </div>
    );
  else return <h2>Loading...</h2>;
}
