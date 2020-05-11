import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {withFirebase} from './comps/Firebase'
import FastFirestore from './comps/Views/Firestore/FastFirestore';
import { Row,Col } from 'react-bootstrap';
function App(props) {
  return (
    <div className="App">
      <div className='btn btn-primary'>
        hello
      </div>
      <Row noGutters>
        <Col>
        
        </Col>
        <Col>
          <FastFirestore/>
        </Col>
        <Col>
        
        </Col>
      </Row>
    </div>
  );
}

export default withFirebase(App);
