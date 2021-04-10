import {Formik} from "formik";
import {Button, Form} from "react-bootstrap";
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
                analytics.logEvent('submit_login_form', {
                    user: values.email
                })
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
                    <Form.Group>
                        <Link to={'/forgot-password'}>forgot your password?</Link>
                    </Form.Group>
                    <Form.Group>
                        <SubmitButton
                            className={"mt-3"}
                            isSubmitting={isSubmitting}
                            label={"Login"}
                            block={true}
                        />
                    </Form.Group>

                    <div className={'mb-4'}>
                        <hr className="hr-or" color={'white'}/>
                        <span className="span-or">or</span>
                    </div>
                    <Form.Group>
                        <Button variant={'outline-danger'} disabled={isSubmitting}
                                onClick={async () => {
                                    setSubmitting(true);
                                    const response = await handleLoginWithGoogle();
                                    setSubmitting(false);
                                    setAuthResponse(response);
                                    setShowAlert(true);
                                }} block={true}>{isSubmitting ?
                            <LoadingIndicator/> : 'Signup using Google'}</Button>
                    </Form.Group>
                    <Form.Group>
                        <p className="mt-4 mb-0">Don't have account?
                            <Link to={'/register'}> Sign up here</Link>
                        </p>
                    </Form.Group>
                </Form>
            )}
        </Formik>
    );
};
