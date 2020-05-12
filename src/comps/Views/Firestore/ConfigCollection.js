import React from 'react'
import { withFirebase } from '../../Firebase'
import {Button, Form,Row,Col} from 'react-bootstrap'
class ConfigCollectionBase extends React.Component{
    constructor(props){
        super(props)
        this.state={
            collection: '',
            firebase_config:'',
        }
    }
    handle_change =(e) => {
        e.preventDefault()
        let new_state={[e.target.getAttribute('name')]: e.target.value}
        this.setState(new_state)        
    }

    async handle_click(e){
        e.preventDefault()
        await this.props.context.doSetState({second_config:await this.parse_and_send(), new_collection:this.state.collection})

    }
    //add the attribute component to the array in state
    parse_and_send(){
        //use regex to turn the config string into JSON format
        let str = this.state.firebase_config
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
                    <Form.Group>
                        <Form.Control 
                            value={this.state.collection}
                            onChange={e=>this.handle_change(e)} 
                            name='collection'
                            placeholder="New Collection Name"
                        />
                    </Form.Group>
                </Form>
                <Button onClick={e=> this.handle_click(e)}>Continue</Button>
            </div>
        )
    }
}
const ConfigCollection = withFirebase(ConfigCollectionBase)
export default ConfigCollection
