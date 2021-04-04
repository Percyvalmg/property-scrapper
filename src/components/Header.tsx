import {Button, Col, Form, Navbar, Row, Spinner} from "react-bootstrap";
import {Formik} from "formik";
import axios from "axios";
import React from "react";
import * as Yup from "yup";
import {PropertyEntity} from "../types";

const schema = Yup.object().shape({
    url: Yup.string()
    .test("is-property-24", "we only support property 24 and private property links", (value) => {
        if (value) {
            return value.includes('property24.com') || value.includes('privateproperty.co.za')
        }
        return false;
    })
    .required('required'),
});

type HeaderProps = { propertyCollection: PropertyEntity[], setPropertyCollection: (data: PropertyEntity[]) => void };
export const Header: React.FC<HeaderProps> = ({propertyCollection, setPropertyCollection}) => {
    const serverUrl = window.location.origin.toString().includes('localhost') ? 'http://localhost:4000' : 'https://us-central1-property-scrapper-pmg.cloudfunctions.net/app'
    return (
        <Navbar expand="sm" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Property Scrapper</Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse className={'justify-content-end'}>
                <Formik
                    validationSchema={schema}
                    onSubmit={async (values, {setSubmitting, setErrors, resetForm}) => {
                        const url = values.url;
                        if (url) {
                            setSubmitting(true)
                            const response = await axios.get(`${serverUrl}/getPropertyData?url=${url}`);
                            const responseData: PropertyEntity = response.data;
                            let itemAlreadyExist = false;
                            propertyCollection.forEach(item => {
                                itemAlreadyExist =
                                    item.title === responseData.title &&
                                    item.price === responseData.price &&
                                    item.bathrooms === responseData.bathrooms
                            })

                            if (!itemAlreadyExist) {
                                setPropertyCollection([...propertyCollection, response.data]);
                            } else {
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
                        <Form className={'p-4'} inline noValidate onSubmit={handleSubmit}>
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
    )
}

