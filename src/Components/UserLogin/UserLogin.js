import React, { useState } from "react";
import FSServices from "../../Services/FSServices";

export default function UserLogin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitLogin = async (e) => {
    e.preventDefault();
    const login = await FSServices.signInUser(email, password);
    if (login.message) setError(login.message);
    else {
      let userData = await FSServices.fetchUserDate(login);
      props.setUserId(userData);
      props.setDisplay(null);
    }
  };
}
