import React from 'react'
import { withFirebase } from '../../Firebase'
import {Modal,Table} from 'react-bootstrap'
class DetailModalBase extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        console.log("data for modal", this.props.context.dataset_obj[this.props.home_dataset])
        return(
            <Modal 
                show={this.props.show}
                onHide={this.props.control.toggle}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.home_dataset}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered responsive size="sm">
                        <thead>
                            <tr>
                                {Object.entries(this.props.context.dataset_obj[this.props.home_dataset][0]).map(item=>{
                                    return(
                                        <th key={item[0]}>
                                            {item[0]} ({typeof item[1]})
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.context.dataset_obj[this.props.home_dataset].slice(0, 5).map((row,idx)=>{
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
                </Modal.Body>
            </Modal>
        )
    }
}
const DetailModal = withFirebase(DetailModalBase)
export default DetailModal