import SpaceLogstyle from "../styles/SpaceLog.style"
import talkToApi from "../utils/talkToApi"
import React from "react";
import { Link, Redirect } from "react-router-dom";

export default function SpaceLog(props) {
  const input = React.useRef(null);
  const inputPassword = React.useRef(null);
  const [state, setState] = React.useState({
    serverMessage: "",
    redirect: false,
    urlToRedirect: ""
  });

  const checkUser = e => {
    e.preventDefault();
    const newState = { ...state };

    if (input.current.value.length === 0 || inputPassword.current.value.length === 0) {
      newState.serverMessage = "You must fill all fields.";

      return setState(newState);
    }

    if (props.location.pathname === "/inscription") {
      talkToApi('/users', "post", {
        body: {
          pseudo: input.current.value,
          pswd: inputPassword.current.value
        }
      }).then(result => {
        const newState = { ...state };

        if (result.status === 201) {
          sessionStorage.setItem("userId", result.userId);

          newState.redirect = true;
          newState.urlToRedirect = result.url;

          return setState(newState);
        }

        newState.serverMessage = result.message;
        return setState(newState);
      })
    } else {
      talkToApi(`/users?_id=${input.current.value}&_pseudo=${inputPassword.current.value}`).then(result => {
        console.log(result)
      })
    }
  }

  if (state.redirect) return <Redirect from={props.location.pathname}  to={state.urlToRedirect}/>;

  return (
    <SpaceLogstyle className="container form--connection" onSubmit={checkUser}>
      <div className="form--connection--mail">
        <label htmlFor="pseudo">Pseudo:</label>
        <input type="text" id="pseudo" placeholder="heuss-l'enfoire" ref={input} />
        <label htmlFor="pass">Password (6 characters minimum):</label>
        <input type="password" id="pass" name="password" minLength="6" ref={inputPassword} />
        {
          state.serverMessage.length !== 0 && <small className="text-danger" style={{ fontSize: "70%" }}>{state.serverMessage}</small>
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
    </SpaceLogstyle>
  )
}