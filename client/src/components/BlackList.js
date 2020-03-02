import BlackListstyle from "../styles/Blacklist.style"
import talkToApi from "../utils/talkToApi"
import React from "react";
import {Redirect} from "react-router-dom";

function BlackList(props) {
  const [data, setData] = React.useState([]);
  const [redirect, setRedirect] = React.useState(false)

  React.useEffect(() => {
    talkToApi(`/users?_id=${sessionStorage.userId}&_pseudo=${props.match.params.pseudo}`).then(result => {
      if (result.status !== 200) {
        sessionStorage.clear();
        return setRedirect(true);
      }
    })
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

  if (redirect) return <Redirect from={props.location.path} to="/"/>

  return (
    <BlackListstyle className="container my--blacklist">
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
    </BlackListstyle>
  )
}

export default BlackList