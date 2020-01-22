import React, { useState } from "react";
import BlackListStyled from "./BlackListStyled.style";

function BlackList() {
  const [data, setData] = useState(["empty"]);
  // const [data, setData] = useState(["Cloé", "Amélie", "Jennifer", "Ophélie", "Fiona", "Dyson"]);

  function addInput(e, index) {
    const newState = [...data];

    if (e.keyCode === 13) {
      newState.splice(index += 1, 0, "enter your name");
      document.activeElement.blur();
      setData(newState);
    }

  }

  return (
    <BlackListStyled className="container my--blacklist">
      {
        data.map((name, index) => {
          return (
            <div className="parent--div" key={index}>
              <div className="parent--dot">
                <span></span>
              </div>
              <div>
                <div contentEditable="true" className="content--name" onKeyDown={(e) => addInput(e, index)}>{name}</div>
              </div>
              <div className="parent--div--close">x</div>
            </div>
          )
        })
      }
    </BlackListStyled>
  )
}

export default BlackList