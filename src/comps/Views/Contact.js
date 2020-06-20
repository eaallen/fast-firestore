import React from 'react'
import{Form, Button, Row, Col} from 'react-bootstrap'
import axios from 'axios'

// provide users a way to contact me plus show off some no server skills 
export default class Contact extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:"",
            subject: "",
            message: "",
            sending:false,
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
    }
    render(){
        return(
            <div>
                <Form onSubmit={e=> this.handle_submit(e)}>
                    <Row>
                        <Col md={3}>
                            <img src="/me.jpg" className="img-thumbnail rounded-circle me" title="thats me, Elijah Allen" alt="Elijah Allen"/>
                            <Form.Text className="text-muted">
                                Elijah Allen
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
                            <br/>
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
                        </Col>
                    </Row>
                    <Form.Group className="text-left">
                        <Form.Label ><strong>Your message</strong></Form.Label>
                        <Form.Control 
                            as="textarea"
                            value={this.state.message} 
                            onChange={e=>this.handle_change(e)} 
                            name='message'
                            placeholder="Hope you are having a smashing afternoon" 
                            rows="10"
                            required                  
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={this.state.sending}>
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}