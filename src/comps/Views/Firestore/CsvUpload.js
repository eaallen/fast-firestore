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
    async see_data(){
        const selectedFile = document.getElementById('myfile').files[0];
        console.log(selectedFile)
        Papa.parse(selectedFile,{
            header: true,
            complete: (results) => {
            var data = results.data
            console.log('data',data)
            this.props.context.doSetState('csv_data', data)
        }})
    }



    render(){
        return(
            <div>
                <label htmlFor="myfile">Select a file: </label>
                <input type="file" id="myfile" name="myfile" onChange={e=>this.see_data(e)} multiple/><br/><br/>                
            </div>
        )
    }
}
const CsvUpload = withFirebase(CsvUploadBase)
export default CsvUpload