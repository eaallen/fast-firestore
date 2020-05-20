import React from 'react'
import {Modal, Collapse} from 'react-bootstrap'
import { Toggle } from './Toggle'
export default function SubCollectionSelector(props){
    // const [show, setShow] = React.useState(props.show || false)
    console.log(props.datasets)
    return(<>
        <Modal
            size="md"
            show={props.control.value}
            onHide={props.control.toggle}
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
                Create a sub collection for {props.title}
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {Object.entries(props.datasets).map(item=>{
                    return(
                        <div key={item}>
                            <Toggle>{tog=><>
                                <h5 onClick={tog.toggle}>
                                    {item[0]}
                                </h5>
                                <Collapse in={tog.value} timeout={500}>
                                    <div>
                                        <div
                                            style={{
                                                overflowX:"hidden",
                                                overflowY: "auto",
                                                backgroundColor: "whitesmoke",
                                            }}
                                        >
                                            {Object.keys(item[1][0]).map(sub_item =>{
                                                return(
                                                    <div className="pl-3" key={sub_item}>
                                                        {sub_item}  
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </Collapse>
                            </>}</Toggle>
                        </div>
                    )
                })}
            </Modal.Body>
        </Modal>
    </>)
}