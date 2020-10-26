import React, { useState } from "react";
import FSServices from "../../Services/FSServices";
import DogForm from "../Forms/DogForm";

export default function UserLogin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const submitLogin = async (e) => {
    e.preventDefault();
    const login = await FSServices.signInUser(email, password);
    if (login.message) setError(login.message);
    else {
      let userData = await FSServices.fetchUserRecords(login);
      props.setUserId(userData.id);
      props.setView(null);
    }
  };

  return (
    <div>
      <h2>Log In</h2>
      <form
        onSubmit={(e) => submitLogin(e)}
        onChange={() => {
          if (error) setError(null);
        }}
      >
        <DogForm
          class={"login_email"}
          handleChange={setEmail}
          label={"Email: "}
          type={"email"}
          placeholder={"dog.person@woof.com"}
          value={email}
        />
        <DogForm
          class={"login_password"}
          handleChange={setPassword}
          label={"Password: "}
          type={"password"}
          placeholder={"password"}
          value={password}
        />
        <button>Log In</button>
        {error ? <h3>{error}</h3> : <></>}
      </form>
      <button onClick={() => props.setDisplay(null)}>Cancel</button>
    </div>
  );
}
