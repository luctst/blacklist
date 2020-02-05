import React from 'react';
import Header from './Header';
import SpaceLog from "./SpaceLog";
import {
  Route,
  BrowserRouter
} from "react-router-dom";
import BlackList from './BlackList';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Route exact path={["/", "/inscription"]} component={SpaceLog} />
      <Route exact path="/blacklist" component={BlackList} />
    </BrowserRouter>
  );
}