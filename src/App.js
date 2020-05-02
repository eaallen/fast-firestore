import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {withFirebase} from './comps/Firebase'
import FastFirestore from './comps/Views/FastFirestore';
function App(props) {
  return (
    <div className="App">
      <div className='btn btn-primary'>
        hello
      </div>
      <FastFirestore/>
    </div>
  );
}

export default withFirebase(App);
