import React from 'react'
import { withFirebase } from '../Firebase'
import { Table } from 'react-bootstrap'

function ShowDataBase (props){
    if (!props.context.dw_data){
        return(
            <div>test data here</div>
        )
    }
    const data = []
    for(let icount = 0; icount < 10; icount++){
        data.push(props.context.dw_data[icount])
    }
    console.log(data)
    return(
        <div>
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
                10 of {Object.entries(data[0]).length} rows
            </p>
        </div>

    )
}
const ShowData = withFirebase(ShowDataBase)
export default ShowData