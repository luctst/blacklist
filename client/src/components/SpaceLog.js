import styled from "styled-components";
import React from "react";
import { Link, Redirect } from "react-router-dom";

const SpaceLogStyled = styled.form`
  font-family: Roboto;
  margin-top: 8%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .form--connection--mail {
    display: flex;
    flex-direction: column;
  }
  .form--connection--button {
    input {
      margin-bottom: 10px;
    }
  }
  label {
    font-family: Gelasio;
    font-weight: bold;
  }
  input {
    background: #f5f6f7;
    padding: 9px 15px;
    border-radius: 6px;
    border: none;
    margin-bottom: 30px;
  }
`

export default function SpaceLog(props) {
  const url = process.env.NODE_ENV === "development" ? process.env.REACT_APP_APIURLDEV : "";
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
      fetch(`${url}/users`, {
        method: "post",
        body: JSON.stringify({ pseudo: input.current.value, pswd: inputPassword.current.value })
      })
        .then(res => res.json())
        .then(data => {
          const newState = { ...state };

          if (data.status === 201) {
            sessionStorage.setItem("userId", data.userId);

            newState.redirect = true;
            newState.urlToRedirect = data.url;

            return setState(newState);
          }

          newState.serverMessage = data.message;
          return setState(newState);
        })
    } else {
    }
  }

  if (state.redirect) return <Redirect from={props.location.pathname}  to={state.urlToRedirect}/>;

  return (
    <SpaceLogStyled className="container form--connection" onSubmit={checkUser}>
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
    </SpaceLogStyled>
  )
}