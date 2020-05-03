import React from 'react'
import { withFirebase } from '../../Firebase'
import {Button} from 'react-bootstrap'
import produce from 'immer'

class FastFirestoreBase extends React.Component{
    constructor(props){
        super(props)
        this.state={
            collection: '',
            attribute_comp: [],
            attribute:[],
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
                <Button onClick={e=>this.handle_click()}>submit</Button>
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