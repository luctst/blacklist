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
      <Title />
      <Route exact path={["/", "/inscription"]} component={SpaceLog} />
      <Route exact path="/blacklist" component={BlackList} />
    </BrowserRouter>
  );
}

export default App;
