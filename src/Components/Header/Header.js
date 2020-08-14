import React from "react";

export default function Header(props) {
  return (
    <div className="header_div">
      {props.userName !== "" ? <h3>Welcome, {props.userName}</h3> : <></>}
      {!props.userName ? (
        <>
          <button onClick={() => props.setDisplay("register")}>Register</button>
          <button onClick={() => props.setDisplay("login")}>Log In</button>
        </>
      ) : null}
      {props.userName ? (
        <button onClick={() => props.setUserId("")}>Log Out</button>
      ) : null}
    </div>
  );
}
