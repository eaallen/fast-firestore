import React from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import FastFirestore from '../Firestore/FastFirestore'
import ShowData from '../ShowData'
import ShowManyDatasets from '../InnerCollection/ShowManyDatasets'
import CsvUpload from '../Firestore/CsvUpload'
import ConfigCollection from '../Firestore/ConfigCollection'
import produce from 'immer'
import { withFirebase } from '../../Firebase'
import DataWorldForm from '../Tools/DataWorldForm'
class HomeBase extends React.Component{
    constructor(props){
        super(props)
        this.state={
            arr_fast_firestore: [<FastFirestore/>],
        }
    }
    new_FastFirestore = () =>{
        this.setState(state=> produce(state, draft=>{
            draft.arr_fast_firestore.push(<FastFirestore/>)
          }))
    }
    handle_test = () =>{
        this.props.context.pushDataWithSubCollectionToFirestore()
    }
    render(){
        return(
            <div>
                <Row noGutters>
                    <Col sm={3} className="pl-4 pr-4">
                        <div>
                            <h1>
                                Step 1.
                            </h1>
                            <h4>
                                Create a Collection Instance for Your Data
                            </h4>
                            <ConfigCollection/>
                        </div>
                    </Col>
                    <Col sm={9}>
                        <DataWorldForm/>
                        pictures go here
                        <br/>
                        
                    </Col>
                </Row>
                <br/> <br/>
                <Row noGutters>
                    <Col sm={3} className="pl-4 pr-4">
                        <div>
                            <h1>
                                Step 2.
                            </h1>
                            <h4>
                                Import Data from Source and review it
                            </h4>
                            <div>
                                {this.state.arr_fast_firestore.map((comp, idx)=> {
                                    return(
                                        <div key={idx}>
                                            {comp}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </Col>
                    <Col sm={9}>
                        {/* <ShowData data="dw_data"/> */}
                        <ShowManyDatasets/>
                    </Col>
                </Row>
                <div>
                    
                </div>
                <br/> <br/>
                <Row noGutters>
                    <Col sm={3} className="pl-4 pr-4">
                        <CsvUpload/>
                    </Col>
                    <Col sm={9}>
                        
                    </Col>
                </Row>
            </div>
        )
    
    }
}
const Home = withFirebase(HomeBase)
export default Home