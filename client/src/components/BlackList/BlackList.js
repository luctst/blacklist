import React, {useState, useRef} from "react";
import BlackListStyled from "./BlackListStyled.style";

function BlackList() {
  const inputNameValue = useRef(null);
  const [data, setData] = useState({
    name: "",
    image: null
  })

  function addName(e) {
    const newState = {...data}
    if (e.keyCode === 13) {
      newState.name = inputNameValue.current.value;
      setData(newState)
    }
  }

  return(
    <BlackListStyled className="container my--blacklist">
      <div className="my--blacklist--form--name form-group">
        <input type="text" id="inputName" className="form-control" placeholder="The secret identity" ref={inputNameValue} onKeyDown={addName} />
        <label htmlFor="inputImg" className="form-control">The secret image</label>
        <input type="file" id="inputImg" accept="image/png, image/jpeg" style={{display: "none"}}></input>
      </div>
      <ul>
        <li>Cloé</li>
        <li>Amélie</li>
        <li>Jennifer</li>
        <li>Ophélie</li>
        <li>Fiona</li>
        <li>Dyson</li>
      </ul>
    </BlackListStyled>
  )
}

export default BlackList