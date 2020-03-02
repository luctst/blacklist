import React from 'react';
import Headerstyle from "../styles/Header.style"
import SpaceLog from "./SpaceLog";
import {
  Route,
  BrowserRouter,
  Redirect,
  Switch
} from "react-router-dom";
import BlackList from './BlackList';
import NotFound from "./NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Headerstyle>
        <h1 className="header--title">BlackList</h1>
      </Headerstyle>
      <Switch>
        <Route exact path={["/", "/inscription"]} component={SpaceLog} />
        <Route exact path="/bl/:pseudo" render={routeProps => {
          if (sessionStorage.getItem("userId")) return <BlackList {...routeProps}/>
          return <Redirect to="/"/>
        }} />
        <Route path="*" component={NotFound}/>
      </Switch>
    </BrowserRouter>
  );
}