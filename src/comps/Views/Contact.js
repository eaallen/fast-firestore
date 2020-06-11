import React from 'react'
import{Form, Button} from 'react-bootstrap'
import axios from 'axios'
export default class Contact extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:"",
            subject: "",
            message: "",
        }
    }
    handle_change =(e) => {
        e.preventDefault()
        let new_state={[e.target.getAttribute('name')]: e.target.value}
        this.setState(new_state)        
    }

    handle_submit = async(e) => {
        e.preventDefault()
        // send the state to a .gs tool to send email to me
        const data =  encodeURI(JSON.stringify(this.state))
        let email = await axios({
            method:"get",
            url:`https://script.google.com/macros/s/AKfycbyKrP7sbgYNG8l9tF8I7VVi-8yXkVg-6lLju8d_eog3F7Tuix0/exec?data=${data}`
        })
        console.log(email)
    }
    render(){
        return(
            <div>
                <Form onSubmit={e=> this.handle_submit(e)}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Your email address</Form.Label>
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

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control
                            type="text" 
                            placeholder="Superman didn't always fly"
                            name="subject"
                            onChange={e=>this.handle_change(e)} 
                            value={this.state.subject} 
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control 
                            as="textarea"
                            value={this.state.message} 
                            onChange={e=>this.handle_change(e)} 
                            name='message'
                            placeholder="Firebase Config Here" 
                            required                  
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}