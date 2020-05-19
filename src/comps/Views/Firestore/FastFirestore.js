import React from 'react'
import { withFirebase } from '../../Firebase'
import {Form,Row,Col} from 'react-bootstrap'
import axios from 'axios'
class FastFirestoreBase extends React.Component{
    constructor(props){
        super(props)
        this.state={
            api_key:'',
            dw_data_set:'',
            data_set_name:'',
            file_name: '',
            user_name: '',
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

    async handle_click(e){
        e.preventDefault()
        await this.props.context.doSetState('second_config',this.parse_and_send())
    }
    //add the attribute component to the array in state
    async get_dw_data(e){
        e.preventDefault()
        console.log('click')
        let resp = await axios({
            url: `https://api.data.world/v0/sql/${this.state.user_name}/${this.state.dw_data_set}`,
            data:{query: `SELECT * FROM ${this.state.file_name} Limit 10`},
            // url: `https://api.data.world/v0/sql/eaallen/kandykane`,
            // data:{query: `SELECT * FROM customer Limit 10`},
            headers:{
                Authorization: "Bearer "+"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcm9kLXVzZXItY2xpZW50OmVhYWxsZW4iLCJpc3MiOiJhZ2VudDplYWFsbGVuOjo0YzBlYWQ5YS1kODE5LTQzMWMtYjVmOS0zNGEwZDE5MzRkOGQiLCJpYXQiOjE1Nzc3MTc5OTcsInJvbGUiOlsidXNlcl9hcGlfcmVhZCIsInVzZXJfYXBpX3dyaXRlIl0sImdlbmVyYWwtcHVycG9zZSI6dHJ1ZSwic2FtbCI6e319.XbV9G84LNvqN6RREjPKFlDLQrTtzUu5KVu46xDS7TOtGnMZ94h1PrNaAkQ6zT-79QOM7Ku2GrZdivguQ_o9jsw" //this.state.api_key
            },
        })
        console.log('response from data.world',resp.data)
        this.props.context.push_dataset_to_obj(this.state.dw_data_set+"_"+this.state.file_name ,resp.data)
    }
   
    render(){
        console.log('state',this.state)
        return(
            <div>
                <h3>Import from Data.world</h3>
                <Form>
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
                    
                </Form>
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