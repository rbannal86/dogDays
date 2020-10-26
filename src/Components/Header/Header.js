import React from "react";

export default function Header(props) {
  return (
    <div className={"header_main"}>
      <h1>dogDays</h1>
      {props.userId ? (
        <button onClick={() => props.handleLogOut()}>Log Out</button>
      ) : (
        <>
          <button onClick={() => props.setView("login")}>Log In</button>
          <button onClick={() => props.setView("register")}>Register</button>
        </>
      )}
    </div>
  );
}
