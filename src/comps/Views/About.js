import React from 'react'
import { Row, Col } from 'react-bootstrap'

export default function About(props){
    return(
        <div>
            <h2>
                About this App
            </h2>
            <div>
                <Row>
                    <Col className="text-right">
                        <img src='/firebaseconfigbox.png' className="img-thumbnail about-img" alt="img"/>
                    </Col>
                    <Col className="text-left">
                        <h4>Connected to your instance of firebase</h4>
                        <p>
                            You need to copy your firebase configuration data and paste it into the “Connect to your firebase app” text area. 
                            This will be used to push data uploaded to Fast Firestore to your firebase instance. Your data is not saved or
                            tracked in any way. When this web app is reloaded, all information will be lost and you will have to repeat this process 
                            again. 
                        </p>
                    </Col>
                </Row>
            </div>
            <br/>
            <div>
                <Row>
                    <Col className="text-right">
                        <img src='/dataselecter.png' className="img-thumbnail about-img" alt="img"/>
                    </Col>
                    <Col className="text-left">
                        <h4>Select data to upload</h4>
                        <p>
                            Now you must select the data you want to upload to firebase. Currently there are two ways to get data: 1) data.world and 2) a 
                            csv file from your own computer. 
                        </p>
                        <h6> Import from Data.world</h6>
                        <p>
                            Data.world is the preferred method to use with Fast Firestore. Data.world has many tools
                            to get your data in the shape you want it to be in by the time you are ready to use Fast
                            Firestore you upload your data to firebase. Fast Firestore uses pagination to upload data
                            from data.world (an ability not yet ready for a csv upload). 
                            This allows you to upload massive amounts of data to your firebase instance. 
                        </p>
                        <h6>Import from local CSV file</h6>
                        <p>
                            This is great for simply uploads to firebase. Because Fast Firestore has not implemented pagination for CSV files (yet) 
                            you will be limited in how much data you will be able to work with. I suggest using this option to practice working with
                            Fast Firestore or for making dummy data. 
                        </p>

                    </Col>
                </Row>
            </div>

            <br/>
            <div>
                <Row>
                    <Col className="text-right">
                        <img src='/emp.png' className="img-thumbnail about-img" alt="img"/>
                    </Col>
                    <Col className="text-left">
                        <h4>Working with Data</h4>
                        <p>
                            Once you have given Fast Firestore some data to work with you will see a card with the name of your data in the header. 
                            There are two options from this point: you may upload the data immediately to firebase, or you can designate which data 
                            columns will have a sub collection. I will proceed to handling sub collections. The end of this document will show how to 
                            upload the data to firebase.  
                        </p>
                    </Col>
                </Row>
            </div>
 
            <div>
                <Row>
                    <Col className="text-right">
                        <img src='/empandjob.png' className="img-thumbnail about-img" alt="img"/>
                    </Col>
                    <Col className="text-left">
                        <h6>Context</h6>
                        <p>
                            I will show you how to create a sub collection that references the jobs each employee has down. 
                            (When a sub collection has been declared the blue database symbol turns gold). 
                        </p>
                    </Col>
                </Row>
            </div>
            <br/>
            <div>
                <Row>
                    <Col className="text-right">
                        <img src='/emp_ext.png' className="img-thumbnail about-img" alt="img"/>
                    </Col>
                    <Col className="text-left">
                        <h6>Declaring A sub Collection</h6>
                        <p>
                            Click on the data field you wish to possess a sub collection (in this case it is “id”). The field will expand 
                            showing the names of all data collections currently attached to Fast Firestore. Click on the data collection you wish 
                            to reference as a sub collection, this field will expand displaying the data columns that you may choose to make the join. 
                            Click “Save” when finished or click “Cancel” to break the join.    
                        </p>
                        <img src='/details_check_sub.png' className="img-thumbnail about-img" alt="img"/> <br/>
                        <p>You can double check your sub collection configuration by going to Tools > Details in the data collection card.</p>
                    </Col>
                </Row>
            </div>
            <br/>
            <div>
                <Row>
                    <Col className="text-right">
                        <img src='/emp_push.png' className="img-thumbnail about-img" alt="img"/> <br/>
                    </Col>
                    <Col className="text-left">
                        <h6>Pushing to Firebase</h6>
                        <p>
                            Once everything looks good to go simply go to Tools > Push to Firestore 
                            then send the data from into your firebase cloud Firestore.     
                        </p>
                    </Col>
                </Row>
            </div>
            <br/>
        </div>
    )
}