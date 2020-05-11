import React from 'react'
import { withFirebase } from '../../Firebase'
import {Button, Form,Row,Col} from 'react-bootstrap'
import produce from 'immer'
import axios from 'axios'
import CsvUpload from './CsvUpload'
class FastFirestoreBase extends React.Component{
    constructor(props){
        super(props)
        this.state={
            collection: '',
            attribute_comp: [],
            attribute:[],
            api_key:'',
            dw_data_set:'',
            data_set_name:'',
            file_name: '',
            user_name: '',
            firebase_config:'',
        }
        this.actions={
            add_attribute: this.add_attribute
        }
    }
    handle_change =(e) => {
        e.preventDefault()
        let new_state={[e.target.getAttribute('name')]: e.target.value}
        this.setState(new_state)        
    }

    handle_click(e){
        e.preventDefault()
        this.props.context.loadFakeData(this.state.collection)
        this.setState({...this.state, collection:''})
    }
    //add the attribute component to the array in state
    add_attribute_comp(){
        this.setState(state=> produce(state, draft=>{
            draft.attribute_comp.push(<Attribute actions={{...this.actions}}/>)
        }))
    }
    add_attribute(key, value){
        this.setState(state=> produce(state, draft=>{
            draft.attribute.push([key,value])
        }))
    }
    async get_dw_data(e){
        e.preventDefault()
        console.log('click')
        let resp = await axios({
            // url: `https://api.data.world/v0/sql/${this.state.user_name}/${this.state.dw_data_set}`,
            // data:{query: `SELECT * FROM ${this.state.file_name} Limit 10`},
            url: `https://api.data.world/v0/sql/eaallen/kandykane`,
            data:{query: `SELECT * FROM customer Limit 10`},
            headers:{
                Authorization: "Bearer "+`eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcm9kLXVzZXItY2xpZW50OmVhYWxsZW4iLCJpc3MiOiJhZ2VudDplYWFsbGVuOjo0YzBlYWQ5YS1kODE5LTQzMWMtYjVmOS0zNGEwZDE5MzRkOGQiLCJpYXQiOjE1Nzc3MTc5OTcsInJvbGUiOlsidXNlcl9hcGlfcmVhZCIsInVzZXJfYXBpX3dyaXRlIl0sImdlbmVyYWwtcHVycG9zZSI6dHJ1ZSwic2FtbCI6e319.XbV9G84LNvqN6RREjPKFlDLQrTtzUu5KVu46xDS7TOtGnMZ94h1PrNaAkQ6zT-79QOM7Ku2GrZdivguQ_o9jsw` //this.state.api_key
            },
        })
        console.log('response from data.world',resp.data)
        this.props.context.doSetState('dw_data', resp.data)
        //resp.data is an array response from the data.world client
        // collection is the string name of the collection that will be created in firebase
        
        // await this.props.context.doSetState('second_config',this.parse_and_send())

        // this.props.context.pushDataToFirestore(this.state.collection, resp.data)
    }
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
    test(){
        var str="oneTwo";
        var re=/([a-z]+)([A-Z][a-z]+)/
        var result = str.replace(re, '"$1"');
        console.log(result);
    }
    render(){
        console.log('state',this.state)
        return(
            <div>
                <button onClick={e=> this.test(e)}>test</button>
                <h1>Fast Firestore</h1>
                <Form>
                    <Form.Group>
                        <Form.Control 
                            as="textarea"
                            value={this.state.firebase_config} 
                            onChange={e=>this.handle_change(e)} 
                            name='firebase_config'                    
                        />
                        
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Make Collection
                        </Form.Label>
                        <Form.Control 
                            value={this.state.collection}
                            onChange={e=>this.handle_change(e)} 
                            name='collection'
                        />
                    </Form.Group>
                    Data.world
                    <Row>
                        <Col>
                            <Form.Label>
                                user name
                            </Form.Label>
                            <Form.Control
                                value={this.state.user_name} 
                                onChange={e=>this.handle_change(e)}
                                name='user_name'
                            />
                        </Col>
                        <Col>
                            <Form.Label>
                                Dataset                        
                            </Form.Label> 
                            <Form.Control
                                value={this.state.dw_data_set} 
                                onChange={e=>this.handle_change(e)} 
                                name='dw_data_set'
                            />   
                        </Col>    
                        <Col>
                            <Form.Label>
                                file name
                            </Form.Label>
                            <Form.Control
                                value={this.state.file_name} 
                                onChange={e=>this.handle_change(e)} 
                                name='file_name'
                            />
                        </Col>
                    
                    </Row>
                    <Form.Group>
                        <Form.Label>
                            API Token
                        </Form.Label>
                        <Form.Control 
                            type="text"
                            value={this.state.api_key} 
                            onChange={e=>this.handle_change(e)} 
                            name='api_key'
                        />
                    </Form.Group>
                        
                        {/* https://api.data.world/v0/sql/eaallen/cleancovid */}
                        {/* eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcm9kLXVzZXItY2xpZW50OmVhYWxsZW4iLCJpc3MiOiJhZ2VudDplYWFsbGVuOjo0YzBlYWQ5YS1kODE5LTQzMWMtYjVmOS0zNGEwZDE5MzRkOGQiLCJpYXQiOjE1Nzc3MTc5OTcsInJvbGUiOlsidXNlcl9hcGlfcmVhZCIsInVzZXJfYXBpX3dyaXRlIl0sImdlbmVyYWwtcHVycG9zZSI6dHJ1ZSwic2FtbCI6e319.XbV9G84LNvqN6RREjPKFlDLQrTtzUu5KVu46xDS7TOtGnMZ94h1PrNaAkQ6zT-79QOM7Ku2GrZdivguQ_o9jsw */}
                        
                        <button onClick={e=>this.get_dw_data(e)}>View data from data.world</button>
                        <div>
                            {this.state.attribute_comp.map((item,key)=>{
                                return(
                                    <div key={key}>
                                        {item}
                                    </div>
                                )
                            })}
                        </div>
                    
                </Form>
                <button onClick={e=>this.handle_click(e)}>Commit to firebase</button>
                <button onClick={e=>this.add_attribute_comp()}>Add Atribute</button>
            </div>
        )
    }
}
const FastFirestore = withFirebase(FastFirestoreBase)
export default FastFirestore

export const Attribute = (props)=>{
    let [key, setKey] = React.useState('')
    let [value, setValue] = React.useState('')
    return(
        <div>
            key:<input value={key} onChange={e=>setKey(e.target.value)}/> 
            <br/>
            value:<input value={value} onChange={e=>setValue(e.target.value)}/>
        </div>
    )
}