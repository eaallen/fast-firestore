import React from 'react'
import { withFirebase } from '../../Firebase'
import Papa from 'papaparse'
import { Form } from 'react-bootstrap'
class CsvUploadBase extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            csv_name: ""
        }
    }

    get_file(e){
        try{
            this.see_data()


        }catch(err){
            console.error('err in get_file()',err)
        }
    }
    handle_change =(e) => {
        e.preventDefault()
        let new_state={[e.target.getAttribute('name')]: e.target.value}
        this.setState(new_state)        
    }

    async see_data(){
        const selectedFile = document.getElementById('myfile').files[0];
        const name = selectedFile.name.substring(0, selectedFile.name.indexOf('.'))
        console.log('selectedFile',selectedFile)
        Papa.parse(selectedFile,{
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
            var data = results.data
            console.log('data',data)
            // this.props.context.doSetState({csv_data: data})
            this.props.context.push_dataset_to_obj(name,data)
        }})
        let dataset_info = {}
        dataset_info[name] = selectedFile
        this.props.context.doSetState("dataset_info_obj", dataset_info)
    }
    render(){
        return(
            <div>
                <h3>Import from Local CSV file</h3>
                <Form.Label>
                    Dataset Name
                </Form.Label>
                <Form.Control
                    value={this.state.csv_name}
                    onChange={e=>this.handle_change(e)}
                    name="csv_name"
                />
                <label htmlFor="myfile">Select a file: </label>
                <input type="file" id="myfile" name="myfile" onChange={e=>this.see_data(e)}/><br/><br/>                
            </div>
        )
    }
}
const CsvUpload = withFirebase(CsvUploadBase)
export default CsvUpload