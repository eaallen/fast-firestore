import React from 'react'
import { withFirebase } from '../../Firebase'
import { Table,} from 'react-bootstrap'
import { Toggle } from '../Tools/Toggle'
import SubCollectionSelector from '../Tools/SubCollectionSelector'

class ShowManyDatasetsBase extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            sub_coll: [],
            corr:{x:444,y:0}
        }
    }
    handle_click = async () =>{
        this.props.context.pushDataToFirestore(this.props.context.new_collection, this.props.context[this.props.data])
    }
    make_sub_coll(e){
        e.persist()
        console.log("hello",e.clientX)
        this.setState({corr:{x:e.clientX,y:e.clientY}})
    }
    render(){
        if (!this.props.context.dataset_obj){
            return(
                <div>test data here</div>
            )
        }
        let data = this.props.context.dataset_obj
        // for(let dataset of this.props.context.dataset_arr){
        //     let sub_data = []
        //     for(let icount = 0; icount < dataset.length; icount++){
        //         sub_data.push(dataset[icount])
        //     }
        //     data.push(sub_data)
        // }
        //data = [[{},{},{},{},{}],[{},{},{},{},{}],[{},{},{},{},{}]]
        console.log('state------------',this.state)
        return(
            <div>
                
                <button onClick={e=>this.handle_click()}>Commit to firebase</button>
                {Object.entries(data).map((data_arr)=> {
                    return(
                        <div key={data_arr[0]}>
                            <h1>{data_arr[0]}</h1>
                            <Table striped bordered responsive size="sm">
                                <thead>
                                    <tr>
                                        {Object.entries(data_arr[1][0]).map(item=>{
                                            return(
                                                <Toggle key={item[0] + 'key'}>{tog=><>
                                                    <th onClick={tog.toggle}>
                                                        {item[0]} ({typeof item[1]})
                                                    </th>
                                                    <SubCollectionSelector 
                                                        title={item[0]}
                                                        control={tog} 
                                                        datasets={data}
                                                    />
                                                </>}</Toggle>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data_arr[1].map((row,idx)=>{
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

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
