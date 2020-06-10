import React from 'react'
import { Jumbotron, Row, Col } from 'react-bootstrap'

export default function About(props){
    return(
        <div>
            <Jumbotron>

            </Jumbotron>
            <Row>
                <Col>
                    <h2>
                        about the app
                    </h2>
                </Col>
                <Col>
                    <h2>About me</h2>
                </Col>
                <Col>
                    <h2>Other projects</h2>
                </Col>
            </Row>
        </div>
    )
}