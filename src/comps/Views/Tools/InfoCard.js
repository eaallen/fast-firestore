import React from 'react'
import {Toggle} from './Toggle'
import SubCollectionSelector from './SubCollectionSelector'
import { withFirebase } from '../../Firebase'
import {Collapse, Spinner, /*ProgressBar*/} from 'react-bootstrap'
import DetailModal from './DetailModal'

// User interface to work with datasets
class InfoCardBase extends React.Component{ 
    show_color = (asi,col_name) =>{
        // display a diferent className if the colukmn name has a sub colection 
        if(asi.length === 0){
            return "hidden-color"
        }
        for(const item of asi){
            if(item === col_name){
                return "show-color"
            }
        }
        return "hidden-color"
    }
    render(){
        console.log(this.props.obj,"<----")
        const arr_sub_info = Object.keys(this.props.obj.sub_collection_settings) || []
        if(!this.props.obj.data){
            return(
                <Spinner/>

            )
        }
        return(
            <div className="card infocard">
                <div className="infocard-header">
                   <div className="head-padding"><h5>{this.props.head}</h5></div>
                   <div><i className="far fa-window-close delete-dataset" onClick={e=>this.props.context.delete_dataset(this.props.head)}></i></div>
                </div>
                <div className="infocard-body">
                    {Object.entries(this.props.obj.data[0]).map(item=>{
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
                        <div className="pointer pl-1" onClick={footTog.toggle}>
                            Tools
                        </div>
                        <Collapse in={footTog.value} timeout={500}>
                            <div>
                                <div className="pl-3" > 
                                    <Toggle>{deet=><>
                                        <div onClick={deet.toggle}> 
                                            <span className="pointer">
                                                Details
                                            </span>
                                        </div>
                                        <DetailModal show={deet.value} control={deet} home_dataset={this.props.head}/>
                                    </>}</Toggle>
                                    <div onClick={e=>this.props.context.pushDataToFirestore(this.props.head)}>
                                       <span className="pointer"> Push to Firestore
                                        {/*
                                            this.props.obj.loading_info.loading?
                                                <ProgressBar 
                                                    variant="info"
                                                    now={100*(this.props.obj.loading_info.loading/this.props.obj.data.length)}
                                                    label = {`${Math.round(100*(this.props.obj.loading_info.loading/this.props.obj.data.length))}%`}
                                                />
                                            :
                                            this.props.obj.loading_info.uploaded?
                                            <>
                                                <ProgressBar 
                                                    now={100}
                                                    label = "Upload Complete"
                                                    variant="info"
                                                />
                                            </>
                                            :
                                            <></>
                                        */}
                                        {
                                           this.props.obj.loading_info.loading?
                                           <p> loading...</p>
                                           :
                                           this.props.obj.loading_info.uploaded?
                                           <p>
                                              Upload Complete 
                                           </p>
                                           :
                                           <></>

                                        }
                                        </span>
                                    </div>
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