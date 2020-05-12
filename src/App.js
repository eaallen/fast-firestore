import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {withFirebase} from './comps/Firebase'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './comps/Views/Home/Home';

function App(props) {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default withFirebase(App);
