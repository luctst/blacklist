import React from 'react';
import Header from './Header';
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
      <Header />
      <Switch>
        <Route exact path={["/", "/inscription"]} component={SpaceLog} />
        <Route exact path="/bl/:pseudo" render={() => {
          if (sessionStorage.getItem("userId")) return <BlackList />
          return <Redirect to="/"/>
        }} />
        <Route path="*" component={NotFound}/>
      </Switch>
    </BrowserRouter>
  );
}