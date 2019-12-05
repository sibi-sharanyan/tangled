import React from "react";



export default function Button(props) {
  return <div>
      <button className = "button" onClick = { props.pressed}>Submit</button>
  </div>;
}
