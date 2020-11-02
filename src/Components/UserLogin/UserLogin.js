import React, { useState, useEffect } from "react";
import FSServices from "../../Services/FSServices";
import DogForm from "../Forms/DogForm";

import "./UserLogin.css";

export default function UserLogin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    document.getElementById("login_email").focus();
    document
      .getElementById("user_login_main_id")
      .scrollIntoView({ behavior: "smooth" });
  }, []);

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
    <div className={"user_login_main"} id={"user_login_main_id"}>
      <h2 className={"user_login_title"}>Log In</h2>
      <form
        onSubmit={(e) => submitLogin(e)}
        onChange={() => {
          if (error) setError(null);
        }}
      >
        <DogForm
          class={"login_email"}
          handleChange={setEmail}
          label={"Email"}
          type={"email"}
          placeholder={"dog.person@woof.com"}
          value={email}
        />
        <DogForm
          class={"login_password"}
          handleChange={setPassword}
          label={"Password"}
          type={"password"}
          placeholder={"password"}
          value={password}
        />
        <button className={"user_login_button"}>Log In</button>
        <button
          className={"user_login_button"}
          onClick={(e) => {
            e.preventDefault();
            props.setView(null);
          }}
        >
          Cancel
        </button>
        {error ? <div className={"login_error"}>{error}</div> : <></>}
      </form>
    </div>
  );
}
