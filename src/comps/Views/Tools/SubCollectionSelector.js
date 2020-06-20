import React from 'react'
import {Collapse, Button} from 'react-bootstrap'
import { Toggle } from './Toggle'
import produce from 'immer'
import { withFirebase } from '../../Firebase'

// lets the user assign subcollections to collections i.e joins datasets
class SubCollectionSelectorBase extends React.Component{
    constructor(props){
        super(props)
        this.state={
            setting:{}
        }
    }
    make_select = (column_name, table_name) => {
        // console.log(column_name, table_name)
        if(this.state.setting[table_name] !== undefined && this.state.setting[table_name][column_name] !==undefined){ // we alrdey have somthing
            this.setState(state=> produce(state, draft=>{
                draft.setting={}
              }))
        }else{
            this.setState(state=> produce(state, draft=>{
                draft.setting[table_name]={}
              }))
            this.setState(state=> produce(state, draft=>{
                draft.setting[table_name][column_name] = true
            }))
        }
    }
    show_select = (column_name, table_name) =>{
        // changes background color so user knows what they have choosen
        if(this.state.setting[table_name] !== undefined && this.state.setting[table_name][column_name] !==undefined){
            if(this.state.setting[table_name][column_name]){
                return "#43a8ec"
            }
            return "#a6dbff"
        }else{
            return "#a6dbff"
        }
    }
    save = () =>{ // adds the sub_collections settings to the super_ds dictionary 
        console.log("save", this.props.table_name, this.props.title)
        let child_collections = {}
        
        for(const KEY in this.state.setting){
            let arr_for_sub_coll = []
            for(const key in this.state.setting[KEY]){
                if(this.state.setting[KEY][key]){
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
        // this.props.context.doSetStateArray(load_sub_coll_settings)
        // new and improved way
        let _load_sub_coll_settings = {}
        _load_sub_coll_settings[this.props.title]=child_collections
           
        
        this.props.context.add_sub_coll_setting_tp_super_ds(this.props.table_name,this.props.title,child_collections)

    }
    cancel = () => { // remover the sub_collections settings from the super_ds dictionary 
        console.log("cancle")

        this.setState(state=> produce(state, draft=>{
            draft.setting = {}
        }))
        
        this.props.context.remove_a_sub_coll_setting(this.props.table_name, this.props.title)
    }
    is_state_empty = () =>{
        if(Object.keys(this.state.setting).length===0){
            return true
        }
        return false
    }
    save_action = () =>{
    }
    render(){
        return(<>
            <Collapse in ={this.props.control.value}
                
            >
               <div>
                <div className=" bg-infocard">
                    {Object.entries(this.props.context.super_ds).map(item=>{
                        return(
                            <div key={item[0]+'key'} className=" bg-infocard">
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
                                                {Object.keys(item[1].data[0]).map((sub_item,idx) =>{
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
                        <Button variant="light" onClick={e=>this.cancel()}> Cancel</Button>
                        <Button onClick={e=>this.save()} variant="primary" disabled={this.is_state_empty()}> Save</Button>
                    </div>
                </div>
                </div>
            </Collapse>
        </>)
    
    }
}
const SubCollectionSelector = withFirebase(SubCollectionSelectorBase)
export default SubCollectionSelector