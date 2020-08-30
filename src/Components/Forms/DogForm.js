import React from "react";

export default function DogForm(props) {
  return (
    <div>
      <label htmlFor={props.class}>{props.label}</label>
      <input
        id={props.class}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.handleChange(e.target.value)}
        min={props.min || null}
        max={props.max || null}
      />
    </div>
  );
}
