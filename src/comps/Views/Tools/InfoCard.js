import React from 'react'
import {Toggle} from './Toggle'
import SubCollectionSelector from './SubCollectionSelector'
import { withFirebase } from '../../Firebase'
import { Row, Col } from 'react-bootstrap'
class InfoCardBase extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="infocard">
                <div className="infocard-header">
                   <h5>{this.props.head}</h5> 
                </div>
                <div className="infocard-body">
                    {Object.entries(this.props.body).map(item=>{
                        return(
                            <Toggle key={item[0] + 'key'}>{tog=><>
                                <div className="infocard-data data-odd" onClick={tog.toggle}>
                                    {item[0]} ({typeof item[1]}) <span className="hidden-color"><i className="fas fa-database" title="Add sub-collection"></i></span>
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
                    <Row className="text-center">
                        <Col>View Data</Col><Col>Push to Firebase</Col>
                    </Row>
                </div>
            </div>
        )
    }
}
const InfoCard = withFirebase(InfoCardBase)
export default InfoCard