import React from 'react'
import { withFirebase } from '../../Firebase'
import {Button} from 'react-bootstrap'
import produce from 'immer'
import axios from 'axios'
class FastFirestoreBase extends React.Component{
    constructor(props){
        super(props)
        this.state={
            collection: '',
            attribute_comp: [],
            attribute:[],
            api_key:'',
            dw_data_set:'',
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

    handle_click(){
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
    get_dw_data(){
    
    }
    render(){
        console.log('state',this.state)
        return(
            <div>
                <h1>Fast Firestore</h1>
                <div>
                    Make Collection 
                    <br/>
                    <input value={this.state.collection} onChange={e=>this.handle_change(e)} name='collection'/>
                    <br/>
                    Data.world data set
                    <br/>
                    link
                    <input value={this.state.dw_data_set} onChange={e=>this.handle_change(e)} name='dw_data_set'/>
                    <br/>
                    api key
                    <input value={this.state.api_key} onChange={e=>this.handle_change(e)} name='api_key'/>
                    <Button onClick={e=>this.get_dw_data()}>Get data</Button>
                    <div>
                        {this.state.attribute_comp.map((item,key)=>{
                            return(
                                <div key={key}>
                                    {item}
                                </div>
                            )
                        })}
                    </div>
                    <Button onClick={e=>this.add_attribute_comp()}>Add Atribute</Button>
                </div>
                <Button onClick={e=>this.handle_click()}>get data</Button>
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