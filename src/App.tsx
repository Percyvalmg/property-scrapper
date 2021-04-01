import React, {useState} from 'react';
import { Form, Button, Col, Navbar, Row, Table, Container, Spinner} from "react-bootstrap"
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class PropertyEntity {
    image: string | undefined;
    title: string | undefined;
    price: string | undefined;
    location: string | undefined;
    bedrooms: string | undefined;
    bathrooms: string | undefined;
    floorSize: string | undefined;
    levy: string | undefined;
    parking: string | undefined;
    rates: string | undefined;
}

const schema = Yup.object().shape({
    url: Yup.string()
        .test("is-property-24", "we only support property 24 and private property links", (value) => {
            if(value) {
                return value.includes('property24.com') || value.includes('privateproperty.co.za')
            }
            return false;
        })
        .required('required'),
});

function App() {
    const [data, setData] = useState<PropertyEntity[]>([])
  return (
          <>
              <Navbar bg="dark" variant="dark">
                  <Navbar.Brand href="#home">Property Scrapper</Navbar.Brand>
                  <Navbar.Toggle />
                  <Navbar.Collapse className={'justify-content-end'}>
                      <Formik
                          validationSchema={schema}
                          onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
                              const url = values.url;
                              if(url){
                                  setSubmitting(true)
                                  const response = await axios.get(`https://us-central1-property-scrapper-pmg.cloudfunctions.net/app/getPropertyData?url=${url}`);
                                  const responseData: PropertyEntity = response.data;
                                  let itemAlreadyExist = false;
                                  data.forEach( item => {
                                      itemAlreadyExist =
                                          item.title === responseData.title &&
                                          item.price === responseData.price &&
                                          item.bathrooms === responseData.bathrooms
                                  })

                                  if(!itemAlreadyExist) {
                                      setData([...data, response.data]);
                                  }else{
                                      setErrors({url: 'you have already imported this data'})
                                  }
                                  setSubmitting(false)
                                  resetForm();
                              }
                          }}
                          initialValues={{
                              url: ''
                          }}
                      >
                          {({
                                values,
                              handleSubmit,
                                handleChange,
                                errors,
                              isSubmitting
                            }) => (
                              <Form className={'p-4'}inline noValidate onSubmit={handleSubmit}>
                                  <Row>
                                      <Col>
                                          <Form.Group>
                                              <Form.Control
                                                  value={values.url}
                                                  name={"url"}
                                                  type={"text"}
                                                  onChange={handleChange}
                                                  placeholder={"enter url..."}
                                                  isInvalid={!!errors.url}
                                               className="mr-sm-2"/>
                                              <Form.Control.Feedback type="invalid">
                                                  {errors.url}
                                              </Form.Control.Feedback>
                                          </Form.Group>
                                      </Col>
                                      <Col>
                                          <Button variant="outline-info" type="submit" disabled={isSubmitting}>
                                              {isSubmitting ? <><Spinner
                                                  as="span"
                                                  animation="border"
                                                  size="sm"
                                                  role="status"
                                                  aria-hidden="true"
                                                  />
                                                  <span className="sr-only">Loading...</span></> : 'Import'}
                                          </Button>
                                      </Col>
                                  </Row>
                              </Form>
                          )}
                      </Formik>
                  </Navbar.Collapse>
              </Navbar>

              {(data.length > 0) ? <Table style={{ minHeight: '81vh'}} className={'my-auto mx-auto'} striped bordered hover variant="dark">
                  <thead>
                  <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>location</th>
                      <th>Bedrooms</th>
                      <th>Bathrooms</th>
                      <th>Floor Size</th>
                      <th>Levy</th>
                      <th>Parking</th>
                      <th>Rates</th>
                  </tr>
                  </thead>
                  <tbody>
                  {data?.map( (property: PropertyEntity, index) => <tr key={index}>
                      <td>{index+1}</td>
                      <td><img src={property.image} style={{width: '100px', height: '100px'}}/></td>
                      <td>{property.title ? property.title.slice(0, 10) + '...' : ''}</td>
                      <td>{property.price}</td>
                      <td>{property.location}</td>
                      <td>{property.bedrooms}</td>
                      <td>{property.bathrooms}</td>
                      <td>{property.floorSize}</td>
                      <td>{property.levy}</td>
                      <td>{property.parking}</td>
                      <td>{property.rates}</td>
                  </tr>)}
                  </tbody>
              </Table> :
                  <Container fluid>
                  <Row className={'align-items-center text-center'} style={{ height: '81vh', color:  'grey'}}>
                      <Col><div className={'my-auto mx-auto'}><p>Enter a Property 24 or Private Property url above to see the good stuff!!</p></div></Col>
                  </Row>
              </Container>}

              <Navbar bg="dark">
                  <Navbar.Brand style={{color: 'white'}}href="#home">Created by Percyval</Navbar.Brand>
              </Navbar>
          </>
  );
}

export default App;
