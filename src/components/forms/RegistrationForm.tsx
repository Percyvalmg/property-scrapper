import {Formik} from "formik";
import {Button, ButtonGroup, Form, Row} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import * as Yup from "yup";
import {FormField} from "./FormField";
import {LoadingIndicator, SubmitButton} from "./SubmitButton";
import {AlertDismissible} from "./Alert";
import {useState} from "react";
import {AuthCode, AuthResponse, useAuth} from "../../services/auth";
import {analytics} from "../../firebase";

const schema = Yup.object().shape({
    email: Yup.string().email().required("required"),
    password: Yup.string().required("required"),
    confirmPassword: Yup.string()
    .required("required")
});

type RegistrationFormProps = {};
export const RegistrationForm: React.FC<RegistrationFormProps> = () => {
    const history = useHistory();
    const {handleRegister, handleLoginWithGoogle} = useAuth();
    const [showAlert, setShowAlert] = useState(false);
    const [authResponse, setAuthResponse] = useState<AuthResponse>();

    return (
        <Formik
            validationSchema={schema}
            onSubmit={async (values, {setSubmitting, setErrors}) => {
                setSubmitting(true);
                if (values.password !== values.confirmPassword) {
                    setErrors({confirmPassword: 'passwords are not the same!'})
                    return;
                }

                analytics.logEvent('submit_register_form', {
                    user: values.email
                })

                const response = await handleRegister({
                    email: values.email,
                    password: values.password,
                });

                setSubmitting(false);
                setAuthResponse(response);
                setShowAlert(true);
            }}
            initialValues={{
                email: "",
                password: "",
                confirmPassword: ""
            }}
        >
            {({values, isValid, handleSubmit, handleChange, errors, setSubmitting, isSubmitting}) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <FormField
                        defaultValue={values.email}
                        name={"email"}
                        placeholder={"Email"}
                        type={"email"}
                        onChangeHandler={handleChange}
                        error={errors.email}
                    />
                    <FormField
                        defaultValue={values.password}
                        name={"password"}
                        placeholder={"Password"}
                        type={"password"}
                        onChangeHandler={handleChange}
                        error={errors.password}
                    />
                    <FormField
                        defaultValue={values.confirmPassword}
                        name={"confirmPassword"}
                        placeholder={"Confirm Password"}
                        type={"password"}
                        onChangeHandler={handleChange}
                        error={errors.confirmPassword}
                    />

                    {showAlert && <AlertDismissible
                        onClose={() => {
                            if (authResponse?.code === AuthCode.SUCCESS) {
                                history.push("/");
                            }
                            setShowAlert(false);
                        }}
                        variant={authResponse?.code === AuthCode.SUCCESS ? 'success' : 'danger'}>
                        {authResponse?.message}
                    </AlertDismissible>}

                    <Row className={"justify-content-center"}>
                        <ButtonGroup className={"p-1"}>
                            <SubmitButton
                                className={"mr-2"}
                                isSubmitting={isSubmitting}
                                label={"Register"}
                            />
                            <Link className={"btn btn-outline-primary"} to={"/login"}>
                                Login
                            </Link>
                        </ButtonGroup>
                    </Row>
                    <Row className={"justify-content-center mt-3"}>
                        <Button variant={'danger'} disabled={isSubmitting && !isValid} onClick={async () => {
                            setSubmitting(true);
                            const response = await handleLoginWithGoogle();
                            setSubmitting(false);
                            setAuthResponse(response);
                            setShowAlert(true);
                        }}>{isSubmitting ? <LoadingIndicator/> : 'Login with Google'}
                        </Button>
                    </Row>

                </Form>
            )}
        </Formik>
    );
};
