import React, { useState, useRef } from "react";
import BlackListStyled from "./BlackListStyled.style";

function BlackList() {
  const inputNameValue = useRef(null);
  const [data, setData] = useState(["Cloé", "Amélie", "Jennifer", "Ophélie", "Fiona", "Dyson"]);

  function addName(e) {
    const newState = [...data];
    if (e.keyCode === 13) {
      newState.push(inputNameValue.current.value);
      setData(newState);
    }
  }

  return (
    <BlackListStyled className="container my--blacklist">
      <ul>
        {
          data.map((name, index) => {
            return (
              <li key={index}>{name}</li>
            )
          })
        }
      </ul>
      <div className="my--blacklist--form--name">
        <input type="text" id="inputName" placeholder="+ New" ref={inputNameValue} onKeyDown={addName} />
      </div>
    </BlackListStyled>
  )
}

export default BlackList