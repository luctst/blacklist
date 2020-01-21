import React from "react";
import BlackListStyled from "./BlackListStyled.style";

function BlackList() {
  return(
    <BlackListStyled className="container my--blacklist mt-3">
      <div className="my--blacklist--form--name form-group">
        {/* <label htmlFor="inputName">The secret identity:</label> */}
        <input type="text" id="inputName" className="form-control" placeholder="The secret identity" />
        {/* <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg"></input> */}
        <button className="btn btn-primary">Blacklisted</button>
      </div>
      <li>Cloé</li>
      <li>Amélie</li>
      <li>Jennifer</li>
      <li>Ophélie</li>
      <li>Fiona</li>
      <li>Dyson</li>
    </BlackListStyled>
  )
}

export default BlackList