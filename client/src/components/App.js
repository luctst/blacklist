import React from 'react';
import Title from './Header/Title';
import SpaceLog from "../components/SpaceLog/SpaceLog";
import {
  Route,
  BrowserRouter
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Title />
        <div className="container" style={{display: "flex", justifyContent: "center"}}>
          <Route exact path="/" component={SpaceLog} />
          <Route exact path="/inscription" component={SpaceLog} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
