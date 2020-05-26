import React from 'react'
import { withFirebase } from '../../Firebase'
import Papa from 'papaparse'
import { Form } from 'react-bootstrap'
class CsvUploadBase extends React.Component{
    constructor(props){
        super(props)
        this.state = {
           
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
        this.props.context.init_super_ds(name)
        
        console.log('selectedFile',selectedFile)
        await Papa.parse(selectedFile,{
            header: true,
            skipEmptyLines: true,
            complete: async(results) => {
            var data = results.data
            console.log('data',data)
            // this.props.context.doSetState({csv_data: data})
            // this.props.context.push_dataset_to_obj(name,data)
            console.log("1")
            await this.props.context.add_data_to_super_ds(name,data)
            console.log("2")
            this.props.context.add_meta_data_to_super_ds(name, selectedFile)
            console.log("3")
        }})
        
        
    }
    render(){
        return(
            <div>
                <h3>Import from Local CSV file</h3>
                <label htmlFor="myfile">Select a file: </label>
                <input type="file" id="myfile" name="myfile" onChange={e=>this.see_data(e)}/><br/><br/>                
            </div>
        )
    }
}
const CsvUpload = withFirebase(CsvUploadBase)
export default CsvUpload