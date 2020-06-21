import React from 'react'
import {Row,Col} from 'react-bootstrap'
export default function Success(){
    return(
        <div>
            <br/>
            <br/>
            <br/>
            <br/>

            <h1>Thanks for starting the conversation</h1>
            <br/>
            <br/>
            <br/>
            <br/>
            <Row>
                <Col lg={4}>
                    <i className="far fa-envelope success-icon text-danger"></i>
                    <br/>
                    <br/>
                    <p className="text-left">
                        Check your email. You should have received a response from me letting you know I received your message.
                    </p>
                </Col>
                <Col lg={4}>
                    <i className="fas fa-user-shield success-icon text-primary"></i>
                    <br/>
                    <br/>
                    <p className="text-left">
                        I will reach out to you so we can discuss the possibility of becoming a contributor. 
                    </p>
                </Col>
                <Col lg={4}>
                    <i className="fab fa-github success-icon"></i>
                    <br/>
                    <br/>
                    <p className="text-left">
                        Once I have given you the proper permissions go to GitHub and clone the Fast Firestore repository.  
                    </p>
                </Col>
            </Row>
        </div>
    )
}