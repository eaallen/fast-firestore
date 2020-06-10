import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import '@fortawesome/fontawesome-free'
import {withFirebase} from './comps/Firebase'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './comps/Views/Home/Home';
import Top from './comps/Views/Top';
import About from './comps/Views/About'
import {Container} from 'react-bootstrap'
function App(props) {
  return (
    <div className="App">
      <Router>
        <Container>
          <Top/>
            <Switch>
              <Route path="/About">
                <About/>
              </Route>
              <Route path="/">
                <Home/>
              </Route>
            </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default withFirebase(App);
