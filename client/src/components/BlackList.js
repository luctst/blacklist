import styled from "styled-components";
import React, { useState } from "react";
import {withRouter, Redirect} from "react-router-dom";

const BlackListStyled = styled.section`
  font-family: Roboto;
  .parent--div {
    position: relative;
    display: flex;
    align-items: center;
    flex: auto;

    .parent--dot {
      margin-right: 4px;
      width: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-grow: 0;
      flex-shrink: 0;
      min-height: calc(1.5em + 3px + 3px);
      padding-right: 2px;

        span {
          width: 6px;
          height: 6px;
          border-radius: 6px;
          background: currentcolor;
          margin-top: 0.1em;
        }
      }
    .content--name:focus {
      outline: none;
    }

    .parent--div--close {
      position: absolute;
      left: -12px;
      display: none;
    }

    :hover > .parent--div--close {
      display: block;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 1366px) {
    .parent--div {
      font-size: 2em;
    }
  }
  @media screen and (min-width: 320px) and (max-width: 812px) {
    .parent--div {
      font-size: 1.6em;
      margin-left: 20px;
    }
  }
`

function BlackList(props) {
  const url = process.env.NODE_ENV === "development" ? process.env.REACT_APP_APIURLDEV : "";
  const [data, setData] = useState([]);
  const [redirect, setRedirect] = useState(false)

  React.useEffect(() => {
    fetch(`${url}/users?_id=${sessionStorage.userId}&_pseudo=${props.match.params.pseudo}`)
    .then(res => res.json())
    .then(resParsed => {
      if (resParsed.status !== 200) {
        sessionStorage.clear();

        return setRedirect(true)
      };

      return fetch(`${url}/bl`, {
        credentials: "include",
        headers: new Headers().append("Authorization", `Bearer`)
        }
      );
    });
  }, []);

  function addInput(e, index) {
    const newState = [...data];

    if (e.keyCode === 13) {
      newState.splice(index += 1, 0, "enter your name");
      document.activeElement.blur();
      setData(newState);
    }
  }

  function deleteName(index) {
    const newState = [...data];

    newState.splice(index, 1);
    setData(newState);
  }

  if (redirect.shouldRedirect) return <Redirect from={props.location.path} to="/"/>

  return (
    <BlackListStyled className="container my--blacklist">
      {
        data.length === 0 ?
          "Retrieve data.."
        :data.map((name, index) => {
          return (
            <div className="parent--div" key={index}>
              <div className="parent--dot">
                <span></span>
              </div>
              <div>
                <div contentEditable="true" className="content--name" onKeyDown={(e) => addInput(e, index)}>{name}</div>
              </div>
              <div className="parent--div--close" onClick={() => deleteName(index)}><i className="fas fa-times"></i></div>
            </div>
          )
        })
      }
    </BlackListStyled>
  )
}

export default withRouter(BlackList)