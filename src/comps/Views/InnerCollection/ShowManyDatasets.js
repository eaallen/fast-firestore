import React from 'react'
import { withFirebase } from '../../Firebase'
import {CardColumns,} from 'react-bootstrap'
import InfoCard from '../Tools/InfoCard'

// this is where the InfoCard gets rendered. 

class ShowManyDatasetsBase extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    handle_click = async () =>{
        this.props.context.pushDataToFirestore(this.props.context.new_collection, this.props.context[this.props.data])
    }
    
    render(){
        if (!this.props.context.super_ds){
            return(
                <div>test data here</div>
            )
        }
        
        let datasets = this.props.context.super_ds
        console.log('state------------',datasets)
        return(
            <div>
                <CardColumns> {/* CardColumns was a good idea but i dont like the it changes the posisitons of cards after the size changes. later I would like to set up just some columns that cards get assigned to based appon their position in an array */}
                    {Object.entries(datasets).map((data_arr)=> {
                        return(
                            <InfoCard key={data_arr[0]} head={data_arr[0]} obj={data_arr[1]} body={data_arr[1]}/>
                        )
                    })}
                </CardColumns>
            </div>

        )
    }
}
const ShowManyDatasets = withFirebase(ShowManyDatasetsBase)
export default ShowManyDatasets

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
