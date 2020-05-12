import React from 'react'
import {Row, Col} from 'react-bootstrap'
import FastFirestore from '../Firestore/FastFirestore'
import ShowData from '../ShowData'
import CsvUpload from '../Firestore/CsvUpload'
export default function Home(props){
    return(
        <div>
            <div className="bg">

                <h1 className="text-light greeting">
                    Build your Firestore <br/>Database in Minutes.
                </h1>
                
            </div>
            <Row noGutters>
                <Col sm={3} className="pl-4 pr-4">
                    <FastFirestore/>
                </Col>
                <Col sm={9}>
                    <ShowData/>
                </Col>
            </Row>
            <Row noGutters>
                <Col sm={3} className="pl-4 pr-4">
                    <CsvUpload/>
                </Col>
                <Col sm={9}>
                    <ShowData/>
                </Col>
            </Row>
        </div>
    )
}