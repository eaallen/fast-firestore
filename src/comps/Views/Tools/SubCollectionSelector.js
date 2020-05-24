import React from 'react'
import {Modal, Collapse, Button} from 'react-bootstrap'
import { Toggle } from './Toggle'
import produce from 'immer'
import { withFirebase } from '../../Firebase'
class SubCollectionSelectorBase extends React.Component{
    constructor(props){
        super(props)
        this.state={
            
        }
    }
    make_select = (column_name, table_name) => {
        // console.log(column_name, table_name)
        if(this.state[table_name] !== undefined && this.state[table_name][column_name] !==undefined){
            this.setState(state=> produce(state, draft=>{
                draft[table_name][column_name] = !draft[table_name][column_name]
              }))
        }else{
            this.setState(state=> produce(state, draft=>{
                draft[table_name]={}
              }))
            this.setState(state=> produce(state, draft=>{
                draft[table_name][column_name] = true
            }))
        }
        //enable below t0 make it so you can pick mutilple columns pre table
        // }else{      
        //     this.setState(state=> produce(state, draft=>{
        //         draft[table_name][column_name] = true
        //     }))
        // }
    }
    show_select = (column_name, table_name) =>{
        // changes background color so user knows what they have choosen
        if(this.state[table_name] !== undefined && this.state[table_name][column_name] !==undefined){
            if(this.state[table_name][column_name]){
                return "lightgray"
            }
            return "whitesmoke"
        }else{
            return "whitesmoke"
        }
    }
    save = () =>{
        console.log("save", this.props.table_name, this.props.title)
        let child_collections = {}
        
        for(const KEY in this.state){
            let arr_for_sub_coll = []
            for(const key in this.state[KEY]){
                if(this.state[KEY][key]){
                    arr_for_sub_coll.push(key)
                    child_collections[KEY] = key
                }
            }
        }
        console.log(child_collections,"<----")
        let load_sub_coll_settings = {
            child_collections:child_collections,
            parent_collection_name: this.props.table_name,
            parent_connection_column: this.props.title
        }
        console.log(load_sub_coll_settings)
        this.props.context.doSetStateArray(load_sub_coll_settings)
    }
    render(){
        console.log("this dot state------<>",this.state)
        return(<>
            <Modal
                size="md"
                show={this.props.control.value}
                onHide={this.props.control.toggle}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Create a sub collection for {this.props.title}
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {Object.entries(this.props.datasets).map(item=>{
                        return(
                            <div key={item}>
                                <Toggle>{tog=><>
                                    <h5 onClick={tog.toggle}>
                                        {item[0]}
                                    </h5>
                                    <Collapse in={tog.value} timeout={500}>
                                        <div>
                                            <div
                                                style={{
                                                    overflowX:"hidden",
                                                    overflowY: "auto",
                                                    backgroundColor: "whitesmoke",
                                                }}
                                            >
                                                {Object.keys(item[1][0]).map((sub_item,idx) =>{
                                                    return(
                                                        
                                                        <div
                                                            className="pl-3" 
                                                            key={idx}
                                                            onClick={e=>this.make_select(sub_item, item[0])}
                                                            style={{
                                                                backgroundColor: this.show_select(sub_item, item[0])
                                                            }}
                                                        >
                                                            {sub_item}  
                                                        </div>
                                                       
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </Collapse>
                                </>}</Toggle>
                            </div>
                        )
                    })}
                    <div className="text-right"> 
                        <Button variant="light"> Cancel</Button>
                        <Button onClick={e=>this.save()} variant="primary"> Save</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>)
    
    }
}
const SubCollectionSelector = withFirebase(SubCollectionSelectorBase)
export default SubCollectionSelector