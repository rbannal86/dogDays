import React, { useState } from "react";
import FSServices from "../../Services/FSServices";

export default function UserRegister(props) {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");

  let passRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  const submitRegistration = async (e) => {
    e.preventDefault();
    if (!passRegex.test(password))
      return setError(
        "Password must be eight characters or longer and contain at least 1 lowercase, 1 uppercase, 1 numeric, and one special character."
      );
    if (password !== confirmPassword) return setError("Password don't match");
    let userId = await FSServices.registerNewUser(email, password, userName);
    console.log(userId);
    props.setUserId(userId.id);
    props.setView("adddog");
  };

  const setInputState = (e) => {
    if (error) setError("");
    switch (e.target.id) {
      case "user_email":
        setEmail(e.target.value);
        break;
      case "user_password":
        setPassword(e.target.value);
        break;
      case "user_password_comfirm":
        setConfirmPassword(e.target.value);
        break;
      case "user_name":
        setUserName(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={(e) => submitRegistration(e)}>
        <label htmlFor="user_email">Email: </label>
        <input
          id="user_email"
          type="email"
          placeholder="your.email@email.com"
          name="user_email"
          value={email}
          onChange={(e) => setInputState(e)}
          required
        />
        <label htmlFor="user_name">Username: </label>
        <input
          id="user_name"
          type="text"
          placeholder="Harry Houndman"
          value={userName}
          onChange={(e) => setInputState(e)}
          required
        />
        <label htmlFor="user_password">Password: </label>
        <input
          id="user_password"
          type="password"
          placeholder="password..."
          name="user_password"
          onChange={(e) => setInputState(e)}
          required
        />
        <input
          id="user_password_comfirm"
          type="password"
          placeholder="password..."
          name="user_password_confirm"
          onChange={(e) => setInputState(e)}
          required
        />
        <button>Register</button>
      </form>
      <button onClick={() => props.setDisplay(null)}>Cancel</button>
    </div>
  );
}
