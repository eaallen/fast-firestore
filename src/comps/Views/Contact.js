import React from 'react'
import{Form, Button, Row, Col, Spinner} from 'react-bootstrap'
import axios from 'axios'
import Success from './Success'

// provide users a way to contact me plus show off some no server skills 
export default class Contact extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:"",
            subject: "",
            message: "",
            sending:false,
            email_sent:false,
        }
    }
    handle_change =(e) => {
        e.preventDefault()
        let new_state={[e.target.getAttribute('name')]: e.target.value}
        this.setState(new_state)        
    }

    handle_submit = async(e) => {
        e.preventDefault()
        this.setState({sending:true})
        // send the state to a .gs tool to send email to me
        const data =  encodeURI(JSON.stringify(this.state))
        let email = await axios({
            method:"get",
            url:`https://script.google.com/macros/s/AKfycbyKrP7sbgYNG8l9tF8I7VVi-8yXkVg-6lLju8d_eog3F7Tuix0/exec?data=${data}`
        })
        console.log(email)
        this.setState({sending:false})
        if(email.data === "success"){
            this.setState({email_sent:true})
        }
    }
    render(){
        if(this.state.email_sent){
            return(
                <Success/>
            )
        }
        return(
            <div>
                <Form onSubmit={e=> this.handle_submit(e)}>
                    <Row>
                        <Col md={3}>
                            <a href="https://github.com/eaallen">
                                <img src="/me.jpg" className="img-thumbnail rounded-circle me" title="View GitHub profile" alt="Elijah Allen"/>
                            </a>
                            <Form.Text className="text-muted">
                                Elijah Allen
                                <br/>
                                <div className="text-left">
                                    I am a Junior Developer who no longer has the time to work on this project alone. 
                                    Please, if you think Fast Firestore is a good idea and would like to see it improved, 
                                    shoot me a short email and I will be happy to make you a contributor.
                                </div>
                            </Form.Text>
                        </Col>
                        <Col>
                            <Form.Group controlId="formBasicEmail" className="text-left ">
                                <Form.Label ><strong>Your email address</strong></Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Enter email" 
                                    required
                                    name="email"
                                    onChange={e=>this.handle_change(e)} 
                                    value={this.state.email} 
                                />
                                <Form.Text className="text-muted">
                                    I will never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            
                            <Form.Group controlId="formBasicPassword" className="text-left">
                                <Form.Label><strong>Subject</strong></Form.Label>
                                <Form.Control
                                    type="text" 
                                    placeholder="Superman didn't always fly"
                                    name="subject"
                                    onChange={e=>this.handle_change(e)} 
                                    value={this.state.subject} 
                                />
                            </Form.Group>
                            
                            <Form.Group className="text-left">
                                <Form.Label ><strong>Your message</strong></Form.Label>
                                <Form.Control 
                                    as="textarea"
                                    value={this.state.message} 
                                    onChange={e=>this.handle_change(e)} 
                                    name='message'
                                    placeholder="Hope you are having a smashing afternoon" 
                                    rows="5"
                                    required                  
                                />
                            </Form.Group>
                            <div className="text-right">
                                {
                                    this.state.sending?
                                    <Spinner  animation="border" variant="primary"/>
                                    :
                                    <Button variant="primary" type="submit" disabled={this.state.sending}>
                                        Submit
                                    </Button>

                                }
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}