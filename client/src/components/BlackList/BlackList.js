import React, {useState, useRef} from "react";
import BlackListStyled from "./BlackListStyled.style";

function BlackList() {
  const inputNameValue = useRef(null);
  const [data, setData] = useState(["Cloé", "Amélie", "Jennifer", "Ophélie", "Fiona", "Dyson"])

  function addName(e) {
    const newState = {...data}
    if (e.keyCode === 13) {
      newState.name = inputNameValue.current.value;
      setData(newState)
    }
  }

  return(
    <BlackListStyled className="container my--blacklist">
      {
        data.map(name => {
          return(
            <ul>
              <li>{name}</li>
            </ul>
          )
        })
      }
      <div className="my--blacklist--form--name form-group">
        <input type="text" id="inputName" className="form-control" placeholder="+ The secret identity" ref={inputNameValue} onKeyDown={addName} />
      </div>
    </BlackListStyled>
  )
}

export default BlackList