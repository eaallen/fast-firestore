import React from 'react'
import { withFirebase } from '../../Firebase'
import Papa from 'papaparse'
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
        for(let icount = 0; icount < document.getElementById('myfile').files.length; icount++){
            const selectedFile = document.getElementById('myfile').files[icount];
            const name = selectedFile.name.substring(0, selectedFile.name.indexOf('.'))
            console.log('selectedFile',selectedFile)
            await Papa.parse(selectedFile,{
                header: true,
                skipEmptyLines: true,
                complete: async(results) => {
                var data = results.data
                console.log('data',data)
                selectedFile.dataset_info={row_count:data.length}
                this.props.context.create_dataset(name,data,selectedFile)
            }})
        }
        document.getElementById('myfile').value = []
    }
    render(){
        return(
            <div>
                <h3>Import from Local CSV file</h3>
                <label htmlFor="myfile">Select a file: </label>
                <input type="file" id="myfile" name="myfile" multiple onChange={e=>this.see_data(e)}/><br/><br/>                
            </div>
        )
    }
}
const CsvUpload = withFirebase(CsvUploadBase)
export default CsvUpload