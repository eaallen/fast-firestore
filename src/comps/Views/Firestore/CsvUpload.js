import React from 'react'
import { withFirebase } from '../../Firebase'

class CsvUploadBase extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    get_file(e){
        try{
            console.log('file added', e.target.value)
            console.log('file added', e.target.files)

        }catch(err){
            console.error('err in get_file()',err)
        }
    }




    render(){
        return(
            <div>
                <form action=''>
                    <label htmlFor="myfile">Select a file: </label>
                    <input type="file" id="myfile" name="myfile" onChange={e=>this.get_file(e)}/><br/><br/>
                    <button onClick={e=>e.preventDefault(e)}type='submit'>submit</button>
                </form>
            </div>
        )
    }
}
const CsvUpload = withFirebase(CsvUploadBase)
export default CsvUpload