import React from 'react'
import {Toggle} from './Toggle'
import SubCollectionSelector from './SubCollectionSelector'
import { withFirebase } from '../../Firebase'
import { Row, Col, Collapse } from 'react-bootstrap'
import DetailModal from './DetailModal'
class InfoCardBase extends React.Component{
    constructor(props){
        super(props)
    }
    show_color = (asi,col_name) =>{
        // display a diferent className if the colukmn name has a sub colection 
        if(asi.length === 0){
            return "hidden-color"
        }
        for(const item of asi){
            if(item.parent_connection_column === col_name){
                return "show-color"
            }
        }
        return "hidden-color"
    }
    render(){
        const arr_sub_info = this.props.context.arr_settings.filter(item=>item.parent_collection_name === this.props.head)
        return(
            <div className="card infocard">
                <div className="infocard-header">
                   <h5>{this.props.head}</h5>
                   <div><i className="far fa-window-close delete-dataset" onClick={this.delete_dataset}></i></div>
                </div>
                <div className="infocard-body">
                    {Object.entries(this.props.body).map(item=>{
                        return(
                            <Toggle key={item[0] + 'key'}>{tog=><>
                                <div className="infocard-data data-odd" onClick={tog.toggle}>
                                    <strong>{item[0]}</strong> ({typeof item[1]}) <span className={this.show_color(arr_sub_info, item[0])}><i className="fas fa-database" title="Add sub-collection"></i></span>
                                </div>
                                <SubCollectionSelector 
                                    title={item[0]}
                                    table_name={this.props.head}
                                    control={tog} 
                                    datasets={this.props.context.dataset_obj}
                                />
                            </>}</Toggle>
                        )
                    })}
                </div>
                <div className="infocard-footer text-left">
                    <Toggle>{footTog=><>
                        <div onClick={footTog.toggle}>
                            Tools
                        </div>
                        <Collapse in={footTog.value} timeout={500}>
                            <div>
                                <div className="pl-3" > 
                                    <div>Help</div>
                                    <Toggle>{deet=><>
                                        <div onClick={deet.toggle}>Details</div>
                                        <DetailModal show={deet.value} control={deet} home_dataset={this.props.head}/>
                                    </>}</Toggle>
                                    <div>Push to Firestore</div>
                                </div>
                            </div>
                        </Collapse>
                    </>}</Toggle>
                </div>
            </div>
        )
    }
}
const InfoCard = withFirebase(InfoCardBase)
export default InfoCard