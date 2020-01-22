import React from "react";
import SpaceLogStyled from "./SpaceLogStyled.style";
import { Link } from "react-router-dom";

function SpaceLog(props) {

  return (
    <React.Fragment>
      <SpaceLogStyled className="container form--connection">
        <div className="form--connection--mail form-group">
          <label htmlFor="mail">Mail:</label>
          <input type="email" id="mail" className="form-control" placeholder="name@example.com" required />
        </div>
        <div className="form--connection--password form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" className="form-control" name="password" required />
        </div>
        <div className="'form--connection--button form-group">
          <input type="submit" value="Submit"></input>
        </div>
        <div className="redirection--link">
          {
            props.location.pathname === "/" ?
              <p>
                Need an account ? Dont' worry and <Link to="/inscription"> create your account </Link>
              </p> :
              <p>
                Already have an account ? Don't worry and <Link to="/"> access to your Blacklist.. </Link>
              </p>
          }
        </div>
      </SpaceLogStyled>
    </React.Fragment>
  )
}

export default SpaceLog