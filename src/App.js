import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {withFirebase} from './comps/Firebase'
import FastFirestore from './comps/Views/Firestore/FastFirestore';
import { Row,Col } from 'react-bootstrap';
import ShowData from './comps/Views/ShowData';
function App(props) {
  return (
    <div className="App">
      <div className='btn btn-primary'>
        hello
      </div>
      <Row noGutters>
        <Col sm={3}>
          <FastFirestore/>
        </Col>
        <Col sm={9}>
          <ShowData/>
        </Col>
      </Row>
    </div>
  );
}

export default withFirebase(App);
