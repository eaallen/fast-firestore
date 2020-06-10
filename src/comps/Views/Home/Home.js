import React from 'react'
import {Modal,Button} from 'react-bootstrap'
import FastFirestore from '../Firestore/FastFirestore'
import ShowManyDatasets from '../InnerCollection/ShowManyDatasets'
import CsvUpload from '../Firestore/CsvUpload'
import ConfigCollection from '../Firestore/ConfigCollection'
import produce from 'immer'
import { withFirebase } from '../../Firebase'
class HomeBase extends React.Component{
    constructor(props){
        super(props)
        this.state={
            arr_fast_firestore: [<FastFirestore/>],
        }
    }
    handle_test = () =>{
        this.props.context.pushDataWithSubCollectionToFirestore()
    }
    render(){
        return(
            <div>
                <div className="setup">
                    <div>
                        <h4>
                            Connect to your firebase app
                        </h4>
                        <ConfigCollection/>
                    </div>
                    <DataModal/>
                </div>
                <div className="work-area">
                    <ShowManyDatasets/>
                </div>
            </div>
        )
    
    }
}
const Home = withFirebase(HomeBase)
export default Home

function DataModal(props) {
    const [show, setShow] = React.useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch Data Selector
        </Button>
  
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Data Selector</Modal.Title>
              </Modal.Header>
            <Modal.Body>
                <FastFirestore/>
                <CsvUpload/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }