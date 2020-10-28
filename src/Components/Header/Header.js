import React from "react";
import HeaderDeco from "../HeaderDeco/HeaderDeco";

import "./Header.css";

export default function Header(props) {
  return (
    <div className={"header_main"}>
      <HeaderDeco />
      <div className={"header_content"} id={"header_content_id"}>
        <h1 className={"header_title"}>dogDays</h1>
        {props.userId ? (
          <div className={"header_button_div"}>
            <button
              className={"header_button"}
              onClick={() => props.handleLogOut()}
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className={"header_button_div"}>
            <button
              className={"header_button"}
              onClick={() => props.setView("login")}
            >
              Log In
            </button>
            <button
              className={"header_button"}
              onClick={() => props.setView("register")}
            >
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
