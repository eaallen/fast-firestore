import React from 'react'
import {Row, Col} from 'react-bootstrap'
import FastFirestore from '../Firestore/FastFirestore'
import ShowData from '../ShowData'
export default function Home(props){
    return(
        <div>
            <Row noGutters>
                <Col sm={3} className="pl-4 pr-4">
                    <FastFirestore/>
                </Col>
                <Col sm={9}>
                    <ShowData/>
                </Col>
            </Row>
        </div>
    )
}