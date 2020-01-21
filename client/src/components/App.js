import React from 'react';
import Title from './Header/Title';
import SpaceLog from "../components/SpaceLog/SpaceLog";
import {
  Route,
  BrowserRouter
} from "react-router-dom";
import BlackList from './BlackList/BlackList';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Title />
        <div className="container" style={{display: "flex", justifyContent: "center"}}>
          <Route exact path="/" component={SpaceLog} />
          <Route exact path="/inscription" component={SpaceLog} />
        </div>
        <Route exact path="/blacklist" component={BlackList} />
      </div>
    </BrowserRouter>
  );
}

export default App;
