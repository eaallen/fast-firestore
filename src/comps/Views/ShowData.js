import React from 'react'
import { withFirebase } from '../Firebase'
import { Table } from 'react-bootstrap'

function ShowDataBase (props){
    if (!props.context[props.data]){
        return(
            <div>test data here</div>
        )
    }
    const handle_click = async () =>{
        
        props.context.pushDataToFirestore(props.context.new_collection, props.context[props.data])
    }
    const data = []
    for(let icount = 0; icount < 10; icount++){
        data.push(props.context[props.data][icount])
    }
    console.log(data)
    return(
        <div>
            <button onClick={e=>handle_click()}>Commit to firebase</button>
            
            <Table striped bordered responsive size="sm">
                <thead>
                    <tr>
                        {Object.entries(data[0]).map(item=>{
                            return(
                                <th key={item[0] + 'key'}>
                                    {item[0]} ({typeof item[1]})
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row,idx)=>{
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
                10 of {props.context[props.data].length} rows
            </p>
        </div>

    )
}
const ShowData = withFirebase(ShowDataBase)
export default ShowData