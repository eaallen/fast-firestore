import React from 'react'
import { withFirebase } from '../../Firebase'
import {Button, Form,Row,Col} from 'react-bootstrap'
class ConfigCollectionBase extends React.Component{
    constructor(props){
        super(props)
        this.state={
            collection: '',
            firebase_config:'',
            error:'',
        }
    }
    handle_change =(e) => {
        e.preventDefault()
        let new_state={[e.target.getAttribute('name')]: e.target.value}
        this.setState(new_state)        
    }

    async handle_click(e){
        e.preventDefault()
        await this.props.context.doSetState({second_config:await this.parse_and_send()})

    }
    //add the attribute component to the array in state
    parse_and_send(){
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
                <Form>
                    <Form.Group>
                        <Form.Control 
                            as="textarea"
                            value={this.state.firebase_config} 
                            onChange={e=>this.handle_change(e)} 
                            name='firebase_config'
                            placeholder="Firebase Config Here"                   
                        />
                    </Form.Group>
                </Form>
                <Button onClick={e=> this.handle_click(e)}>Continue</Button>
                <p className="text-danger">{this.state.error}</p>
            </div>
        )
    }
}
const ConfigCollection = withFirebase(ConfigCollectionBase)
export default ConfigCollection
