import React from 'react'
import { withFirebase } from '../../Firebase'
import {Modal,Table, Row, Col} from 'react-bootstrap'
class DetailModalBase extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const data = this.props.context.super_ds[this.props.home_dataset].data
        const info = this.props.context.super_ds[this.props.home_dataset].meta
        const arr_sub_coll_info = this.props.context.super_ds[this.props.home_dataset].sub_collection_settings
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
                    <div>
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
                    </div>
                    {/* <div>
                        {arr_sub_coll_info.map((item,idx)=>{
                            return(<div key={idx}>
                                <br/>
                                <Row>
                                    <Col className="text-right font-weight-bold"> Sub-collection Host:</Col><Col className="text-left">{item.parent_connection_column}</Col>
                                </Row>
                                {Object.entries(item.child_collections).map((sub_item, jdx) =>{
                                    return(<div key={jdx}>
                                        <Row>
                                            <Col className="text-right font-weight-bold"> Sub-collection Name:</Col><Col className="text-left">{sub_item[0]}</Col>
                                        </Row>
                                        <Row>
                                            <Col className="text-right font-weight-bold"> Joining Column:</Col><Col className="text-left">{sub_item[1]}</Col>
                                        </Row>
                                    </div>)
                                })}
        
                            </div>)
                        })}
                    </div> */}
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