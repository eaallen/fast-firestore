import React from 'react';
import { Formik } from 'formik';
import {Col, Row, Form, Button} from 'react-bootstrap'

const DataWorldForm = () => (
  <div>
    <Formik
      initialValues={{ 
          file_name: '', 
          dw_data_set: '',
          user_name:'', 
          api_key:''
        }}
      validate={values => {
        const errors = {};
        for(const key in values){
            if(!values[key]){
                errors[key] = 'Required';
            }
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col>
                    <Form.Label>
                        user name
                    </Form.Label>
                    <Form.Control
                        value={values.user_name} 
                        onChange={handleChange}
                        name='user_name'
                        required 
                    />
                    
                </Col>
                <Col>
                    <Form.Label>
                        dataset                        
                    </Form.Label> 
                    <Form.Control
                        value={values.dw_data_set} 
                        onChange={handleChange} 
                        name='dw_data_set'
                        required 
                    />   
                </Col>    
                <Col>
                    <Form.Label>
                        file name
                    </Form.Label>
                    <Form.Control
                        value={values.file_name} 
                        onChange={handleChange} 
                        name='file_name'
                        required 
                    />
                </Col>
            
            </Row>
            <Form.Group>
                <Form.Label>
                    API Token
                </Form.Label>
                <Form.Control 
                    type="text"
                    value={values.api_key} 
                    onChange={handleChange} 
                    name='api_key'
                    required 
                />
            <Button type="submit" disabled={isSubmitting}>View data from data.world</Button>
            </Form.Group>
        </Form>
      )}
    </Formik>
  </div>
);

export default DataWorldForm;