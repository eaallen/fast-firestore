import React from 'react'
import { withFirebase } from '../../Firebase'
import { Table, CardColumns,} from 'react-bootstrap'
import { Toggle } from '../Tools/Toggle'
import SubCollectionSelector from '../Tools/SubCollectionSelector'
import InfoCard from '../Tools/InfoCard'

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
        if (!this.props.context.dataset_obj){
            return(
                <div>test data here</div>
            )
        }
        let data = this.props.context.dataset_obj
        let datasets = this.props.context.super_ds
        console.log('state------------',datasets)
        return(
            <div>
                <CardColumns>
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
