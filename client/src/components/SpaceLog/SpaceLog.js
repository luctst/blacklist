import React from "react";
import SpaceLogStyled from "./SpaceLogStyled.style";
import { Link } from "react-router-dom";

function SpaceLog(props) {
  const input = React.useRef(null);
  const [state, setState] = React.useState({
    url: process.env.NODE_ENV === "development" ? process.env.REACT_APP_APIURLDEV : "",
    serverMessage: ""
  });

  const createUser = e => {
    e.preventDefault();
    const newState = {...state};

    if (input.current.value.length === 0) {
      newState.serverMessage = "You must enter a pseudo.";

      return setState(newState);
    }

    fetch(`${state.url}/users`, {
      method: "post",
      body: JSON.stringify({pseudo: input.current.value})
    })
    .then(res => res.json())
    .then(data => {
      const newState = {...state};

      if (data.status !== 200) {
        newState.serverMessage = data.message;

        return setState(newState);
      }

      newState.serverMessage = data.message;
      return setState(newState);
    })
  }

  return (
    <React.Fragment>
      <SpaceLogStyled className="container form--connection" onSubmit={createUser}>
        <div className="form--connection--mail">
          <label htmlFor="pseudo">Pseudo:</label>
          <input type="text" id="pseudo" placeholder="heuss-l'enfoire" ref={input}/>
          {
            state.serverMessage.length !== 0 && <small className="text-danger" style={{fontSize: "70%", marginTop: "3%"}}>{state.serverMessage}</small>
          }
        </div>
        <div className="form--connection--button">
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