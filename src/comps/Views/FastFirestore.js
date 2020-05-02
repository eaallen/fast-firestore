import React from 'react'
import { withFirebase } from '../Firebase'
import {Button} from 'react-bootstrap'
class FastFirestoreBase extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        return(
            <div>
                <h1>Fast Firestore</h1>
                <div>
                    <Button>Make fake data</Button>
                </div>
            </div>
        )
    }
}
const FastFirestore = withFirebase(FastFirestoreBase)
export default FastFirestore