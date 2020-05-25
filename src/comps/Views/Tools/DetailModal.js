import React from 'react'
import { withFirebase } from '../../Firebase'
import {Modal,Table, Row, Col} from 'react-bootstrap'
class DetailModalBase extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const data = this.props.context.dataset_obj[this.props.home_dataset]
        const info = this.props.context.dataset_info_obj[this.props.home_dataset]
        let row_count
        return(
            <Modal 
                show={this.props.show}
                onHide={this.props.control.toggle}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col className="text-right font-weight-bold"> Dataset Name:</Col><Col className="text-left">{this.props.home_dataset}</Col>
                    </Row>
                    <Row>
                        <Col className="text-right font-weight-bold"> Number of Columns:</Col><Col className="text-left">{Object.keys(data[0]).length}</Col>
                    </Row>
                    <Row>
                        <Col className="text-right font-weight-bold">Number of Rows:</Col><Col className="text-left">{data.length}</Col>
                    </Row>
                    {
                        info?
                        <>
                            <Row>
                                <Col className="text-right font-weight-bold">Size in Bytes:</Col><Col className="text-left">{info.size}</Col>
                            </Row>
                            <Row>
                                <Col className="text-right font-weight-bold">Original File Name:</Col><Col className="text-left">{info.name}</Col>
                            </Row>
                        </>
                        :
                        <>
                        </>
                    }
                    <Table striped bordered responsive size="sm">
                        <thead >
                            <tr className="position-sticky sticky-top">
                                {Object.entries(data[0]).map(item=>{
                                    return(
                                        <th key={item[0]}>
                                            {item[0]} ({typeof item[1]})
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {data.slice(0, 5).map((row,idx)=>{
                                row_count = idx
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
                    <div>
                        Showing {row_count+1} of {data.length} rows
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}
const DetailModal = withFirebase(DetailModalBase)
export default DetailModal