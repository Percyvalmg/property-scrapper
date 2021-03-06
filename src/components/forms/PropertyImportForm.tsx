import React from "react";
import axios from "axios";
import {PropertyEntity} from "../../services/property/types";
import {Form, InputGroup} from "react-bootstrap";
import {Formik} from "formik";
import * as Yup from "yup";
import {SubmitButton} from "./SubmitButton";
import {analytics} from "../../firebase";
import {useAuth} from "../../services/auth";

const schema = Yup.object().shape({
    url: Yup.string()
    .test(
        "is-property-24",
        "we only support property 24 and private property links",
        (value) => {
            if (value) {
                return (
                    value.includes("property24.com") ||
                    value.includes("privateproperty.co.za")
                );
            }
            return false;
        }
    )
    .required("required"),
});

type PropertyImportFormProps = {
    propertyCollection: PropertyEntity[];
    setPropertyCollection: (data: PropertyEntity[]) => void;
};
export const PropertyImportForm: React.FC<PropertyImportFormProps> = ({
                                                                          propertyCollection,
                                                                          setPropertyCollection,
                                                                      }) => {
    const {currentUser} = useAuth();
    const serverUrl = window.location.origin.toString().includes("localhost")
        ? "http://localhost:4000"
        : "https://us-central1-property-scrapper-pmg.cloudfunctions.net/app";
    return (
        <Formik
            validationSchema={schema}
            onSubmit={async (values, {setSubmitting, setErrors, resetForm}) => {
                const url = values.url;

                analytics.logEvent('submit_property_import_form', {
                    propertyUrl: values.url,
                    user: currentUser ? currentUser.email : 'no-user',
                    userId: currentUser?.uid
                })

                if (url) {
                    setSubmitting(true);
                    const response = await axios.get(
                        `${serverUrl}/getPropertyData?url=${url}`
                    );
                    const responseData: PropertyEntity = response.data;
                    let itemAlreadyExist = false;
                    propertyCollection.forEach((item) => {
                        itemAlreadyExist =
                            item.title === responseData.title &&
                            item.price === responseData.price &&
                            item.bathrooms === responseData.bathrooms;
                    });

                    if (!itemAlreadyExist) {
                        setPropertyCollection([...propertyCollection, response.data]);
                    } else {
                        setErrors({url: "you have already imported this data"});
                    }
                    setSubmitting(false);
                    resetForm();
                }
            }}
            initialValues={{
                url: "",
            }}
        >
            {({values, handleSubmit, handleChange, errors, isSubmitting}) => (
                <Form className={"p-3"} inline noValidate onSubmit={handleSubmit}>
                    <InputGroup>
                        <Form.Control
                            value={values.url}
                            name={"url"}
                            type={"text"}
                            onChange={handleChange}
                            placeholder={"Enter property url"}
                            isInvalid={!!errors.url}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.url}
                        </Form.Control.Feedback>
                        <InputGroup.Append>
                            <SubmitButton isSubmitting={isSubmitting} label={'Import'}/>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
            )}
        </Formik>
    );
};
