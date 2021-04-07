import {Formik} from "formik";
import {Button, ButtonGroup, Form, Row} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import * as Yup from "yup";
import {FormField} from "./FormField";
import {LoadingIndicator, SubmitButton} from "./SubmitButton";
import {AlertDismissible} from "./Alert";
import {useState} from "react";
import {AuthCode, AuthResponse, useAuth} from "../../services/auth";

const schema = Yup.object().shape({
    email: Yup.string().email().required("required"),
    password: Yup.string().required("required"),
});

type LoginFormProps = {};
export const LoginForm: React.FC<LoginFormProps> = () => {
    const history = useHistory();
    const {handleLogin, handleLoginWithGoogle} = useAuth();
    const [showAlert, setShowAlert] = useState(false);
    const [authResponse, setAuthResponse] = useState<AuthResponse>();

    return (
        <Formik
            validationSchema={schema}
            onSubmit={async (values, {setSubmitting}) => {
                setSubmitting(true);
                const response = await handleLogin({
                    email: values.email,
                    password: values.password,
                })
                setAuthResponse(response)
                setShowAlert(true);
                setSubmitting(false);
            }}
            initialValues={{
                email: "",
                password: "",
            }}
        >
            {({values, handleSubmit, handleChange, errors, setSubmitting, isSubmitting, resetForm}) => (
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
                                label={"Login"}
                            />
                            <Link className={"btn btn-outline-primary"} to={"/register"}>
                                Register
                            </Link>
                        </ButtonGroup>
                    </Row>
                    <Row className={"justify-content-center mt-3"}>
                        <Button variant={'danger'} disabled={isSubmitting} onClick={async () => {
                            setSubmitting(true);
                            const response = await handleLoginWithGoogle();
                            setSubmitting(false);
                            setAuthResponse(response);
                            setShowAlert(true);
                        }}>{isSubmitting ? <LoadingIndicator/> : 'Login with Google'}</Button>
                    </Row>
                </Form>
            )}
        </Formik>
    );
};
