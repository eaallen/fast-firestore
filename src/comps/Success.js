import React from 'react'
import {Row,Col} from 'react-bootstrap'
export default function Success(){
    return(
        <div>
            <h1>Thanks for starting the conversation</h1>
            <Row>
                <Col>
                    <i className="far fa-envelope"></i>
                    <p className="text-left">
                        Check your email. You should have received a response from me letting you know I received your message.
                    </p>
                </Col>
                <Col>
                    <i className="fas fa-user-shield"></i>
                    <p className="text-left">
                        I will reach out to you so we can discuss the possibility of becoming a contributor. 
                    </p>
                </Col>
                <Col>
                    <i className="fab fa-github"></i>
                    <p className="text-left">
                        Once I have given you the proper permissions go to GitHub and clone the Fast Firestore repository.  
                    </p>
                </Col>
            </Row>
        </div>
    )
}