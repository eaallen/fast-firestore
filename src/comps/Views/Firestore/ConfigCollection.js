import React from 'react'
import { withFirebase } from '../../Firebase'
import {Button, Form} from 'react-bootstrap'

// this is where the user put in the firebase config info. 
class ConfigCollectionBase extends React.Component{
    constructor(props){
        super(props)
        this.state={
            collection: '',
            firebase_config:'',
            error:'',
        }
    }
    handle_change =(e) => { // normal form stuff
        e.preventDefault()
        let new_state={[e.target.getAttribute('name')]: e.target.value}
        this.setState(new_state)        
    }

    async handle_click(e){ // normal form stuff
        e.preventDefault()
        await this.props.context.doSetState({second_config:await this.parse_and_send()})
        await this.props.context.init_secoundary_firebase()

    }
    //add the attribute component to the array in state
    parse_and_send(){ // reads the data and uses regex to find the info to turn into JS object
        try{
            this.setState({error:""})
            //use regex to turn the config string into JSON format
            let str = "{"+this.state.firebase_config+"}"
            //find what we want to change
            let re = /\w+(?=:\s)/gm
            let find = str.match(re)
            console.log('find--->',find)
            //make the change here
            for(const item of find){
                str = str.replace(item, '"'+item+'"')
            }
            console.log(str)

            let config = JSON.parse(str)

            //set the state in the context provider
            return config
        }catch(e){
            this.setState({error:"Must be your Firebase config info"})
        }
    }
    render(){
        console.log('state',this.state)
        return(
            <div>
                <Form onSubmit={e=>this.handle_click(e)}>
                    <Form.Group>
                        <Form.Control 
                            as="textarea"
                            value={this.state.firebase_config} 
                            onChange={e=>this.handle_change(e)} 
                            name='firebase_config'
                            placeholder="Firebase Config Here" 
                            required                  
                        />
                    </Form.Group>
                    <Button type="submit">Continue</Button>
                </Form>
                <p className="text-danger">{this.state.error}</p>
            </div>
        )
    }
}
const ConfigCollection = withFirebase(ConfigCollectionBase)
export default ConfigCollection
