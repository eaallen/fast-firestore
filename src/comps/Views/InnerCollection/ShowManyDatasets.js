import React from 'react'
import { withFirebase } from '../../Firebase'
import { Table } from 'react-bootstrap'

class ShowManyDatasetsBase extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            sub_coll: [],
        }
    }
    handle_click = async () =>{
        this.props.context.pushDataToFirestore(this.props.context.new_collection, this.props.context[this.props.data])
    }
    make_sub_coll(){

    }
    render(){
        if (!this.props.context.dataset_arr){
            return(
                <div>test data here</div>
            )
        }
        let data = this.props.context.dataset_arr
        // for(let dataset of this.props.context.dataset_arr){
        //     let sub_data = []
        //     for(let icount = 0; icount < dataset.length; icount++){
        //         sub_data.push(dataset[icount])
        //     }
        //     data.push(sub_data)
        // }
        //data = [[{},{},{},{},{}],[{},{},{},{},{}],[{},{},{},{},{}]]
        console.log(data)
        return(
            <div>
                <button onClick={e=>this.handle_click()}>Commit to firebase</button>
                {data.map((data_arr, idx)=> {
                    return(
                        <div key={idx}>
                            <h1>{idx}</h1>
                            <div onClick={e=>this.make_sub_coll()}>
                                pick me
                            </div>
                            <Table striped bordered responsive size="sm">
                                <thead>
                                    <tr>
                                        {Object.entries(data_arr[0]).map(item=>{
                                            return(
                                                <th key={item[0] + 'key'}>
                                                    {item[0]} ({typeof item[1]})
                                                </th>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data_arr.map((row,idx)=>{
                                        return(
                                            <tr key={idx}>
                                                {Object.values(row).map((item,idx)=>{
                                                    return(
                                                        <td key={idx}>
                                                            {item}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                            <p className="text-left">
                                preview on shows 10 rows
                            </p>
                        </div>
                    )
                })}

            </div>

        )
    }
}
const ShowManyDatasets = withFirebase(ShowManyDatasetsBase)
export default ShowManyDatasets