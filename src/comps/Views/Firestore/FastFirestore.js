import React from 'react'
import { withFirebase } from '../../Firebase'
import {Form,Row,Col,Button} from 'react-bootstrap'
import axios from 'axios'
class FastFirestoreBase extends React.Component{
    constructor(props){
        super(props)
        this.state={
            api_key:'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcm9kLXVzZXItY2xpZW50OmVhYWxsZW4iLCJpc3MiOiJhZ2VudDplYWFsbGVuOjo0YzBlYWQ5YS1kODE5LTQzMWMtYjVmOS0zNGEwZDE5MzRkOGQiLCJpYXQiOjE1Nzc3MTc5OTcsInJvbGUiOlsidXNlcl9hcGlfcmVhZCIsInVzZXJfYXBpX3dyaXRlIl0sImdlbmVyYWwtcHVycG9zZSI6dHJ1ZSwic2FtbCI6e319.XbV9G84LNvqN6RREjPKFlDLQrTtzUu5KVu46xDS7TOtGnMZ94h1PrNaAkQ6zT-79QOM7Ku2GrZdivguQ_o9jsw',
            dw_data_set:'kandykane',
            data_set_name:'',
            file_name: 'customer',
            user_name: 'eaallen',
            error: '',
            getting_data: false,
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
        let resp
        let dataset_info // used to get info about the data set
        this.setState({error:'',getting_data:true})
        try{
            console.log('click')
            resp = await axios({ // getting some sample data
                url: `https://api.data.world/v0/sql/${this.state.user_name}/${this.state.dw_data_set}`,
                data:{query: `SELECT * FROM ${this.state.file_name} Limit 5`},
                headers:{
                    Authorization: "Bearer "+this.state.api_key
                },
            })
            dataset_info = await axios({ // make sure this only return 1 row ||| we need this so we know how many rows this data has 
                url: `https://api.data.world/v0/sql/${this.state.user_name}/${this.state.dw_data_set}`,
                data:{query: `SELECT COUNT(*) as row_count FROM ${this.state.file_name} Limit 1`},
                headers:{
                    Authorization: "Bearer "+this.state.api_key
                },
            })
            console.log('response from data.world',resp)
            const name = this.state.dw_data_set+"_"+this.state.file_name
            const meta_data = { // build the meta data
                name: this.state.file_name,
                user: this.state.user_name,
                api_key: this.state.api_key,
                dw_data_set: this.state.dw_data_set,
                src: "data.world",
                dataset_info: dataset_info.data[0]
            }
            this.props.context.create_dataset(name,resp.data,meta_data) // title, actual data, meta data
            this.setState({getting_data:false})
        }catch(e){
           this.setState({error:'Connection Error'})
           console.error(e)
        }
    }
   
    render(){
        console.log('state',this.state)
        return(
            <div>
                <h3>Import from Data.world</h3>
                <Form onSubmit={e=>this.get_dw_data(e)}>
                    <Row>
                        <Col>
                            <Form.Label>
                                user name
                            </Form.Label>
                            <Form.Control
                                value={this.state.user_name} 
                                onChange={e=>this.handle_change(e)}
                                name='user_name'
                                required 
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
                                required 
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
                                required 
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
                            required 
                        />
                    </Form.Group>
                        
                    <Button type="submit" disabled={this.state.getting_data}>View data from data.world</Button>
                    <p className="text-danger">{this.state.error}</p>
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