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
                return "#43a8ec"
            }
            return "#a6dbff"
        }else{
            return "#a6dbff"
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
        // new and improved way
        let _load_sub_coll_settings = {}
        _load_sub_coll_settings[this.props.title]=child_collections
           
        
        this.props.context.add_sub_coll_setting_tp_super_ds(this.props.table_name,this.props.title,child_collections)

    }
    render(){
        console.log("this dot state------<>",this.state)
        return(<>
            <Collapse in ={this.props.control.value}
                
            >
               <div>
                <div className=" bg-infocard">
                    {Object.entries(this.props.datasets).map(item=>{
                        return(
                            <div key={item} className=" bg-infocard">
                                <Toggle>{tog=><>
                                    <div onClick={tog.toggle} className="pl-3 pointer">
                                        {item[0]}
                                    </div>
                                    <Collapse in={tog.value} timeout={500}>
                                        <div>
                                            <div 
                                                className="bg-infocard"
                                                style={{
                                                    overflowX:"hidden",
                                                    overflowY: "auto",
                                                    
                                                }}
                                            >
                                                {Object.keys(item[1][0]).map((sub_item,idx) =>{
                                                    return(
                                                        
                                                        <div
                                                            className="pl-4 pointer" 
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
                </div>
                </div>
            </Collapse>
        </>)
    
    }
}
const SubCollectionSelector = withFirebase(SubCollectionSelectorBase)
export default SubCollectionSelector